"""
Prediction routes
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from typing import List
from app.services.model_service import model_service
from app.utils.preprocessing import save_upload_file, validate_image, cleanup_upload_file
from app.routes.auth import get_current_user
from app.database import get_database
from app.models.prediction import PredictionCreate, PredictionResponse
from datetime import datetime


router = APIRouter(prefix="/api/prediction", tags=["Prediction"])


@router.post("/predict")
async def predict_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Predict plant disease from uploaded image
    """
    file_path = None
    try:
        # Read file content
        file_content = await file.read()
        
        # Save file
        file_path = save_upload_file(file_content, file.filename)
        
        # Validate image
        is_valid, error_msg = validate_image(file_path)
        if not is_valid:
            cleanup_upload_file(file_path)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
        
        # Make prediction
        result = await model_service.predict(file_path, top_k=5)
        
        if "error" in result:
            cleanup_upload_file(file_path)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result["error"]
            )
        
        # Save prediction to database
        db = get_database()
        if db:
            prediction_data = PredictionCreate(
                user_id=current_user["sub"],
                image_path=file_path,
                disease_name=result["disease_name"],
                confidence=result["confidence"],
                class_index=result["class_index"],
                top_predictions=result["top_predictions"]
            )
            
            await db.predictions.insert_one(prediction_data.dict())
        
        # Clean up uploaded file (optional - keep for history)
        # cleanup_upload_file(file_path)
        
        return {
            "success": True,
            "prediction": {
                "disease_name": result["disease_name"],
                "confidence": result["confidence"],
                "top_predictions": result["top_predictions"]
            }
        }
    
    except HTTPException:
        if file_path:
            cleanup_upload_file(file_path)
        raise
    except Exception as e:
        if file_path:
            cleanup_upload_file(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction failed: {str(e)}"
        )


@router.get("/history")
async def get_prediction_history(
    current_user: dict = Depends(get_current_user),
    page: int = 1,
    page_size: int = 10
):
    """
    Get user's prediction history
    """
    try:
        db = get_database()
        if not db:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database not available"
            )
        
        # Calculate skip
        skip = (page - 1) * page_size
        
        # Get predictions
        cursor = db.predictions.find(
            {"user_id": current_user["sub"]}
        ).sort("created_at", -1).skip(skip).limit(page_size)
        
        predictions = await cursor.to_list(length=page_size)
        
        # Get total count
        total = await db.predictions.count_documents({"user_id": current_user["sub"]})
        
        # Format response
        prediction_list = []
        for pred in predictions:
            prediction_list.append({
                "id": str(pred.get("_id")),
                "disease_name": pred.get("disease_name"),
                "confidence": pred.get("confidence"),
                "top_predictions": pred.get("top_predictions", []),
                "created_at": pred.get("created_at")
            })
        
        return {
            "predictions": prediction_list,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": (total + page_size - 1) // page_size
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get history: {str(e)}"
        )


@router.get("/health")
async def health_check():
    """Check if prediction service is ready"""
    is_ready = model_service.is_ready()
    
    return {
        "status": "ready" if is_ready else "initializing",
        "model_loaded": is_ready
    }
