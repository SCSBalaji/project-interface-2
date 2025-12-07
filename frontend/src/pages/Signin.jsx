/**
 * Signin Page
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import { authService } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import OTPInput from '../components/OTPInput';
import Header from '../components/Header';

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [formData, setFormData] = useState({
    phone: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOTP, setDebugOTP] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.requestSigninOTP(formData.phone);
      setStep(2);
      
      // In debug mode, show OTP
      if (response.otp) {
        setDebugOTP(response.otp);
      }
      
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Phone number not registered. Please sign up first.');
      } else {
        setError(err.response?.data?.detail || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (formData.otp.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifySignin(formData.phone, formData.otp);
      login(response);
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header />
      
      <div className="container-custom py-8">
        <div className="card max-w-md mx-auto fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-3xl font-bold text-primary-700 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-base">
              Sign in to continue
            </p>
          </div>

          {/* Step 1: Phone Number */}
          {step === 1 && (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              {/* Phone Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-lg">
                  <FaPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit number"
                  className="input-field"
                  maxLength={15}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-600 text-base">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-4 text-lg text-center">
                  Enter OTP sent to {formData.phone}
                </label>
                <OTPInput
                  length={6}
                  value={formData.otp}
                  onChange={(value) => setFormData({ ...formData, otp: value })}
                />
                
                {/* Debug OTP Display */}
                {debugOTP && (
                  <div className="mt-4 text-center text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                    <strong>Debug Mode:</strong> Your OTP is <strong>{debugOTP}</strong>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || formData.otp.length !== 6}
                className="btn-primary w-full"
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              {/* Change Phone */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-primary-600 font-medium hover:underline text-base"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
