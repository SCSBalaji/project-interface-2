"""
Configuration settings for the Plant Disease Detection API
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    app_name: str = "Plant Disease Detection API"
    app_version: str = "1.0.0"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Database
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "plant_disease_db"
    
    # Security
    secret_key: str = "your-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 43200  # 30 days
    
    # OTP Settings
    otp_expiry_minutes: int = 5
    otp_length: int = 6
    
    # CORS
    frontend_url: str = "http://localhost:5173"
    
    # Model Settings
    model_path: str = "models/mobileplant_vit_full_checkpoint.pth"
    metadata_path: str = "models/deployment_metadata.json"
    upload_dir: str = "uploads"
    
    # File Upload
    max_file_size: int = 10485760  # 10MB
    allowed_extensions: str = "jpg,jpeg,png"
    
    # SMS/OTP Provider (Optional)
    sms_api_key: Optional[str] = None
    sms_api_url: Optional[str] = None
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


# Global settings instance
settings = Settings()
