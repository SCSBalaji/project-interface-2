"""
Model service for loading and running plant disease prediction.
"""
import torch
import json
from pathlib import Path
from typing import Dict, Optional, Tuple
from PIL import Image
import logging

from app.config import settings

logger = logging.getLogger(__name__)


class ModelService:
    """Service for managing the MobilePlantViT model."""
    
    def __init__(self):
        self.model = None
        self.device = None
        self.class_names = []
        self.metadata = {}
        self.model_loaded = False
    
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
                self.class_names = self.metadata.get('class_names', [])
                logger.info(f"Loaded metadata with {len(self.class_names)} classes")
            else:
                logger.warning(f"Metadata file not found at {metadata_path}")
            
            # Load classification report (optional)
            report_path = Path(settings.base_dir) / settings.CLASSIFICATION_REPORT_PATH
            if report_path.exists():
                with open(report_path, 'r') as f:
                    classification_report = json.load(f)
                logger.info("Loaded classification report")
            
            # Load model checkpoint
            model_path = Path(settings.base_dir) / settings.MODEL_PATH
            if not model_path.exists():
                raise FileNotFoundError(f"Model file not found at {model_path}")
            
            # Import MobilePlantViT model
            # This will work once user adds the src files
            try:
                from src.models.mobile_plant_vit import MobilePlantViT
                
                # Create model instance
                num_classes = len(self.class_names) if self.class_names else 38
                self.model = MobilePlantViT(num_classes=num_classes)
                
                # Load checkpoint
                checkpoint = torch.load(model_path, map_location=self.device)
                
                # Handle different checkpoint formats
                if 'model_state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['model_state_dict'])
                elif 'state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['state_dict'])
                else:
                    self.model.load_state_dict(checkpoint)
                
                self.model.to(self.device)
                self.model.eval()
                
                self.model_loaded = True
                logger.info("Model loaded successfully")
                
            except ImportError as e:
                logger.error(f"Failed to import MobilePlantViT. Please ensure src files are in place: {e}")
                raise
        
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            raise
    
    async def predict(self, image: Image.Image, top_k: int = 3) -> Dict:
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
                top_probs, top_indices = torch.topk(probabilities, top_k, dim=1)
                
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
