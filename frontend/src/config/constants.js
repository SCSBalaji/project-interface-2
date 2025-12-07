/**
 * Application configuration constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const ENDPOINTS = {
  AUTH: {
    SIGNUP_SEND_OTP: '/api/auth/signup/send-otp',
    SIGNUP_VERIFY_OTP: '/api/auth/signup/verify-otp',
    SIGNIN_SEND_OTP: '/api/auth/signin/send-otp',
    SIGNIN_VERIFY_OTP: '/api/auth/signin/verify-otp',
    VERIFY_TOKEN: '/api/auth/verify-token',
  },
  PREDICT: {
    PREDICT: '/api/predict/',
    MODEL_INFO: '/api/predict/model-info',
  }
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'plant_disease_auth_token',
  USER_DATA: 'plant_disease_user_data',
  LANGUAGE: 'plant_disease_language',
};

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

export const APP_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  OTP_LENGTH: 6,
  OTP_EXPIRE_MINUTES: 5,
};

export const MESSAGES = {
  en: {
    APP_NAME: 'Plant Disease Detection',
    WELCOME: 'Welcome',
    SCAN_PLANT: 'Scan Plant',
    SIGNIN: 'Sign In',
    SIGNUP: 'Sign Up',
    LOGOUT: 'Logout',
    NAME: 'Name',
    PHONE: 'Phone Number',
    ENTER_OTP: 'Enter OTP',
    SEND_OTP: 'Send OTP',
    VERIFY_OTP: 'Verify OTP',
    CAMERA: 'Camera',
    GALLERY: 'Gallery',
    ANALYZING: 'Analyzing...',
    RESULT: 'Result',
    CONFIDENCE: 'Confidence',
    DISCLAIMER_TITLE: 'Important Notice',
    DISCLAIMER_TEXT: 'This app gives AI-based plant disease predictions. It may not always be exact, especially if the image is unclear. For serious issues, please consult local agriculture experts.',
    UPLOAD_IMAGE: 'Upload Image',
    TAKE_PHOTO: 'Take Photo',
    TRY_AGAIN: 'Try Again',
    ERROR: 'Error',
    SUCCESS: 'Success',
  },
  // Add more languages as needed
};
