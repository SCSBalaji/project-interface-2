"""
Configuration module for the plant disease detection application.
Loads environment variables and provides configuration settings.
"""
import os
from pathlib import Path
from pydantic import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # MongoDB Configuration
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "plant_disease_db"
    
    # JWT Configuration
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Model Configuration
    MODEL_PATH: str = "models/mobileplant_vit_full_checkpoint.pth"
    METADATA_PATH: str = "models/deployment_metadata.json"
    CLASSIFICATION_REPORT_PATH: str = "models/classification_report.json"
    
    # Upload Configuration
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    ALLOWED_EXTENSIONS: str = "jpg,jpeg,png"
    
    # OTP Configuration
    OTP_EXPIRE_MINUTES: int = 5
    SMS_API_KEY: str = ""
    SMS_API_URL: str = ""
    
    # CORS Configuration
    FRONTEND_URL: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    def get_allowed_extensions(self) -> List[str]:
        """Get list of allowed file extensions."""
        return [ext.strip() for ext in self.ALLOWED_EXTENSIONS.split(",")]
    
    @property
    def base_dir(self) -> Path:
        """Get base directory of the application."""
        return Path(__file__).resolve().parent.parent


# Create global settings instance
settings = Settings()
