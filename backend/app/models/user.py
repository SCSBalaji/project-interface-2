"""
Database models for the application.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class User(BaseModel):
    """User model for authentication."""
    name: str
    phone: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True


class UserInDB(User):
    """User model with database ID."""
    id: str = Field(alias="_id")


class UserCreate(BaseModel):
    """User creation model."""
    name: str
    phone: str


class UserLogin(BaseModel):
    """User login model."""
    phone: str


class OTPVerify(BaseModel):
    """OTP verification model."""
    phone: str
    otp: str


class Token(BaseModel):
    """Access token model."""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token data model."""
    phone: Optional[str] = None
