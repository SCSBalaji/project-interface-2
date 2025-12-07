"""
Prediction model and schema
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime
from bson import ObjectId


class PredictionResult(BaseModel):
    """Prediction result schema"""
    disease_name: str
    confidence: float
    class_index: int
    top_predictions: List[Dict[str, float]] = []


class PredictionCreate(BaseModel):
    """Prediction creation schema"""
    user_id: str
    image_path: str
    disease_name: str
    confidence: float
    class_index: int
    top_predictions: List[Dict[str, float]] = []


class PredictionInDB(PredictionCreate):
    """Prediction in database schema"""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class PredictionResponse(BaseModel):
    """Prediction response schema"""
    id: str
    disease_name: str
    confidence: float
    top_predictions: List[Dict[str, float]]
    created_at: datetime
    
    class Config:
        from_attributes = True


class PredictionHistoryResponse(BaseModel):
    """Prediction history response schema"""
    predictions: List[PredictionResponse]
    total: int
    page: int
    page_size: int
