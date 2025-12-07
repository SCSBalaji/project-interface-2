# 🌱 Plant Disease Detection Web Application

A complete full-stack web application for plant disease detection using MobilePlantViT deep learning model. This application is specifically designed for farmers with a user-friendly, mobile-first interface.

## 🎯 Features

- **OTP-based Authentication**: Secure signup/signin with phone number and OTP verification
- **AI-Powered Disease Detection**: Upload plant images to detect diseases using MobilePlantViT
- **Camera & Gallery Support**: Capture images directly or choose from gallery
- **Prediction History**: Track all past scans and results
- **Multilingual Support**: Support for 10+ Indian languages
- **Farmer-Friendly UI**: 
  - High contrast for sunlight readability
  - Large touch targets (minimum 48px)
  - Simple, intuitive navigation
  - Clear visual feedback
- **Disclaimer Modal**: Important information about AI limitations

## 📦 Tech Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn
- **Database**: MongoDB
- **ML Framework**: PyTorch 2.1.0
- **Authentication**: JWT with OTP
- **Image Processing**: Pillow, OpenCV

### Frontend
- **UI Framework**: React 18.2.0
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios 1.6
- **Icons**: React Icons 4.12

## 📁 Project Structure

```
plant-disease-app/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry
│   │   ├── config.py            # Configuration
│   │   ├── database.py          # MongoDB connection
│   │   ├── routes/
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   └── prediction.py    # Prediction endpoints
│   │   ├── services/
│   │   │   ├── auth_service.py  # Auth logic
│   │   │   └── model_service.py # Model inference
│   │   ├── models/
│   │   │   ├── user.py          # User schemas
│   │   │   └── prediction.py    # Prediction schemas
│   │   └── utils/
│   │       └── preprocessing.py # Image preprocessing
│   │
│   ├── models/                  # ⚠️ PLACE YOUR MODEL FILES HERE
│   │   ├── mobileplant_vit_full_checkpoint.pth
│   │   ├── deployment_metadata.json
│   │   └── classification_report.json
│   │
│   ├── src/                     # ⚠️ PLACE YOUR MODEL SOURCE CODE HERE
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── mobile_plant_vit.py
│   │   └── blocks/
│   │       ├── __init__.py
│   │       ├── ghost_conv.py
│   │       ├── coord_attention.py
│   │       ├── fused_ir.py
│   │       ├── attention.py
│   │       ├── patch_embed.py
│   │       ├── positional_encoding.py
│   │       ├── ffn.py
│   │       ├── classifier.py
│   │       └── utils.py
│   │
│   ├── uploads/                 # Temporary uploaded images
│   ├── examples/                # ⚠️ PLACE EXAMPLE FILES HERE
│   │   └── inference_example_pytorch.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── OTPInput.jsx
│   │   │   └── DisclaimerModal.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── Result.jsx
│   │   │   └── History.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── prediction.js
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   └── styles/
│   │       └── index.css
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── plan.md                      # Implementation plan
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** and npm (for frontend)
- **MongoDB 4.4+** (local or Atlas)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/SCSBalaji/project-interface-2.git
cd project-interface-2
```

### Step 2: Place Model Files

**IMPORTANT**: You need to place your MobilePlantViT model files in the correct locations:

#### Backend Model Files

Copy your files to these exact locations:

```bash
# 1. Model checkpoint and metadata
backend/models/
├── mobileplant_vit_full_checkpoint.pth  ← Place your model checkpoint here
├── deployment_metadata.json              ← Place metadata here
└── classification_report.json            ← Place report here (optional)

# 2. Model source code
backend/src/
├── __init__.py                           ← Place this file
├── models/
│   ├── __init__.py                       ← Place this file
│   └── mobile_plant_vit.py               ← Place your model architecture
└── blocks/
    ├── __init__.py                       ← Place this file
    ├── ghost_conv.py                     ← Place block files
    ├── coord_attention.py                ← Place block files
    ├── fused_ir.py                       ← Place block files
    ├── attention.py                      ← Place block files
    ├── patch_embed.py                    ← Place block files
    ├── positional_encoding.py            ← Place block files
    ├── ffn.py                            ← Place block files
    ├── classifier.py                     ← Place block files
    └── utils.py                          ← Place block files

# 3. Example files (optional - for reference)
backend/examples/
└── inference_example_pytorch.py          ← Place inference example
```

**Note**: The directories already exist. Just copy your files to these locations.

### Step 3: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
cp .env.example .env

# Edit .env file and configure:
# - MONGODB_URL (if using MongoDB Atlas or different host)
# - SECRET_KEY (generate a secure random key)
# - Other settings as needed
```

#### Configure MongoDB

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/docs/manual/installation/

# Start MongoDB service
# Windows: It usually starts automatically
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URL` in `.env` file:
   ```
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/plant_disease_db
   ```

#### Run Backend

```bash
# Make sure you're in backend directory and venv is activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: http://localhost:8000

### Step 4: Setup Frontend

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env if backend is on different host
# VITE_API_URL=http://localhost:8000

# Start development server
npm run dev
```

The frontend will be available at: http://localhost:5173

## 🔧 Configuration

### Backend Configuration (.env)

