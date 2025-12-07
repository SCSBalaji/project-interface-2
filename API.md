# API Documentation

## Base URL
```
http://localhost:8000
```

---

## Authentication Endpoints

### 1. Send OTP for Signup

**Endpoint:** `POST /api/auth/signup/send-otp`

**Description:** Generates and sends OTP to the provided phone number for new user registration.

**Request Body:**
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
  "otp": "123456"  // Only in development mode (DEBUG=True)
}
```

**Status Codes:**
- `200 OK` - OTP sent successfully
- `500 Internal Server Error` - Failed to send OTP

---

### 2. Verify OTP and Complete Signup

**Endpoint:** `POST /api/auth/signup/verify-otp`

**Description:** Verifies OTP and creates a new user account.

**Request Body:**
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
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Status Codes:**
- `200 OK` - User created successfully
- `400 Bad Request` - Invalid or expired OTP
- `500 Internal Server Error` - User creation failed

---

### 3. Send OTP for Signin

**Endpoint:** `POST /api/auth/signin/send-otp`

**Description:** Generates and sends OTP to existing user's phone number.

**Request Body:**
```json
{
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

**Status Codes:**
- `200 OK` - OTP sent successfully
- `404 Not Found` - User not found
- `500 Internal Server Error` - Failed to send OTP

---

### 4. Verify OTP and Signin

**Endpoint:** `POST /api/auth/signin/verify-otp`

**Description:** Verifies OTP and authenticates existing user.

**Request Body:**
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Status Codes:**
- `200 OK` - Signin successful
- `400 Bad Request` - Invalid or expired OTP
- `404 Not Found` - User not found
- `500 Internal Server Error` - Signin failed

---

### 5. Verify Token

**Endpoint:** `GET /api/auth/verify-token`

**Description:** Verifies the JWT token and returns user information.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "phone": "9876543210"
  }
}
```

**Status Codes:**
- `200 OK` - Token valid
- `401 Unauthorized` - Invalid or expired token
- `404 Not Found` - User not found

---

## Prediction Endpoints

### 1. Predict Disease

**Endpoint:** `POST /api/predict/`

**Description:** Analyzes uploaded plant image and predicts disease.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Request:**
- Form Data:
  - `file`: Image file (JPG, JPEG, PNG)
  - Max size: 10MB

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "rank": 1,
      "class": "Apple___Apple_scab",
      "confidence": 0.9523,
      "confidence_percent": "95.23%"
    },
    {
      "rank": 2,
      "class": "Apple___Black_rot",
      "confidence": 0.0342,
      "confidence_percent": "3.42%"
    },
    {
      "rank": 3,
      "class": "Apple___Cedar_apple_rust",
      "confidence": 0.0089,
      "confidence_percent": "0.89%"
    }
  ],
  "top_prediction": {
    "rank": 1,
    "class": "Apple___Apple_scab",
    "confidence": 0.9523,
    "confidence_percent": "95.23%"
  },
  "model_info": {
    "device": "cuda",
    "total_classes": 38
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "message": "Failed to make prediction"
}
```

**Status Codes:**
- `200 OK` - Prediction successful
- `400 Bad Request` - Invalid file type or size
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Prediction failed

---

### 2. Get Model Information

**Endpoint:** `GET /api/predict/model-info`

**Description:** Returns information about the loaded model.

**Response:**
```json
{
  "loaded": true,
  "device": "cuda",
  "num_classes": 38,
  "class_names": [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    ...
  ],
  "metadata": {
    "model_name": "MobilePlantViT",
    "version": "1.0",
    "input_size": [224, 224]
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Failed to get model info

---

### 3. Load Model

**Endpoint:** `POST /api/predict/load-model`

**Description:** Manually loads or reloads the model.

**Response:**
```json
{
  "success": true,
  "message": "Model loaded successfully",
  "info": {
    "loaded": true,
    "device": "cuda",
    "num_classes": 38
  }
}
```

**Status Codes:**
- `200 OK` - Model loaded successfully
- `500 Internal Server Error` - Failed to load model

---

## Health Check Endpoints

### 1. Root Endpoint

**Endpoint:** `GET /`

**Response:**
```json
{
  "name": "Plant Disease Detection API",
  "version": "1.0.0",
  "status": "running",
  "docs": "/docs"
}
```

---

### 2. Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "debug_mode": true
}
```

---

## Error Responses

All endpoints may return the following error formats:

### Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "phone"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### Generic Error
```json
{
  "detail": "Error message describing the issue"
}
```

---

## Authentication Flow

1. **Signup Flow:**
   ```
   POST /api/auth/signup/send-otp
   → User receives OTP
   POST /api/auth/signup/verify-otp
   → Returns JWT token
   → Store token in localStorage
   → Use token in Authorization header for subsequent requests
   ```

2. **Signin Flow:**
   ```
   POST /api/auth/signin/send-otp
   → User receives OTP
   POST /api/auth/signin/verify-otp
   → Returns JWT token
   → Store token in localStorage
   → Use token in Authorization header for subsequent requests
   ```

3. **Prediction Flow:**
   ```
   POST /api/predict/
   (with Authorization: Bearer <token> header)
   → Upload image
   → Receive prediction results
   ```

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider adding:
- OTP requests: 3 per phone number per hour
- Prediction requests: 100 per user per day
- Failed OTP attempts: 3 per phone number

---

## Interactive Documentation

Visit these URLs when the server is running:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

These provide interactive API testing and detailed documentation.
