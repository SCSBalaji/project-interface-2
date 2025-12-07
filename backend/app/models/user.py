"""
User model and schema
"""
from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    """Custom ObjectId type for Pydantic"""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class UserBase(BaseModel):
    """Base user schema"""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    language: str = Field(default="en", pattern="^(en|hi|ta|te|kn|ml|mr|bn|gu|pa)$")


class UserCreate(UserBase):
    """User creation schema"""
    pass


class UserInDB(UserBase):
    """User in database schema"""
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserResponse(BaseModel):
    """User response schema"""
    id: str
    name: str
    phone: str
    language: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class OTPRequest(BaseModel):
    """OTP request schema"""
    phone: str = Field(..., min_length=10, max_length=15)


class OTPVerify(BaseModel):
    """OTP verification schema"""
    phone: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=6, max_length=6)


class OTPInDB(BaseModel):
    """OTP in database schema"""
    phone: str
    otp: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime
    is_used: bool = False
