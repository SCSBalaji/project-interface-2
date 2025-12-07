"""
Prediction routes for plant disease detection.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Header
from PIL import Image
import io
from pathlib import Path
import logging
from datetime import datetime

from app.services.model_service import model_service
from app.services.auth_service import auth_service
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/predict", tags=["prediction"])


async def verify_auth_token(authorization: str = Header(None)):
    """Dependency to verify authentication token."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    
    token = authorization.split(" ")[1]
    token_data = auth_service.verify_token(token)
    
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return token_data


@router.post("/")
async def predict_disease(
    file: UploadFile = File(...),
    token_data = Depends(verify_auth_token)
):
    """
    Predict plant disease from uploaded image.
    
    Requires authentication token in Authorization header.
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Check file extension
        file_ext = Path(file.filename).suffix.lower().replace('.', '')
        allowed_extensions = settings.get_allowed_extensions()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"File extension .{file_ext} not allowed. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read and validate image
        try:
            image_bytes = await file.read()
            image = Image.open(io.BytesIO(image_bytes))
        except Exception as e:
            logger.error(f"Error reading image: {e}")
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Optional: Save uploaded image for debugging/logging
        if settings.DEBUG:
            upload_dir = Path(settings.base_dir) / settings.UPLOAD_DIR
            upload_dir.mkdir(exist_ok=True)
            
            timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            save_path = upload_dir / f"{timestamp}_{file.filename}"
            
            with open(save_path, 'wb') as f:
                f.write(image_bytes)
            
            logger.info(f"Saved uploaded image: {save_path}")
        
        # Make prediction
        result = await model_service.predict(image, top_k=3)
        
        if not result.get("success"):
            raise HTTPException(status_code=500, detail=result.get("message", "Prediction failed"))
        
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in prediction: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")


@router.get("/model-info")
async def get_model_info():
    """Get information about the loaded model."""
    try:
        info = model_service.get_model_info()
        return info
    except Exception as e:
        logger.error(f"Error getting model info: {e}")
        raise HTTPException(status_code=500, detail="Failed to get model information")


@router.post("/load-model")
async def load_model():
    """Manually load/reload the model."""
    try:
        await model_service.load_model()
        return {
            "success": True,
            "message": "Model loaded successfully",
            "info": model_service.get_model_info()
        }
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load model: {str(e)}")
