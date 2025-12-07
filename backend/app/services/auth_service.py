"""
Authentication service for user management.
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from app.config import settings
from app.database import get_database
from app.models.user import User, UserCreate, TokenData
import logging

logger = logging.getLogger(__name__)


class AuthService:
    """Service for user authentication and JWT token management."""
    
    @staticmethod
    async def create_user(user_data: UserCreate) -> Optional[User]:
        """Create a new user."""
        try:
            db = get_database()
            
            # Check if user already exists
            existing_user = await db.users.find_one({"phone": user_data.phone})
            if existing_user:
                logger.info(f"User already exists: {user_data.phone}")
                return User(**existing_user)
            
            # Create new user
            user_dict = {
                "name": user_data.name,
                "phone": user_data.phone,
                "created_at": datetime.utcnow(),
                "is_active": True
            }
            
            result = await db.users.insert_one(user_dict)
            user_dict["_id"] = str(result.inserted_id)
            
            logger.info(f"New user created: {user_data.phone}")
            return User(**user_dict)
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return None
    
    @staticmethod
    async def get_user_by_phone(phone: str) -> Optional[User]:
        """Get user by phone number."""
        try:
            db = get_database()
            user_dict = await db.users.find_one({"phone": phone})
            
            if user_dict:
                return User(**user_dict)
            return None
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            return None
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token."""
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> Optional[TokenData]:
        """Verify JWT token and extract data."""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            phone: str = payload.get("sub")
            
            if phone is None:
                return None
            
            return TokenData(phone=phone)
        except JWTError as e:
            logger.error(f"Token verification error: {e}")
            return None


# Create service instance
auth_service = AuthService()
