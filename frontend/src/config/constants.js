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
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

// File upload configuration
const MAX_FILE_SIZE_MB = 10;

export const APP_CONFIG = {
  MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1024 * 1024, // 10MB in bytes
  MAX_FILE_SIZE_MB,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  OTP_LENGTH: 6,
  OTP_EXPIRE_MINUTES: 5,
};

// Analysis progress simulation steps (configurable)
export const ANALYSIS_STEPS = [
  { progress: 20, status: 'Uploading image...', delay: 500 },
  { progress: 40, status: 'Processing image...', delay: 800 },
  { progress: 60, status: 'Running AI analysis...', delay: 1000 },
  { progress: 80, status: 'Identifying disease...', delay: 1000 },
  { progress: 95, status: 'Finalizing results...', delay: 500 },
];

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
    DISCLAIMER_TEXT:
      'This app gives AI-based plant disease predictions. It may not always be exact, especially if the image is unclear. For serious issues, please consult local agriculture experts.',
    UPLOAD_IMAGE: 'Upload Image',
    TAKE_PHOTO: 'Take Photo',
    TRY_AGAIN: 'Try Again',
    ERROR: 'Error',
    SUCCESS: 'Success',
  },

  te: {
    APP_NAME: 'మొక్క వ్యాధి నిర్ధారణ',
    WELCOME: 'స్వాగతం',
    SCAN_PLANT: 'మొక్కను స్కాన్ చేయండి',
    SIGNIN: 'లాగిన్',
    SIGNUP: 'నమోదు',
    LOGOUT: 'లాగ్ అవుట్',
    NAME: 'పేరు',
    PHONE: 'ఫోన్ నంబర్',
    ENTER_OTP: 'OTP నమోదు చేయండి',
    SEND_OTP: 'OTP పంపండి',
    VERIFY_OTP: 'OTP నిర్ధారించండి',
    CAMERA: 'కెమెరా',
    GALLERY: 'గ్యాలరీ',
    ANALYZING: 'విశ్లేషణలో ఉంది...',
    RESULT: 'ఫలితం',
    CONFIDENCE: 'నమ్మక స్థాయి',
    DISCLAIMER_TITLE: 'ముఖ్య గమనిక',
    DISCLAIMER_TEXT:
      'ఈ యాప్ AI ఆధారిత మొక్క వ్యాధి అంచనాలను ఇస్తుంది. చిత్రము స్పష్టంగా లేకపోతే ఇది ఎప్పుడూ ఖచ్చితంగా ఉండకపోవచ్చు. తీవ్ర సమస్యలకు స్థానిక వ్యవసాయ నిపుణులను సంప్రదించండి.',
    UPLOAD_IMAGE: 'చిత్రాన్ని అప్లోడ్ చేయండి',
    TAKE_PHOTO: 'ఫోటో తీసుకోండి',
    TRY_AGAIN: 'మళ్లీ ప్రయత్నించండి',
    ERROR: 'లోపం',
    SUCCESS: 'విజయం',
  },

  hi: {
    APP_NAME: 'पौधों की बीमारी की पहचान',
    WELCOME: 'स्वागत है',
    SCAN_PLANT: 'पौधा स्कैन करें',
    SIGNIN: 'साइन इन',
    SIGNUP: 'साइन अप',
    LOGOUT: 'लॉगआउट',
    NAME: 'नाम',
    PHONE: 'फ़ोन नंबर',
    ENTER_OTP: 'OTP दर्ज करें',
    SEND_OTP: 'OTP भेजें',
    VERIFY_OTP: 'OTP सत्यापित करें',
    CAMERA: 'कैमरा',
    GALLERY: 'गैलरी',
    ANALYZING: 'विश्लेषण हो रहा है...',
    RESULT: 'परिणाम',
    CONFIDENCE: 'विश्वास स्तर',
    DISCLAIMER_TITLE: 'महत्वपूर्ण सूचना',
    DISCLAIMER_TEXT:
      'यह ऐप AI आधारित पौधों की बीमारी की भविष्यवाणी करता है। अस्पष्ट तस्वीर होने पर परिणाम हमेशा सटीक नहीं हो सकता। गंभीर मामलों में स्थानीय कृषि विशेषज्ञ से सलाह लें।',
    UPLOAD_IMAGE: 'छवि अपलोड करें',
    TAKE_PHOTO: 'फोटो लें',
    TRY_AGAIN: 'फिर से कोशिश करें',
    ERROR: 'त्रुटि',
    SUCCESS: 'सफलता',
  },

  ta: {
    APP_NAME: 'செடி நோய் கண்டறிதல்',
    WELCOME: 'வரவேற்பு',
    SCAN_PLANT: 'செடியை ஸ்கேன் செய்யவும்',
    SIGNIN: 'உள்நுழை',
    SIGNUP: 'பதிவு செய்',
    LOGOUT: 'வெளியேறு',
    NAME: 'பெயர்',
    PHONE: 'தொலைபேசி எண்',
    ENTER_OTP: 'OTP-ஐ உள்ளிடவும்',
    SEND_OTP: 'OTP அனுப்பவும்',
    VERIFY_OTP: 'OTP சரிபார்க்கவும்',
    CAMERA: 'கேமரா',
    GALLERY: 'கேலரி',
    ANALYZING: 'பகுப்பாய்வு செய்கிறது...',
    RESULT: 'விளைவு',
    CONFIDENCE: 'நம்பிக்கை அளவு',
    DISCLAIMER_TITLE: 'முக்கிய அறிவிப்பு',
    DISCLAIMER_TEXT:
      'இந்த பயன்பாடு AI அடிப்படையிலான செடி நோய் கணிப்புகளை வழங்குகிறது. படம் தெளிவாக இல்லாத போது அது எல்லா நேரமும் துல்லியமாக இருக்காது. தீவிர பிரச்சனைகளுக்கு உள்ளூர் வேளாண்மை நிபுணர்களை அணுகவும்.',
    UPLOAD_IMAGE: 'படத்தை பதிவேற்றவும்',
    TAKE_PHOTO: 'புகைப்படம் எடுக்கவும்',
    TRY_AGAIN: 'மீண்டும் முயற்சிக்கவும்',
    ERROR: 'பிழை',
    SUCCESS: 'வெற்றி',
  },

  kn: {
    APP_NAME: 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ',
    WELCOME: 'ಸ್ವಾಗತ',
    SCAN_PLANT: 'ಸಸ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    SIGNIN: 'ಸೈನ್ ಇನ್',
    SIGNUP: 'ಸೈನ್ ಅಪ್',
    LOGOUT: 'ಲಾಗ್ ಔಟ್',
    NAME: 'ಹೆಸರು',
    PHONE: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    ENTER_OTP: 'OTP ನಮೂದಿಸಿ',
    SEND_OTP: 'OTP ಕಳುಹಿಸಿ',
    VERIFY_OTP: 'OTP ಪರಿಶೀಲಿಸಿ',
    CAMERA: 'ಕ್ಯಾಮೆರಾ',
    GALLERY: 'ಗ್ಯಾಲರಿ',
    ANALYZING: 'ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿದೆ...',
    RESULT: 'ಫಲಿತಾಂಶ',
    CONFIDENCE: 'ವಿಶ್ವಾಸ ಮಟ್ಟ',
    DISCLAIMER_TITLE: 'ಮುಖ್ಯ ಸೂಚನೆ',
    DISCLAIMER_TEXT:
      'ಈ ಆಪ್ AI ಆಧಾರಿತ ಸಸ್ಯ ರೋಗ ಭವಿಷ್ಯವಾಣಿ ನೀಡುತ್ತದೆ. ಚಿತ್ರ ಸ್ಪಷ್ಟವಾಗಿರದಿದ್ದರೆ ಫಲಿತಾಂಶ ಯಾವಾಗಲೂ ನಿಖರವಾಗಿರದೇ ಇರಬಹುದು. ಗಂಭೀರ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ಸ್ಥಳೀಯ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    UPLOAD_IMAGE: 'ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    TAKE_PHOTO: 'ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ',
    TRY_AGAIN: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    ERROR: 'ದೋಷ',
    SUCCESS: 'ಯಶಸ್ಸು',
  },

  mr: {
    APP_NAME: 'वनस्पती रोग निदान',
    WELCOME: 'स्वागत आहे',
    SCAN_PLANT: 'वनस्पती स्कॅन करा',
    SIGNIN: 'साइन इन',
    SIGNUP: 'साइन अप',
    LOGOUT: 'लॉगआउट',
    NAME: 'नाव',
    PHONE: 'फोन नंबर',
    ENTER_OTP: 'OTP प्रविष्ट करा',
    SEND_OTP: 'OTP पाठवा',
    VERIFY_OTP: 'OTP सत्यापित करा',
    CAMERA: 'कॅमेरा',
    GALLERY: 'गॅलरी',
    ANALYZING: 'विश्लेषण सुरू आहे...',
    RESULT: 'परिणाम',
    CONFIDENCE: 'विश्वास पातळी',
    DISCLAIMER_TITLE: 'महत्त्वाची सूचना',
    DISCLAIMER_TEXT:
      'ही अ‍ॅप AI आधारित वनस्पती रोगांचे अंदाज देते. फोटो अस्पष्ट असल्यास परिणाम नेहमी अचूक नसू शकतो. गंभीर समस्यांसाठी स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.',
    UPLOAD_IMAGE: 'प्रतिमा अपलोड करा',
    TAKE_PHOTO: 'फोटो घ्या',
    TRY_AGAIN: 'पुन्हा प्रयत्न करा',
    ERROR: 'त्रुटी',
    SUCCESS: 'यश',
  },
};
