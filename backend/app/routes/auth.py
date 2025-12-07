"""
Authentication routes for signup, signin, and OTP verification.
"""
from fastapi import APIRouter, HTTPException, Depends, Header
from app.models.user import UserCreate, UserLogin, OTPVerify, Token
from app.services.otp_service import otp_service
from app.services.auth_service import auth_service
from app.config import settings
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/signup/send-otp")
async def signup_send_otp(user: UserCreate):
    """Send OTP for user signup."""
    try:
        # Generate and send OTP
        otp = await otp_service.send_otp(user.phone, settings.OTP_EXPIRE_MINUTES)
        
        logger.info(f"OTP sent for signup: {user.phone}")
        return {
            "success": True,
            "message": "OTP sent successfully",
            "phone": user.phone,
            # In development mode, return OTP (remove in production)
            "otp": otp if settings.DEBUG else None
        }
    except Exception as e:
        logger.error(f"Error sending signup OTP: {e}")
        raise HTTPException(status_code=500, detail="Failed to send OTP")


@router.post("/signup/verify-otp", response_model=Token)
async def signup_verify_otp(user_create: UserCreate, otp_verify: OTPVerify):
    """Verify OTP and create user account."""
    try:
        # Verify OTP
        is_valid = await otp_service.verify_otp(otp_verify.phone, otp_verify.otp)
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
        # Create user
        user = await auth_service.create_user(user_create)
        if not user:
            raise HTTPException(status_code=500, detail="Failed to create user")
        
        # Create access token
        access_token = auth_service.create_access_token(data={"sub": user.phone})
        
        logger.info(f"User signed up successfully: {user.phone}")
        return Token(access_token=access_token, token_type="bearer")
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in signup verification: {e}")
        raise HTTPException(status_code=500, detail="Signup failed")


@router.post("/signin/send-otp")
async def signin_send_otp(user_login: UserLogin):
    """Send OTP for user signin."""
    try:
        # Check if user exists
        user = await auth_service.get_user_by_phone(user_login.phone)
        if not user:
            raise HTTPException(status_code=404, detail="User not found. Please sign up first.")
        
        # Generate and send OTP
        otp = await otp_service.send_otp(user_login.phone, settings.OTP_EXPIRE_MINUTES)
        
        logger.info(f"OTP sent for signin: {user_login.phone}")
        return {
            "success": True,
            "message": "OTP sent successfully",
            "phone": user_login.phone,
            # In development mode, return OTP (remove in production)
            "otp": otp if settings.DEBUG else None
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending signin OTP: {e}")
        raise HTTPException(status_code=500, detail="Failed to send OTP")


@router.post("/signin/verify-otp", response_model=Token)
async def signin_verify_otp(otp_verify: OTPVerify):
    """Verify OTP and sign in user."""
    try:
        # Verify OTP
        is_valid = await otp_service.verify_otp(otp_verify.phone, otp_verify.otp)
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
        # Get user
        user = await auth_service.get_user_by_phone(otp_verify.phone)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Create access token
        access_token = auth_service.create_access_token(data={"sub": user.phone})
        
        logger.info(f"User signed in successfully: {user.phone}")
        return Token(access_token=access_token, token_type="bearer")
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in signin verification: {e}")
        raise HTTPException(status_code=500, detail="Signin failed")


@router.get("/verify-token")
async def verify_token(authorization: str = Header(None)):
    """Verify JWT token."""
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        
        token = authorization.split(" ")[1]
        token_data = auth_service.verify_token(token)
        
        if not token_data:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        
        # Get user
        user = await auth_service.get_user_by_phone(token_data.phone)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "success": True,
            "user": {
                "name": user.name,
                "phone": user.phone
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying token: {e}")
        raise HTTPException(status_code=401, detail="Token verification failed")
