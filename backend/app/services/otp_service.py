"""
OTP (One-Time Password) service for authentication.
"""
import random
import string
from datetime import datetime, timedelta
from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)

# In-memory OTP storage (use Redis in production)
otp_storage: Dict[str, Dict] = {}


class OTPService:
    """Service for generating and verifying OTPs."""
    
    @staticmethod
    def generate_otp(length: int = 6) -> str:
        """Generate a random OTP."""
        return ''.join(random.choices(string.digits, k=length))
    
    @staticmethod
    async def send_otp(phone: str, expire_minutes: int = 5) -> str:
        """
        Generate and send OTP to phone number.
        In production, integrate with SMS service provider.
        """
        otp = OTPService.generate_otp()
        
        # Store OTP with expiration time
        otp_storage[phone] = {
            "otp": otp,
            "expires_at": datetime.utcnow() + timedelta(minutes=expire_minutes),
            "attempts": 0
        }
        
        # TODO: Integrate with SMS provider (Twilio, AWS SNS, etc.)
        # For development, just log the OTP
        logger.info(f"OTP for {phone}: {otp} (Development Mode)")
        
        return otp
    
    @staticmethod
    async def verify_otp(phone: str, otp: str, max_attempts: int = 3) -> bool:
        """Verify OTP for a phone number."""
        stored_data = otp_storage.get(phone)
        
        if not stored_data:
            logger.warning(f"No OTP found for phone: {phone}")
            return False
        
        # Check if OTP expired
        if datetime.utcnow() > stored_data["expires_at"]:
            logger.warning(f"OTP expired for phone: {phone}")
            del otp_storage[phone]
            return False
        
        # Check max attempts
        if stored_data["attempts"] >= max_attempts:
            logger.warning(f"Max OTP attempts exceeded for phone: {phone}")
            del otp_storage[phone]
            return False
        
        # Verify OTP
        if stored_data["otp"] == otp:
            logger.info(f"OTP verified successfully for phone: {phone}")
            del otp_storage[phone]
            return True
        else:
            stored_data["attempts"] += 1
            logger.warning(f"Invalid OTP for phone: {phone} (Attempt {stored_data['attempts']})")
            return False
    
    @staticmethod
    async def cleanup_expired_otps():
        """Clean up expired OTPs from storage."""
        current_time = datetime.utcnow()
        expired_phones = [
            phone for phone, data in otp_storage.items()
            if current_time > data["expires_at"]
        ]
        
        for phone in expired_phones:
            del otp_storage[phone]
        
        if expired_phones:
            logger.info(f"Cleaned up {len(expired_phones)} expired OTPs")


# Create service instance
otp_service = OTPService()
