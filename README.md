# 🌿 Plant Disease Detection Web Application

An AI-powered web application for detecting plant diseases using the MobilePlantViT model. This farmer-friendly application provides an intuitive interface with OTP-based authentication and real-time disease prediction.

![Plant Disease Detection](https://img.shields.io/badge/AI-Plant%20Disease%20Detection-green)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![React](https://img.shields.io/badge/React-18.2+-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Model Files Setup](#model-files-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### User Features
- 🔐 **OTP-based Authentication** - Secure signup/signin with phone number and OTP
- 📸 **Image Upload** - Take photos or upload from gallery
- 🤖 **AI-Powered Detection** - Real-time plant disease prediction using MobilePlantViT
- 📊 **Confidence Scores** - View prediction confidence levels
- 🌐 **Multilingual Support** - Interface available in multiple languages
- 📱 **Mobile-First Design** - Optimized for smartphones and tablets
- ⚡ **Fast Results** - Get predictions in seconds
- ℹ️ **Disclaimer Modal** - Important information about AI predictions

### Design Features
- 👆 **Large Touch Targets** - Buttons at least 48px height for easy tapping
- 🎨 **High Contrast** - Designed for sunlight visibility
- 🔄 **Smooth Animations** - Professional and engaging UI
- 🌈 **Farmer-Friendly Colors** - Green, blue, and yellow color palette

---

## 🛠️ Tech Stack

### Backend
| Component | Technology | Version |
|-----------|------------|---------|
| API Framework | FastAPI | 0.104.1 |
| Server | Uvicorn | 0.24.0 |
| Database | MongoDB | 7.0 |
| ML Framework | PyTorch | 2.1.0 |
| Authentication | JWT | - |
| OTP Service | In-Memory (Dev) | - |

### Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| UI Framework | React | 18.2.0 |
| Build Tool | Vite | 5.0.0 |
| Styling | Tailwind CSS | 3.3.0 |
| Routing | React Router | 6.20.0 |
| HTTP Client | Axios | 1.6.0 |
| Icons | React Icons | 4.12.0 |

---

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
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   └── prediction.py    # Prediction endpoints
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py  # Auth logic
│   │   │   ├── otp_service.py   # OTP management
│   │   │   └── model_service.py # Model inference
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── user.py          # User models
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── preprocessing.py # Image preprocessing
│   │
│   ├── models/                  # Model files (add your files here)
│   │   ├── mobileplant_vit_full_checkpoint.pth
│   │   ├── deployment_metadata.json
│   │   └── classification_report.json
│   │
│   ├── src/                     # MobilePlantViT source (add your files here)
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
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── AnalyzingScreen.jsx
│   │   │   ├── PredictionResult.jsx
│   │   │   └── DisclaimerModal.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── config/
│   │   │   └── constants.js
│   │   └── styles/
│   │       └── index.css
│   │
│   ├── public/
│   │   └── leaf-icon.svg
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
├── PLAN.md
└── README.md
```

---

## 📦 Prerequisites

### Required
- **Python** 3.10 or higher
- **Node.js** 18 or higher
- **MongoDB** 7.0 or higher
- **npm** or **yarn**

### Optional
- **Docker** and **Docker Compose** (for containerized deployment)
- **CUDA** (for GPU acceleration)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SCSBalaji/project-interface-2.git
cd project-interface-2
```

### 2. Backend Setup

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

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# Especially set:
# - MONGODB_URL
# - SECRET_KEY (generate a secure random key)
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# The app will use http://localhost:8000 as backend URL by default
# To change, create a .env file:
# VITE_API_URL=http://your-backend-url
```

### 4. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB 7.0 from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod --dbpath /path/to/data/directory
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URL` in backend/.env

---

## 📥 Model Files Setup

**IMPORTANT:** You need to place your trained MobilePlantViT model files in the correct directories.

### Step 1: Model Checkpoint and Metadata

Place these files in `backend/models/`:

```bash
backend/models/
├── mobileplant_vit_full_checkpoint.pth    # Your trained model checkpoint
├── deployment_metadata.json                # Model metadata with class names
└── classification_report.json              # (Optional) Classification metrics
```

### Step 2: MobilePlantViT Source Code

Place these files in `backend/src/`:

```bash
backend/src/
├── __init__.py                             # Already created
├── models/
│   ├── __init__.py                         # Already created
│   └── mobile_plant_vit.py                 # ← Add your file here
└── blocks/
    ├── __init__.py                         # Already created
    ├── ghost_conv.py                       # ← Add your file here
    ├── coord_attention.py                  # ← Add your file here
    ├── fused_ir.py                         # ← Add your file here
    ├── attention.py                        # ← Add your file here
    ├── patch_embed.py                      # ← Add your file here
    ├── positional_encoding.py              # ← Add your file here
    ├── ffn.py                              # ← Add your file here
    ├── classifier.py                       # ← Add your file here
    └── utils.py                            # ← Add your file here
```

### Step 3: Verify File Placement

```bash
# From project root
ls -la backend/models/
# Should show: mobileplant_vit_full_checkpoint.pth, deployment_metadata.json

ls -la backend/src/models/
# Should show: __init__.py, mobile_plant_vit.py

ls -la backend/src/blocks/
# Should show all block files
```

### Example deployment_metadata.json Format

```json
{
  "model_name": "MobilePlantViT",
  "version": "1.0",
  "num_classes": 38,
  "class_names": [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    ...
  ],
  "input_size": [224, 224],
  "mean": [0.485, 0.456, 0.406],
  "std": [0.229, 0.224, 0.225]
}
```

---

## 🏃 Running the Application

### Method 1: Manual Startup (Development)

**Terminal 1: Start MongoDB**
```bash
mongod --dbpath /path/to/data/directory
```

**Terminal 2: Start Backend**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 3: Start Frontend**
```bash
cd frontend
npm run dev
```

**Access the Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Method 2: Docker Compose (Production-Ready)

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

**Access the Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- MongoDB: localhost:27017

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup/send-otp`
Send OTP for user signup.

**Request:**
```json
{
  "name": "John Doe",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "phone": "9876543210",
  "otp": "123456"  // Only in development mode
}
```

#### POST `/api/auth/signup/verify-otp`
Verify OTP and create user account.

**Request:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

#### POST `/api/auth/signin/send-otp`
Send OTP for user signin.

#### POST `/api/auth/signin/verify-otp`
Verify OTP and signin user.

#### GET `/api/auth/verify-token`
Verify JWT token (requires Authorization header).

### Prediction Endpoints

#### POST `/api/predict/`
Predict plant disease from image.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Request:**
```
file: <image-file>
```

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "rank": 1,
      "class": "Apple___Apple_scab",
      "confidence": 0.95,
      "confidence_percent": "95.00%"
    },
    ...
  ],
  "top_prediction": {
    "rank": 1,
    "class": "Apple___Apple_scab",
    "confidence": 0.95,
    "confidence_percent": "95.00%"
  },
  "model_info": {
    "device": "cuda",
    "total_classes": 38
  }
}
```

#### GET `/api/predict/model-info`
Get model information.

For complete API documentation, visit: http://localhost:8000/docs

---

## 📖 Usage Guide

### For End Users

1. **Sign Up**
   - Enter your name and 10-digit phone number
   - Receive OTP (in development, shown on screen)
   - Enter OTP to create account

2. **Sign In**
   - Enter your registered phone number
   - Receive and enter OTP

3. **Scan Plant**
   - Click "Scan Plant" button on home page
   - Choose to take photo or upload from gallery
   - Review image and click "Analyze Disease"

4. **View Results**
   - Wait for AI analysis (5-10 seconds)
   - View detected disease and confidence level
   - See alternative predictions
   - Read disclaimer for important information

5. **Scan Another**
   - Click "Scan Another Plant" to repeat

### For Developers

#### Adding New Languages

Edit `frontend/src/config/constants.js`:

```javascript
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  // Add more languages
];

export const MESSAGES = {
  en: { /* English messages */ },
  hi: { /* Hindi messages */ },
  // Add more translations
};
```

#### Customizing UI Colors

Edit `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: { /* Green shades */ },
  secondary: { /* Blue shades */ },
  accent: { /* Yellow shades */ },
}
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# MongoDB
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=plant_disease_db

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Model
MODEL_PATH=models/mobileplant_vit_full_checkpoint.pth
METADATA_PATH=models/deployment_metadata.json

# Upload
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=10485760

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

---

## 🐳 Docker Setup

### Build Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Services

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up backend

# Run in background
docker-compose up -d
```

### Manage Services

```bash
# Stop services
docker-compose stop

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Module import errors
```bash
# Solution: Ensure all model files are in place
ls backend/src/models/mobile_plant_vit.py
ls backend/src/blocks/

# Verify virtual environment is activated
which python  # Should show venv path
```

**Problem:** MongoDB connection error
```bash
# Solution: Check MongoDB is running
mongosh  # Should connect successfully

# Check connection string in .env
MONGODB_URL=mongodb://localhost:27017
```

**Problem:** Model file not found
```bash
# Solution: Verify model file exists
ls -lh backend/models/mobileplant_vit_full_checkpoint.pth

# Check MODEL_PATH in .env matches actual file location
```

### Frontend Issues

**Problem:** API connection error
```bash
# Solution: Check backend is running
curl http://localhost:8000/health

# Verify VITE_API_URL in frontend
echo $VITE_API_URL
```

**Problem:** Build errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Common Issues

**CORS errors:**
- Check FRONTEND_URL in backend .env
- Verify CORS middleware in app/main.py

**OTP not received:**
- In development mode, OTP is shown in response
- Check backend logs for OTP

**Prediction fails:**
- Ensure image is clear and well-lit
- Check image size (max 10MB)
- Verify supported formats: JPG, PNG

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **SCS Balaji** - Initial work - [SCSBalaji](https://github.com/SCSBalaji)

---

## 🙏 Acknowledgments

- MobilePlantViT model architecture
- PlantVillage dataset
- FastAPI and React communities
- All contributors and testers

---

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Made with ❤️ for farmers worldwide** 🌾