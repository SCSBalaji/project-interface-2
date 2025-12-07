# API Documentation - Plant Disease Detection

Base URL: `http://localhost:8000`

## 📝 Authentication

All prediction endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🔐 Authentication Endpoints

### 1. Request Signup OTP

Request an OTP to create a new account.

**Endpoint**: `POST /api/auth/signup/request-otp`

**Request Body**:
```json
{
  "phone": "9876543210"
}
```

**Response** (200 OK):
```json
{
  "message": "OTP sent successfully",
  "otp": "123456",  // Only in debug mode
  "expires_in": 5
}
```

**Errors**:
- `500`: Failed to send OTP

---

### 2. Verify Signup OTP

Verify OTP and create a new user account.

**Endpoint**: `POST /api/auth/signup/verify`

**Request Body**:
```json
{
  "phone": "9876543210",
  "otp": "123456",
  "name": "John Doe",
  "language": "en"
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "phone": "9876543210",
    "language": "en"
  }
}
```

**Errors**:
- `400`: Invalid or expired OTP
- `400`: Phone number mismatch
- `500`: Signup failed

---

### 3. Request Signin OTP

Request an OTP to sign in to an existing account.

**Endpoint**: `POST /api/auth/signin/request-otp`

**Request Body**:
```json
{
  "phone": "9876543210"
}
```

**Response** (200 OK):
```json
{
  "message": "OTP sent successfully",
  "otp": "123456",  // Only in debug mode
  "expires_in": 5
}
```

**Errors**:
- `404`: User not found. Please sign up first.
- `500`: Failed to send OTP

---

### 4. Verify Signin OTP

Verify OTP and sign in to account.

**Endpoint**: `POST /api/auth/signin/verify`

**Request Body**:
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "phone": "9876543210",
    "language": "en"
  }
}
```

**Errors**:
- `400`: Invalid or expired OTP
- `404`: User not found
- `500`: Signin failed

---

### 5. Get Current User

Get information about the currently authenticated user.

**Endpoint**: `GET /api/auth/me`

**Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Response** (200 OK):
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "phone": "9876543210",
  "language": "en",
  "created_at": "2024-12-07T10:30:00"
}
```

**Errors**:
- `401`: Not authenticated
- `404`: User not found

---

## 🔬 Prediction Endpoints

### 1. Predict Disease

Upload an image and get plant disease prediction.

**Endpoint**: `POST /api/prediction/predict`

**Headers**:
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Request Body** (form-data):
```
file: <image_file>  // JPG, JPEG, or PNG (max 10MB)
```

**Response** (200 OK):
```json
{
  "success": true,
  "prediction": {
    "disease_name": "Tomato Early Blight",
    "confidence": 95.67,
    "top_predictions": [
      {
        "disease_name": "Tomato Early Blight",
        "confidence": 95.67
      },
      {
        "disease_name": "Tomato Septoria Leaf Spot",
        "confidence": 2.31
      },
      {
        "disease_name": "Tomato Late Blight",
        "confidence": 1.02
      }
    ]
  }
}
```

**Errors**:
- `400`: Invalid image file
- `400`: Image size exceeds maximum allowed
- `401`: Not authenticated
- `500`: Prediction failed

---

### 2. Get Prediction History

Get user's prediction history with pagination.

**Endpoint**: `GET /api/prediction/history`

**Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Query Parameters**:
- `page` (optional, default: 1): Page number
- `page_size` (optional, default: 10): Items per page

**Example**: `/api/prediction/history?page=1&page_size=10`

**Response** (200 OK):
```json
{
  "predictions": [
    {
      "id": "507f1f77bcf86cd799439011",
      "disease_name": "Tomato Early Blight",
      "confidence": 95.67,
      "top_predictions": [...],
      "created_at": "2024-12-07T10:30:00"
    }
  ],
  "total": 25,
  "page": 1,
  "page_size": 10,
  "total_pages": 3
}
```

**Errors**:
- `401`: Not authenticated
- `500`: Failed to get history

---

### 3. Health Check

Check if prediction service is ready.

**Endpoint**: `GET /api/prediction/health`

**Response** (200 OK):
```json
{
  "status": "ready",
  "model_loaded": true
}
```

Or if not ready:
```json
{
  "status": "initializing",
  "model_loaded": false
}
```

---

## 🏥 General Endpoints

### 1. Root

Get API information.

**Endpoint**: `GET /`

**Response** (200 OK):
```json
{
  "message": "🌱 Plant Disease Detection API",
  "version": "1.0.0",
  "status": "running"
}
```

---

### 2. API Health

Check API health status.

**Endpoint**: `GET /api/health`

**Response** (200 OK):
```json
{
  "status": "healthy",
  "model_ready": true
}
```

---

## 🔑 Supported Languages

Language codes for user profiles:
- `en` - English
- `hi` - Hindi
- `ta` - Tamil
- `te` - Telugu
- `kn` - Kannada
- `ml` - Malayalam
- `mr` - Marathi
- `bn` - Bengali
- `gu` - Gujarati
- `pa` - Punjabi

---

## 📊 Response Codes

- `200`: Success
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

---

## 🧪 Testing with cURL

### Signup Flow
```bash
# 1. Request OTP
curl -X POST http://localhost:8000/api/auth/signup/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'

# 2. Verify OTP and signup
curl -X POST http://localhost:8000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "otp":"123456",
    "name":"John Doe",
    "language":"en"
  }'
```

### Prediction Flow
```bash
# 1. Upload image for prediction
curl -X POST http://localhost:8000/api/prediction/predict \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/plant_image.jpg"

# 2. Get history
curl http://localhost:8000/api/prediction/history?page=1&page_size=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🌐 Interactive API Docs

FastAPI provides interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These interfaces allow you to test all endpoints directly from the browser.

---

## 🔒 Security Notes

1. **JWT Tokens**: Expire after 30 days (configurable)
2. **OTP**: Expires after 5 minutes
3. **File Upload**: Max 10MB, only JPG/JPEG/PNG
4. **Rate Limiting**: Implement in production
5. **HTTPS**: Use in production
6. **CORS**: Configure allowed origins

---

For more details, see the main README.md file.
