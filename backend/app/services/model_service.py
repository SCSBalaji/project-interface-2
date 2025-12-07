"""
Model service for plant disease prediction using MobilePlantViT
"""
import torch
import json
import os
from pathlib import Path
from typing import Dict, List, Tuple
from PIL import Image
import torchvision.transforms as transforms
from app.config import settings


class ModelService:
    """Service for loading and running the MobilePlantViT model"""
    
    def __init__(self):
        self.model = None
        self.device = None
        self.class_names = []
        self.metadata = {}
        self.transform = None
        self._initialized = False
    
    async def initialize(self):
        """Initialize the model and load metadata"""
        if self._initialized:
            return
        
        try:
            # Set device
            self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            print(f"🖥️  Using device: {self.device}")
            
            # Load metadata
            metadata_path = Path(settings.model_path).parent / "deployment_metadata.json"
            if metadata_path.exists():
                with open(metadata_path, 'r') as f:
                    self.metadata = json.load(f)
                    self.class_names = self.metadata.get('class_names', [])
                    print(f"📋 Loaded {len(self.class_names)} disease classes")
            else:
                print(f"⚠️  Metadata file not found: {metadata_path}")
                # Will use default class names if model loads successfully
            
            # Load model checkpoint
            model_path = Path(settings.model_path)
            if not model_path.exists():
                print(f"⚠️  Model file not found: {model_path}")
                print(f"📝 Please place the model file at: {model_path.absolute()}")
                self._initialized = False
                return
            
            print(f"📦 Loading model from: {model_path}")
            checkpoint = torch.load(model_path, map_location=self.device)
            
            # Import model architecture
            try:
                import sys
                sys.path.insert(0, str(Path(__file__).parent.parent.parent / "src"))
                from models.mobile_plant_vit import MobilePlantViT
                
                # Initialize model
                self.model = MobilePlantViT(
                    num_classes=len(self.class_names) if self.class_names else checkpoint.get('num_classes', 38)
                )
                
                # Load state dict
                if 'model_state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['model_state_dict'])
                else:
                    self.model.load_state_dict(checkpoint)
                
                self.model.to(self.device)
                self.model.eval()
                
                print("✅ Model loaded successfully")
            except ImportError as e:
                print(f"❌ Error importing model: {e}")
                print("📝 Please ensure the src/ directory with model files is present")
                self._initialized = False
                return
            
            # Setup image transforms
            self.transform = transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225]
                )
            ])
            
            self._initialized = True
            print("✅ Model service initialized successfully")
            
        except Exception as e:
            print(f"❌ Error initializing model service: {e}")
            self._initialized = False
            raise
    
    def preprocess_image(self, image_path: str) -> torch.Tensor:
        """Preprocess image for model input"""
        try:
            # Load and convert image
            image = Image.open(image_path).convert('RGB')
            
            # Apply transforms
            image_tensor = self.transform(image)
            
            # Add batch dimension
            image_tensor = image_tensor.unsqueeze(0)
            
            return image_tensor.to(self.device)
        
        except Exception as e:
            print(f"❌ Error preprocessing image: {e}")
            raise
    
    async def predict(self, image_path: str, top_k: int = 5) -> Dict:
        """
        Make prediction on an image
        
        Args:
            image_path: Path to the image file
            top_k: Number of top predictions to return
            
        Returns:
            Dictionary with prediction results
        """
        if not self._initialized:
            await self.initialize()
        
        if not self._initialized or self.model is None:
            return {
                "error": "Model not initialized. Please check model files.",
                "disease_name": "Unknown",
                "confidence": 0.0,
                "class_index": -1,
                "top_predictions": []
            }
        
        try:
            # Preprocess image
            image_tensor = self.preprocess_image(image_path)
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(image_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
            
            # Get top predictions
            top_probs, top_indices = torch.topk(probabilities[0], min(top_k, len(self.class_names)))
            
            # Convert to lists
            top_probs = top_probs.cpu().tolist()
            top_indices = top_indices.cpu().tolist()
            
            # Get class names
            top_predictions = []
            for prob, idx in zip(top_probs, top_indices):
                disease_name = self.class_names[idx] if idx < len(self.class_names) else f"Class_{idx}"
                top_predictions.append({
                    "disease_name": disease_name,
                    "confidence": round(prob * 100, 2)
                })
            
            # Primary prediction
            primary_disease = top_predictions[0] if top_predictions else {"disease_name": "Unknown", "confidence": 0.0}
            
            return {
                "disease_name": primary_disease["disease_name"],
                "confidence": primary_disease["confidence"],
                "class_index": top_indices[0] if top_indices else -1,
                "top_predictions": top_predictions
            }
        
        except Exception as e:
            print(f"❌ Error during prediction: {e}")
            return {
                "error": str(e),
                "disease_name": "Error",
                "confidence": 0.0,
                "class_index": -1,
                "top_predictions": []
            }
    
    def is_ready(self) -> bool:
        """Check if model is ready for inference"""
        return self._initialized and self.model is not None


# Global model service instance
model_service = ModelService()
