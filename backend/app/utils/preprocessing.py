"""
Image preprocessing utilities for the model.
"""
import torch
from PIL import Image
from torchvision import transforms
from typing import Tuple


def get_transform(image_size: Tuple[int, int] = (224, 224)):
    """
    Get the image transformation pipeline.
    
    Args:
        image_size: Target size for the image (height, width)
    
    Returns:
        torchvision transforms composition
    """
    return transforms.Compose([
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],  # ImageNet mean
            std=[0.229, 0.224, 0.225]     # ImageNet std
        )
    ])


def preprocess_image(image: Image.Image, image_size: Tuple[int, int] = (224, 224)) -> torch.Tensor:
    """
    Preprocess a PIL Image for model input.
    
    Args:
        image: PIL Image
        image_size: Target size for the image
    
    Returns:
        Preprocessed tensor with shape (1, 3, H, W)
    """
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Apply transformations
    transform = get_transform(image_size)
    tensor = transform(image)
    
    # Add batch dimension
    tensor = tensor.unsqueeze(0)
    
    return tensor


def validate_image(image: Image.Image, max_size: int = 10 * 1024 * 1024) -> bool:
    """
    Validate image properties.
    
    Args:
        image: PIL Image
        max_size: Maximum allowed file size in bytes
    
    Returns:
        True if valid, False otherwise
    """
    try:
        # Check dimensions (minimum and maximum)
        width, height = image.size
        if width < 32 or height < 32:
            return False
        if width > 4096 or height > 4096:
            return False
        
        # Load image to ensure it's valid (verify() makes image unusable)
        image.load()
        
        return True
    except Exception:
        return False
