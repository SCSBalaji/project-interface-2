# Quick Start Guide - Plant Disease Detection App

This guide will help you get the application running in under 10 minutes.

## ⚡ Prerequisites

Before you begin, make sure you have:

- ✅ Python 3.8 or higher
- ✅ Node.js 16 or higher
- ✅ MongoDB (local or Atlas account)
- ✅ Your MobilePlantViT model files

## 🚀 Quick Setup (3 Steps)

### Step 1: Clone and Place Files (2 min)

```bash
# Clone repository
git clone https://github.com/SCSBalaji/project-interface-2.git
cd project-interface-2

# Place your model files
cp /path/to/your/mobileplant_vit_full_checkpoint.pth backend/models/
cp /path/to/your/deployment_metadata.json backend/models/
cp /path/to/your/classification_report.json backend/models/  # optional

# Place your model source code
cp -r /path/to/your/src/* backend/src/
```

### Step 2: Automated Setup (3 min)

```bash
# Run setup script (Linux/Mac)
./setup.sh

# Or manual setup:
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
cd ..

# Frontend
cd frontend
npm install
cp .env.example .env
cd ..
```

### Step 3: Configure and Run (3 min)

```bash
# 1. Start MongoDB (if using local)
# Windows: Usually auto-starts
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# 2. Edit backend/.env
# Set MONGODB_URL if needed
# Set a secure SECRET_KEY

# 3. Start Backend (Terminal 1)
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload

# 4. Start Frontend (Terminal 2)
cd frontend
npm run dev
```

## 🎉 You're Ready!

Open your browser to: **http://localhost:5173**

### First-time Usage:

1. Click **Sign Up**
2. Enter name and phone number (e.g., 9876543210)
3. Click **Send OTP**
4. **Note**: In debug mode, the OTP is shown in the response (e.g., 123456)
5. Enter the OTP and complete signup
6. You're in! Click **Scan Plant** to start

## 🐳 Docker Setup (Alternative)

If you have Docker installed:

```bash
# Start all services
docker-compose up -d

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# MongoDB: localhost:27017
```

## ❓ Common Issues

### Backend won't start
- **Check**: Model files in `backend/models/` directory
- **Check**: Source code in `backend/src/` directory
- **Check**: MongoDB is running
- **Check**: Virtual environment is activated

### Frontend can't connect
- **Check**: Backend is running on port 8000
- **Check**: `.env` file has correct `VITE_API_URL`
- **Check**: CORS is configured in backend

### OTP not received
- In **debug mode**, OTP is returned in API response
- Check backend terminal for OTP: `📱 OTP for 9876543210: 123456`
- For production, configure SMS provider

## 📚 Need Help?

- See full **README.md** for detailed documentation
- Check **plan.md** for implementation details
- Review API docs at http://localhost:8000/docs (when backend is running)

## 🎯 Testing the App

### 1. Test Authentication
- Signup with phone: 9876543210
- Use the OTP shown in terminal/response
- Signin with same credentials

### 2. Test Disease Detection
- Go to Home → Click "Scan Plant"
- Choose image from gallery or take photo
- Wait for analysis
- View results with confidence score

### 3. Test History
- After multiple scans, click "View History"
- See all past predictions

## 🌐 Accessing from Mobile Device

1. Find your computer's IP address:
   ```bash
   # Linux/Mac
   ifconfig | grep inet
   
   # Windows
   ipconfig
   ```

2. Update frontend `.env`:
   ```
   VITE_API_URL=http://YOUR_IP:8000
   ```

3. Access from mobile browser:
   ```
   http://YOUR_IP:5173
   ```

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` in backend `.env`
- [ ] Set `DEBUG=False` in backend
- [ ] Use MongoDB Atlas or secure MongoDB instance
- [ ] Configure real SMS provider for OTP
- [ ] Use HTTPS for both frontend and backend
- [ ] Setup proper logging and monitoring
- [ ] Add rate limiting
- [ ] Configure proper CORS origins
- [ ] Setup backups for database

---

**Ready to detect plant diseases!** 🌱

For issues or questions, refer to the main README.md or create an issue on GitHub.
