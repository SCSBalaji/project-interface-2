/**
 * Authentication API calls
 */
import api from './api';

export const authService = {
  // Request OTP for signup
  requestSignupOTP: async (phone) => {
    const response = await api.post('/api/auth/signup/request-otp', { phone });
    return response.data;
  },

  // Verify OTP and complete signup
  verifySignup: async (phone, otp, name, language = 'en') => {
    const response = await api.post('/api/auth/signup/verify', {
      phone,
      otp,
      name,
      language
    });
    return response.data;
  },

  // Request OTP for signin
  requestSigninOTP: async (phone) => {
    const response = await api.post('/api/auth/signin/request-otp', { phone });
    return response.data;
  },

  // Verify OTP and signin
  verifySignin: async (phone, otp) => {
    const response = await api.post('/api/auth/signin/verify', { phone, otp });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
