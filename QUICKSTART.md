# Quick Start Guide

Get the Plant Disease Detection app up and running in 5 minutes!

---

## Prerequisites Checklist

- [ ] Python 3.10 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed
- [ ] Model files ready (see below)

---

## Step 1: Clone Repository

```bash
git clone https://github.com/SCSBalaji/project-interface-2.git
cd project-interface-2
```

---

## Step 2: Setup Model Files

### Copy your trained model files to the correct locations:

**Model checkpoint and metadata:**
```bash
# Copy to backend/models/
cp /path/to/mobileplant_vit_full_checkpoint.pth backend/models/
cp /path/to/deployment_metadata.json backend/models/
cp /path/to/classification_report.json backend/models/
```

**MobilePlantViT source code:**
```bash
# Copy to backend/src/
cp /path/to/src/models/mobile_plant_vit.py backend/src/models/
cp /path/to/src/blocks/*.py backend/src/blocks/
```

**Verify files:**
```bash
ls backend/models/
ls backend/src/models/
ls backend/src/blocks/
```

---

## Step 3: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Generate secret key
python -c "import secrets; print(secrets.token_hex(32))"
# Copy the output

# Edit .env file
nano .env  # or use your preferred editor
```

**Update these values in .env:**
```env
SECRET_KEY=paste-the-generated-key-here
MONGODB_URL=mongodb://localhost:27017  # or your MongoDB Atlas URL
DEBUG=True
```

---

## Step 4: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

---

## Step 5: Start MongoDB

**Option 1: Local MongoDB**
```bash
# In a new terminal
mongod --dbpath /path/to/data/directory
```

**Option 2: MongoDB Atlas**
- Use the connection string in backend/.env

---

## Step 6: Start Backend

```bash
# In backend directory with venv activated
cd backend
uvicorn app.main:app --reload --port 8000
```

**You should see:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Test it:**
Open http://localhost:8000 in your browser
You should see:
```json
{
  "name": "Plant Disease Detection API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## Step 7: Start Frontend

```bash
# In a new terminal
cd frontend
npm run dev
```

**You should see:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

---

## Step 8: Access the Application

Open your browser and go to: **http://localhost:5173**

You should see the Plant Disease Detection signin page! 🎉

---

## Step 9: Create Your First Account

1. Click **"Sign Up"**
2. Enter your name: `Test User`
3. Enter phone: `9876543210`
4. Click **"Send OTP"**
5. In development mode, the OTP will be shown on screen (e.g., `123456`)
6. Enter the OTP and click **"Verify OTP"**
7. You're now logged in!

---

## Step 10: Test Disease Detection

1. Click **"Scan Plant"** button
2. Click **"Choose from Gallery"**
3. Select a plant image
4. Click **"Analyze Disease"**
5. Wait for results
6. View the predicted disease and confidence level!

---

## Quick Troubleshooting

### Backend won't start?

**Check Python version:**
```bash
python --version  # Should be 3.10+
```

**Check if port 8000 is in use:**
```bash
# Windows:
netstat -ano | findstr :8000
# macOS/Linux:
lsof -i :8000
```

**Check MongoDB connection:**
```bash
mongosh  # Should connect successfully
```

### Frontend won't start?

**Check Node version:**
```bash
node --version  # Should be 18+
```

**Clear cache and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Can't connect to backend?

**Check backend is running:**
```bash
curl http://localhost:8000/health
```

**Check CORS settings:**
In `backend/app/main.py`, ensure frontend URL is in allowed origins.

---

## Using Docker (Alternative Quick Start)

If you have Docker installed:

```bash
# From project root
docker-compose up --build
```

That's it! Everything starts automatically:
- MongoDB: localhost:27017
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

---

## Next Steps

Now that you're up and running:

1. **Read the full README.md** for detailed documentation
2. **Check API.md** for API documentation
3. **Review DEPLOYMENT.md** for production deployment
4. **Customize the app** for your specific needs

---

## Getting Help

- 📖 Read the [Full Documentation](README.md)
- 🐛 Report bugs via [GitHub Issues](https://github.com/SCSBalaji/project-interface-2/issues)
- 💬 Ask questions in [GitHub Discussions](https://github.com/SCSBalaji/project-interface-2/discussions)

---

## Summary

✅ **What You Did:**
1. Cloned the repository
2. Added model files
3. Set up backend (Python + FastAPI)
4. Set up frontend (React + Vite)
5. Started MongoDB
6. Started all services
7. Created an account
8. Tested disease detection

✅ **What You Have:**
- A fully functional plant disease detection web app
- OTP-based authentication
- AI-powered disease prediction
- Beautiful, farmer-friendly UI

---

**Congratulations! You're ready to detect plant diseases! 🌿🎉**
