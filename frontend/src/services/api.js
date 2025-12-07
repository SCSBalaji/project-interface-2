/**
 * API service for making HTTP requests to the backend
 */
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS } from '../config/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signupSendOTP: async (name, phone) => {
    const response = await api.post(ENDPOINTS.AUTH.SIGNUP_SEND_OTP, { name, phone });
    return response.data;
  },

  signupVerifyOTP: async (name, phone, otp) => {
    const response = await api.post(ENDPOINTS.AUTH.SIGNUP_VERIFY_OTP, {
      name,
      phone,
      otp
    });
    return response.data;
  },

  signinSendOTP: async (phone) => {
    const response = await api.post(ENDPOINTS.AUTH.SIGNIN_SEND_OTP, { phone });
    return response.data;
  },

  signinVerifyOTP: async (phone, otp) => {
    const response = await api.post(ENDPOINTS.AUTH.SIGNIN_VERIFY_OTP, { phone, otp });
    return response.data;
  },

  verifyToken: async () => {
    const response = await api.get(ENDPOINTS.AUTH.VERIFY_TOKEN);
    return response.data;
  },
};

// Prediction APIs
export const predictionAPI = {
  predict: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post(ENDPOINTS.PREDICT.PREDICT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getModelInfo: async () => {
    const response = await api.get(ENDPOINTS.PREDICT.MODEL_INFO);
    return response.data;
  },
};

export default api;