```env
# Application
APP_NAME=Plant Disease Detection API
DEBUG=True
HOST=0.0.0.0
PORT=8000

# Database
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=plant_disease_db

# Security
SECRET_KEY=your-super-secret-key-change-this  # CHANGE THIS!
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200  # 30 days

# OTP Settings
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6

# CORS
FRONTEND_URL=http://localhost:5173

# Model Settings
MODEL_PATH=models/mobileplant_vit_full_checkpoint.pth
METADATA_PATH=models/deployment_metadata.json
UPLOAD_DIR=uploads

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_EXTENSIONS=jpg,jpeg,png
```

### Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:8000
```

## 📱 Usage

### 1. Sign Up
1. Open http://localhost:5173/signup
2. Enter your name and phone number
3. Click "Send OTP"
4. Enter the 6-digit OTP (shown in debug mode)
5. Click "Verify & Sign Up"

### 2. Sign In
1. Open http://localhost:5173/signin
2. Enter your phone number
3. Click "Send OTP"
4. Enter the 6-digit OTP
5. Click "Verify & Sign In"

### 3. Scan Plant
1. From home page, click "Scan Plant"
2. Choose "Take Photo" (camera) or "Choose from Gallery"
3. Select/capture an image of a plant leaf
4. Click "Analyze Plant"
5. View results with disease name and confidence

### 4. View History
1. Click "View History" from home page
2. See all past scans with results
3. Navigate through pages if you have many scans

## 🎨 Design Features

### Farmer-Friendly Design Principles

1. **Large Touch Targets**: All buttons minimum 48px height
2. **High Contrast**: Dark text on light backgrounds for sunlight readability
3. **Rounded Corners**: 10-14px border radius for friendly feel
4. **Simple Icons**: Visual communication reduces language barriers
5. **Clear Feedback**: Loading states and success/error messages
6. **Earthy Color Palette**: Green, brown, and earth tones

### Color Palette

- **Primary Green**: #22C55E (healthy plants)
- **Secondary Yellow**: #EAB308 (caution)
- **Earth Orange**: #F0611E (warnings)
- **Background**: #FFFEF7 (cream white)
- **Text**: #1F2937 (dark gray)

### Supported Languages

- English
- Hindi (हिंदी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Marathi (मराठी)
- Bengali (বাংলা)
- Gujarati (ગુજરાતી)
- Punjabi (ਪੰਜਾਬੀ)

## 🔍 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup/request-otp
Request OTP for signup
```json
{
  "phone": "9876543210"
}
```

#### POST /api/auth/signup/verify
Verify OTP and create account
```json
{
  "phone": "9876543210",
  "otp": "123456",
  "name": "John Doe",
  "language": "en"
}
```

#### POST /api/auth/signin/request-otp
Request OTP for signin
```json
{
  "phone": "9876543210"
}
```

#### POST /api/auth/signin/verify
Verify OTP and signin
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

#### GET /api/auth/me
Get current user (requires authentication)

### Prediction Endpoints

#### POST /api/prediction/predict
Predict disease from image (requires authentication)
- Content-Type: multipart/form-data
- Body: file (image file)

#### GET /api/prediction/history
Get prediction history (requires authentication)
- Query params: page (default: 1), page_size (default: 10)

#### GET /api/prediction/health
Check if prediction service is ready

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:8000/api/health

# Request OTP (will show OTP in debug mode)
curl -X POST http://localhost:8000/api/auth/signup/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

### Test Frontend

1. Open browser to http://localhost:5173
2. Test signup flow
3. Test signin flow
4. Test image upload and prediction
5. Test history page

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Model not loading
- **Solution**: Ensure model files are placed in `backend/models/` directory
- Check file paths in `.env` file
- Verify model source code is in `backend/src/` directory

**Problem**: MongoDB connection error
- **Solution**: 
  - Check if MongoDB is running: `sudo systemctl status mongod` (Linux)
  - Verify MONGODB_URL in `.env` file
  - For Atlas, check network access and credentials

**Problem**: OTP not working
- **Solution**: In debug mode, OTP is returned in API response
- For production, integrate with SMS provider (Twilio, MSG91, etc.)

### Frontend Issues

**Problem**: Cannot connect to backend
- **Solution**: 
  - Verify backend is running on port 8000
  - Check VITE_API_URL in `.env` file
  - Check CORS settings in backend

**Problem**: Images not uploading
- **Solution**:
  - Check file size (max 10MB)
  - Verify file format (jpg, jpeg, png only)
  - Check network connection

**Problem**: Build errors
- **Solution**:
  - Delete `node_modules` and run `npm install` again
  - Clear cache: `npm cache clean --force`

## 📦 Production Deployment

### Backend Deployment

1. **Set production environment variables**:
   - Set `DEBUG=False`
   - Use strong `SECRET_KEY`
   - Configure production MongoDB URL
   - Setup SMS provider for OTP

2. **Use production server**:
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

3. **Use HTTPS** with reverse proxy (nginx)

### Frontend Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy** `dist/` folder to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - nginx server

3. **Update environment variable**:
   - Set `VITE_API_URL` to production backend URL

## 🤝 Contributing

This is a demonstration project. For production use:
1. Add comprehensive tests
2. Implement proper error logging
3. Add rate limiting
4. Setup monitoring
5. Implement proper SMS OTP service
6. Add data backup strategies
7. Implement security best practices

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

Created by SCSBalaji

## 🙏 Acknowledgments

- MobilePlantViT model for plant disease detection
- FastAPI framework
- React and Vite teams
- MongoDB team
- Tailwind CSS team

---

**Note**: This application uses AI for disease prediction. Results may not always be 100% accurate. For serious agricultural issues, always consult with local agriculture experts.