"""
Authentication service for OTP-based authentication
"""
import random
import string
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from app.config import settings
from app.database import get_database
from app.models.user import OTPInDB, UserCreate, UserInDB


class AuthService:
    """Authentication service"""
    
    def __init__(self):
        self.db = None
    
    async def initialize(self):
        """Initialize the service with database"""
        self.db = get_database()
    
    def generate_otp(self, length: int = 6) -> str:
        """Generate random OTP"""
        return ''.join(random.choices(string.digits, k=length))
    
    async def send_otp(self, phone: str) -> dict:
        """
        Generate and store OTP for phone number
        In production, integrate with SMS provider
        """
        if not self.db:
            await self.initialize()
        
        # Generate OTP
        otp = self.generate_otp(settings.otp_length)
        
        # Calculate expiry
        expires_at = datetime.utcnow() + timedelta(minutes=settings.otp_expiry_minutes)
        
        # Store OTP in database
        otp_data = OTPInDB(
            phone=phone,
            otp=otp,
            expires_at=expires_at
        )
        
        await self.db.otps.insert_one(otp_data.dict())
        
        # TODO: In production, send OTP via SMS provider
        # For development, return OTP in response
        print(f"📱 OTP for {phone}: {otp}")
        
        return {
            "message": "OTP sent successfully",
            "otp": otp if settings.debug else None,  # Only in debug mode
            "expires_in": settings.otp_expiry_minutes
        }
    
    async def verify_otp(self, phone: str, otp: str) -> bool:
        """Verify OTP"""
        if not self.db:
            await self.initialize()
        
        # Find OTP in database
        otp_record = await self.db.otps.find_one({
            "phone": phone,
            "otp": otp,
            "is_used": False
        })
        
        if not otp_record:
            return False
        
        # Check expiry
        if datetime.utcnow() > otp_record["expires_at"]:
            return False
        
        # Mark OTP as used
        await self.db.otps.update_one(
            {"_id": otp_record["_id"]},
            {"$set": {"is_used": True}}
        )
        
        return True
    
    async def create_user(self, user_data: UserCreate) -> UserInDB:
        """Create new user"""
        if not self.db:
            await self.initialize()
        
        # Check if user exists
        existing_user = await self.db.users.find_one({"phone": user_data.phone})
        if existing_user:
            return UserInDB(**existing_user)
        
        # Create new user
        user = UserInDB(**user_data.dict())
        result = await self.db.users.insert_one(user.dict(by_alias=True))
        user.id = result.inserted_id
        
        return user
    
    async def get_user_by_phone(self, phone: str) -> Optional[UserInDB]:
        """Get user by phone number"""
        if not self.db:
            await self.initialize()
        
        user_data = await self.db.users.find_one({"phone": phone})
        if user_data:
            return UserInDB(**user_data)
        return None
    
    def create_access_token(self, data: dict) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Optional[dict]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
            return payload
        except JWTError:
            return None


# Global auth service instance
auth_service = AuthService()
