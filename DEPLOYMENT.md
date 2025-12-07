# Deployment Guide

This guide covers various deployment options for the Plant Disease Detection application.

---

## Table of Contents

1. [Local Development Deployment](#local-development-deployment)
2. [Production Deployment](#production-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Security Considerations](#security-considerations)
7. [Monitoring and Logging](#monitoring-and-logging)

---

## Local Development Deployment

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB 7.0+

### Backend Setup

```bash
# Navigate to backend directory
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

# Edit .env and set:
# - MONGODB_URL
# - SECRET_KEY (use: python -c "import secrets; print(secrets.token_hex(32))")
# - Other settings as needed

# Run the application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB
mongod --dbpath /path/to/data/directory
```

**Option 2: MongoDB Atlas (Cloud)**
```bash
# Sign up at https://www.mongodb.com/cloud/atlas
# Create a free cluster
# Get connection string
# Update MONGODB_URL in .env
```

---

## Production Deployment

### Backend Production Setup

1. **Install Production Dependencies**
   ```bash
   pip install gunicorn
   ```

2. **Create Production Environment File**
   ```bash
   cp .env.example .env.production
   ```

3. **Update Production Settings**
   ```env
   DEBUG=False
   SECRET_KEY=<strong-random-key>
   MONGODB_URL=<production-mongodb-url>
   FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Run with Gunicorn**
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
   ```

### Frontend Production Build

1. **Create Production Build**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve with Static Server**
   ```bash
   # Install serve
   npm install -g serve
   
   # Serve the build
   serve -s dist -p 5173
   ```

3. **Configure Environment**
   Create `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

---

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and Start Services**
   ```bash
   # Build images
   docker-compose build
   
   # Start services
   docker-compose up -d
   ```

2. **View Logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop Services**
   ```bash
   docker-compose down
   ```

### Individual Container Deployment

**Backend Container:**
```bash
cd backend
docker build -t plant-disease-backend .
docker run -d -p 8000:8000 \
  -e MONGODB_URL=mongodb://host.docker.internal:27017 \
  -e SECRET_KEY=your-secret-key \
  plant-disease-backend
```

**Frontend Container:**
```bash
cd frontend
docker build -t plant-disease-frontend .
docker run -d -p 5173:5173 \
  -e VITE_API_URL=http://localhost:8000 \
  plant-disease-frontend
```

---

## Cloud Deployment

### AWS Deployment

#### 1. Backend on AWS EC2

```bash
# Launch EC2 instance (Ubuntu 22.04)
# SSH into instance

# Install dependencies
sudo apt update
sudo apt install python3.10 python3-pip python3-venv nginx

# Clone repository
git clone <your-repo>
cd backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install Gunicorn
pip install gunicorn

# Create systemd service
sudo nano /etc/systemd/system/plant-disease.service
```

**Service File:**
```ini
[Unit]
Description=Plant Disease Detection API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/backend
Environment="PATH=/home/ubuntu/backend/venv/bin"
ExecStart=/home/ubuntu/backend/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl start plant-disease
sudo systemctl enable plant-disease

# Configure Nginx
sudo nano /etc/nginx/sites-available/plant-disease
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/plant-disease /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

#### 2. Frontend on AWS S3 + CloudFront

```bash
# Build frontend
cd frontend
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload build
aws s3 sync dist/ s3://your-bucket-name

# Configure bucket for static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Create CloudFront distribution (via AWS Console)
# Point to S3 bucket
```

#### 3. MongoDB Atlas

```bash
# Create cluster at https://www.mongodb.com/cloud/atlas
# Whitelist IP addresses
# Get connection string
# Update backend .env with connection string
```

### Heroku Deployment

#### Backend on Heroku

1. **Create Heroku App**
   ```bash
   heroku create plant-disease-api
   ```

2. **Add Procfile**
   Create `backend/Procfile`:
   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Deploy**
   ```bash
   cd backend
   git init
   heroku git:remote -a plant-disease-api
   git add .
   git commit -m "Initial deploy"
   git push heroku main
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set MONGODB_URL=your-mongodb-url
   ```

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment**
   - Set `VITE_API_URL` in Vercel dashboard

---

## Environment Configuration

### Backend Environment Variables

**Required:**
- `MONGODB_URL` - MongoDB connection string
- `SECRET_KEY` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS

**Optional:**
- `DEBUG` - Enable debug mode (default: True)
- `HOST` - Server host (default: 0.0.0.0)
- `PORT` - Server port (default: 8000)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiry (default: 30)

### Frontend Environment Variables

**Required:**
- `VITE_API_URL` - Backend API URL

---

## Security Considerations

### Production Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY` (32+ random characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure proper CORS settings
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Implement proper logging
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Implement SMS OTP service (replace in-memory OTP)
- [ ] Add input validation and sanitization
- [ ] Configure firewall rules
- [ ] Use CDN for frontend assets

### HTTPS/SSL Setup

**Using Let's Encrypt (Certbot):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Monitoring and Logging

### Application Logging

**Backend:**
```python
# Already configured in app/main.py
# Logs are written to stdout
# In production, use log aggregation service
```

**View Logs:**
```bash
# Docker
docker-compose logs -f backend

# Systemd
sudo journalctl -u plant-disease -f

# Heroku
heroku logs --tail
```

### Monitoring Tools

**Recommended:**
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Datadog** - Infrastructure monitoring
- **CloudWatch** - AWS monitoring

### Health Checks

**Backend Health Check:**
```bash
curl http://localhost:8000/health
```

**Automated Monitoring:**
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerts for downtime
- Monitor API response times

---

## Database Backup

### MongoDB Backup

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/plant_disease_db" --out=/backup/path

# Restore
mongorestore --uri="mongodb://localhost:27017/plant_disease_db" /backup/path/plant_disease_db
```

### Automated Backups

**Using Cron:**
```bash
# Add to crontab
0 2 * * * mongodump --uri="mongodb://localhost:27017/plant_disease_db" --out=/backup/$(date +\%Y\%m\%d)
```

---

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, AWS ELB)
- Run multiple backend instances
- Use Redis for session storage
- Implement caching (Redis, Memcached)

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize model inference
- Use GPU for predictions

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process
lsof -i :8000
# Kill process
kill -9 <PID>
```

**Permission denied:**
```bash
# Fix permissions
chmod +x script.sh
```

**Module not found:**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

---

## Support

For deployment issues, please:
1. Check logs for error messages
2. Review environment variables
3. Verify network connectivity
4. Check firewall settings
5. Open an issue on GitHub

---

**Happy Deploying! 🚀**
