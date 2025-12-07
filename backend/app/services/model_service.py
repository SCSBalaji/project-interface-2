"""
Model service for loading and running plant disease prediction.
"""
import torch
import json
from pathlib import Path
from typing import Dict, Optional
from PIL import Image
import logging
import sys

from app.config import settings

logger = logging.getLogger(__name__)

# Add src to path for imports
src_path = Path(settings.base_dir) / "src"
if str(src_path) not in sys.path:
    sys.path.insert(0, str(src_path))


class ModelService:
    """Service for managing the MobilePlantViT model."""
    
    def __init__(self):
        self.model = None
        self.device = None
        self.class_names = []
        self.metadata = {}
        self.classification_report = {}
        self.model_loaded = False
    
    def _convert_legacy_state_dict(self, state_dict: Dict) -> Dict:
        """Convert old checkpoint format to new format."""
        new_state_dict = {}
        
        for key, value in state_dict.items():
            new_key = key
            
            # Map old architecture keys to new transformer_blocks structure
            if key.startswith('lda.'):
                # lda -> transformer_blocks.0.attention
                new_key = key.replace('lda.', 'transformer_blocks.0.attention.')
            elif key.startswith('res_ln.'):
                # res_ln.norm -> transformer_blocks.0.norm1
                new_key = key.replace('res_ln.norm.', 'transformer_blocks.0.norm1.')
            elif key.startswith('ffn.'):
                # ffn -> transformer_blocks.0.ffn
                new_key = key.replace('ffn.', 'transformer_blocks.0.ffn.')
            
            new_state_dict[new_key] = value
        
        # Add norm2 weights (copy from norm1 as initialization if not present)
        if 'transformer_blocks.0.norm1.weight' in new_state_dict:
            if 'transformer_blocks.0.norm2.weight' not in new_state_dict:
                new_state_dict['transformer_blocks.0.norm2.weight'] = new_state_dict['transformer_blocks.0.norm1.weight'].clone()
                new_state_dict['transformer_blocks.0.norm2.bias'] = new_state_dict['transformer_blocks.0.norm1.bias'].clone()
        
        return new_state_dict
    
    def _is_legacy_checkpoint(self, state_dict: Dict) -> bool:
        """Check if checkpoint uses old architecture."""
        legacy_keys = ['lda.alpha', 'lda.q_proj.weight', 'res_ln.norm.weight', 'ffn.fc1.weight']
        return any(key in state_dict for key in legacy_keys)
    
    async def load_model(self):
        """Load the MobilePlantViT model and metadata."""
        try:
            if self.model_loaded:
                logger.info("Model already loaded")
                return
            
            # Set device
            self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            logger.info(f"Using device: {self.device}")
            
            # Load metadata
            metadata_path = Path(settings.base_dir) / settings.METADATA_PATH
            if metadata_path.exists():
                with open(metadata_path, 'r') as f:
                    self.metadata = json.load(f)
                
                # Handle nested metadata structure
                if 'postprocessing' in self.metadata:
                    self.class_names = self.metadata['postprocessing'].get('class_names', [])
                elif 'class_names' in self.metadata:
                    self.class_names = self.metadata['class_names']
                else:
                    self.class_names = []
                
                logger.info(f"Loaded metadata with {len(self.class_names)} classes")
            else:
                logger.warning(f"Metadata file not found at {metadata_path}")
            
            # Load classification report (optional)
            report_path = Path(settings.base_dir) / settings.CLASSIFICATION_REPORT_PATH
            if report_path.exists():
                with open(report_path, 'r') as f:
                    self.classification_report = json.load(f)
                logger.info("Loaded classification report")
            
            # Load model checkpoint
            model_path = Path(settings.base_dir) / settings.MODEL_PATH
            if not model_path.exists():
                raise FileNotFoundError(f"Model file not found at {model_path}")
            
            # Load checkpoint
            checkpoint = torch.load(
                model_path, 
                map_location=self.device,
                weights_only=False
            )
            
            # Import model
            from src.models.mobile_plant_vit import MobilePlantViT, MobilePlantViTConfig
            
            num_classes = len(self.class_names) if self.class_names else 38
            
            # Get state dict from checkpoint
            if 'model_state_dict' in checkpoint:
                state_dict = checkpoint['model_state_dict']
            elif 'state_dict' in checkpoint:
                state_dict = checkpoint['state_dict']
            else:
                state_dict = checkpoint
            
            # Check if this is a legacy checkpoint
            is_legacy = self._is_legacy_checkpoint(state_dict)
            
            if is_legacy:
                logger.info("Detected legacy checkpoint format, converting keys...")
                state_dict = self._convert_legacy_state_dict(state_dict)
            
            # Create model with config from checkpoint or metadata
            if 'model_config' in checkpoint:
                logger.info("Loading model from checkpoint model_config")
                config_dict = checkpoint['model_config']
                config = MobilePlantViTConfig.from_dict(config_dict)
                self.model = MobilePlantViT(config)
            elif 'config' in checkpoint:
                logger.info("Loading model from checkpoint config")
                config_dict = checkpoint['config']
                config = MobilePlantViTConfig.from_dict(config_dict)
                self.model = MobilePlantViT(config)
            else:
                # Infer config from state dict shapes
                logger.info("Inferring model config from state dict")
                embed_dim = 384
                ghost_out_channels = 96
                
                if 'pos_enc.pe' in state_dict:
                    embed_dim = state_dict['pos_enc.pe'].shape[2]
                if 'ghost_conv.primary_conv.0.weight' in state_dict:
                    ghost_out_channels = state_dict['ghost_conv.primary_conv.0.weight'].shape[0]
                
                config = MobilePlantViTConfig(
                    num_classes=num_classes,
                    ghost_out_channels=ghost_out_channels,
                    fused_ir_out_channels=ghost_out_channels,
                    embed_dim=embed_dim,
                    num_heads=12 if embed_dim == 384 else 8,
                )
                self.model = MobilePlantViT(config)
            
            # Load state dict with strict=False to handle any remaining mismatches
            missing_keys, unexpected_keys = self.model.load_state_dict(state_dict, strict=False)
            
            if missing_keys:
                logger.warning(f"Missing keys in state dict: {missing_keys}")
            if unexpected_keys:
                logger.warning(f"Unexpected keys in state dict: {unexpected_keys}")
            
            self.model.to(self.device)
            self.model.eval()
            
            self.model_loaded = True
            logger.info(f"Model loaded successfully with {self.model.count_parameters():,} parameters")
            
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            raise
    
    async def predict(self, image: Image.Image, top_k: int = 5) -> Dict:
        """
        Make prediction on an image.
        
        Args:
            image: PIL Image
            top_k: Number of top predictions to return
        
        Returns:
            Dictionary with predictions
        """
        try:
            if not self.model_loaded:
                await self.load_model()
            
            # Import preprocessing function
            from app.utils.preprocessing import preprocess_image
            
            # Preprocess image
            input_tensor = preprocess_image(image).to(self.device)
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                
                # Get top k predictions
                k = min(top_k, len(self.class_names)) if self.class_names else top_k
                top_probs, top_indices = torch.topk(probabilities, k, dim=1)
                
                top_probs = top_probs.cpu().numpy()[0]
                top_indices = top_indices.cpu().numpy()[0]
            
            # Format results
            predictions = []
            for i, (prob, idx) in enumerate(zip(top_probs, top_indices)):
                class_name = self.class_names[idx] if idx < len(self.class_names) else f"Class_{idx}"
                predictions.append({
                    "rank": i + 1,
                    "class": class_name,
                    "confidence": float(prob),
                    "confidence_percent": f"{prob * 100:.2f}%"
                })
            
            result = {
                "success": True,
                "predictions": predictions,
                "top_prediction": predictions[0] if predictions else None,
                "model_info": {
                    "device": str(self.device),
                    "total_classes": len(self.class_names)
                }
            }
            
            logger.info(f"Prediction made: {predictions[0]['class']} ({predictions[0]['confidence_percent']})")
            return result
        
        except Exception as e:
            logger.error(f"Error making prediction: {e}")
            return {
                "success": False,
                "error": str(e),
                "message": "Failed to make prediction"
            }
    
    def get_model_info(self) -> Dict:
        """Get information about the loaded model."""
        return {
            "loaded": self.model_loaded,
            "device": str(self.device) if self.device else None,
            "num_classes": len(self.class_names),
            "class_names": self.class_names,
            "metadata": self.metadata
        }


# Create global model service instance
model_service = ModelService()