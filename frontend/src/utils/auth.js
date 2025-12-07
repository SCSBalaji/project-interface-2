/**
 * Authentication utility functions
 */
import { STORAGE_KEYS } from '../config/constants';

export const authUtils = {
  /**
   * Store authentication token
   */
  setToken: (token) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Get authentication token
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Remove authentication token
   */
  removeToken: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Store user data
   */
  setUserData: (userData) => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  },

  /**
   * Get user data
   */
  getUserData: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Remove user data
   */
  removeUserData: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!authUtils.getToken();
  },

  /**
   * Logout user
   */
  logout: () => {
    authUtils.removeToken();
    authUtils.removeUserData();
  },

  /**
   * Validate phone number
   */
  validatePhone: (phone) => {
    // Basic validation for 10-digit phone number
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate name
   */
  validateName: (name) => {
    return name && name.trim().length >= 2;
  },

  /**
   * Validate OTP
   */
  validateOTP: (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);
  },
};

export default authUtils;
