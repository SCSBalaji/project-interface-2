/**
 * Signin component with OTP verification
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPhone, FaKey } from 'react-icons/fa';
import { authAPI } from '../services/api';
import { authUtils } from '../utils/auth';
import { MESSAGES } from '../config/constants';

const Signin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter phone, 2: Verify OTP
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOTP, setDebugOTP] = useState(''); // For development

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    // Validate phone
    if (!authUtils.validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signinSendOTP(formData.phone);
      
      // In development mode, save OTP for testing
      if (response.otp) {
        setDebugOTP(response.otp);
      }
      
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    // Validate OTP
    if (!authUtils.validateOTP(formData.otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signinVerifyOTP(formData.phone, formData.otp);
      
      // Store token
      authUtils.setToken(response.access_token);
      
      // Fetch user data
      const userData = await authAPI.verifyToken();
      authUtils.setUserData(userData.user);
      
      // Navigate to home
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🌿</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {MESSAGES.en.SIGNIN}
            </h2>
            <p className="text-gray-600">Sign in to continue</p>
          </div>

          {/* Step 1: Enter phone */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {MESSAGES.en.PHONE}
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field pl-12"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Sending...' : MESSAGES.en.SEND_OTP}
              </button>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* OTP sent message */}
              <div className="bg-secondary-50 border-2 border-secondary-200 rounded-lg p-4 text-center">
                <p className="text-secondary-800 font-semibold mb-1">OTP Sent!</p>
                <p className="text-sm text-secondary-700">
                  Enter the 6-digit OTP sent to {formData.phone}
                </p>
                {debugOTP && (
                  <p className="text-sm text-accent-600 mt-2 font-mono">
                    Dev OTP: {debugOTP}
                  </p>
                )}
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {MESSAGES.en.ENTER_OTP}
                </label>
                <div className="relative">
                  <FaKey className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="input-field pl-12 text-center text-xl font-mono tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Verifying...' : MESSAGES.en.VERIFY_OTP}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary w-full"
                >
                  Change Number
                </button>
              </div>
            </form>
          )}

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary-600 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
