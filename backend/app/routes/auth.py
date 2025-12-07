"""
Authentication routes
"""
from fastapi import APIRouter, HTTPException, status, Depends, Header
from typing import Optional
from app.models.user import (
    OTPRequest, OTPVerify, UserCreate, UserResponse
)
from app.services.auth_service import auth_service


router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/signup/request-otp")
async def request_signup_otp(request: OTPRequest):
    """Request OTP for signup"""
    try:
        result = await auth_service.send_otp(request.phone)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send OTP: {str(e)}"
        )


@router.post("/signup/verify")
async def signup_verify(request: OTPVerify, user_data: UserCreate):
    """Verify OTP and create user account"""
    try:
        # Verify OTP
        is_valid = await auth_service.verify_otp(request.phone, request.otp)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP"
            )
        
        # Check if phone numbers match
        if request.phone != user_data.phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number mismatch"
            )
        
        # Create user
        user = await auth_service.create_user(user_data)
        
        # Generate access token
        access_token = auth_service.create_access_token(
            data={"sub": str(user.id), "phone": user.phone}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "name": user.name,
                "phone": user.phone,
                "language": user.language
            }
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signup failed: {str(e)}"
        )


@router.post("/signin/request-otp")
async def request_signin_otp(request: OTPRequest):
    """Request OTP for signin"""
    try:
        # Check if user exists
        user = await auth_service.get_user_by_phone(request.phone)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please sign up first."
            )
        
        # Send OTP
        result = await auth_service.send_otp(request.phone)
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send OTP: {str(e)}"
        )


@router.post("/signin/verify")
async def signin_verify(request: OTPVerify):
    """Verify OTP and sign in"""
    try:
        # Verify OTP
        is_valid = await auth_service.verify_otp(request.phone, request.otp)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP"
            )
        
        # Get user
        user = await auth_service.get_user_by_phone(request.phone)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Generate access token
        access_token = auth_service.create_access_token(
            data={"sub": str(user.id), "phone": user.phone}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "name": user.name,
                "phone": user.phone,
                "language": user.language
            }
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signin failed: {str(e)}"
        )


async def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    """Get current authenticated user"""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication scheme"
            )
        
        payload = auth_service.verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
        
        return payload
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    try:
        user = await auth_service.get_user_by_phone(current_user["phone"])
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {
            "id": str(user.id),
            "name": user.name,
            "phone": user.phone,
            "language": user.language,
            "created_at": user.created_at
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user: {str(e)}"
        )
