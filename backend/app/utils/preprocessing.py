"""
Image preprocessing utilities
"""
import os
import uuid
from pathlib import Path
from typing import Tuple
from PIL import Image
from app.config import settings


def validate_image(file_path: str) -> Tuple[bool, str]:
    """
    Validate image file
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    try:
        # Check file exists
        if not os.path.exists(file_path):
            return False, "File does not exist"
        
        # Check file size
        file_size = os.path.getsize(file_path)
        if file_size > settings.max_file_size:
            return False, f"File size exceeds maximum allowed ({settings.max_file_size} bytes)"
        
        # Try to open as image
        with Image.open(file_path) as img:
            # Verify it's an actual image
            img.verify()
        
        # Re-open for format check (verify closes the file)
        with Image.open(file_path) as img:
            # Check format
            if img.format.lower() not in ['jpeg', 'jpg', 'png']:
                return False, f"Unsupported image format: {img.format}"
        
        return True, ""
    
    except Exception as e:
        return False, f"Invalid image file: {str(e)}"


def save_upload_file(file_content: bytes, filename: str) -> str:
    """
    Save uploaded file to disk
    
    Returns:
        Path to saved file
    """
    # Create uploads directory if not exists
    upload_dir = Path(settings.upload_dir)
    upload_dir.mkdir(exist_ok=True)
    
    # Generate unique filename
    file_ext = Path(filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = upload_dir / unique_filename
    
    # Save file
    with open(file_path, 'wb') as f:
        f.write(file_content)
    
    return str(file_path)


def cleanup_upload_file(file_path: str):
    """Delete uploaded file"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"⚠️  Error deleting file {file_path}: {e}")


def get_image_info(file_path: str) -> dict:
    """Get image information"""
    try:
        with Image.open(file_path) as img:
            return {
                "width": img.width,
                "height": img.height,
                "format": img.format,
                "mode": img.mode
            }
    except Exception as e:
        return {"error": str(e)}
