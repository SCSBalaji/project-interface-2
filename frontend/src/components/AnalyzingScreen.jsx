/**
 * Analyzing screen with loading animation
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Header from './Header';
import { predictionAPI } from '../services/api';

const AnalyzingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Uploading image...');
  const imageFile = location.state?.image;

  useEffect(() => {
    if (!imageFile) {
      navigate('/upload');
      return;
    }

    analyzePlant();
  }, [imageFile]);

  const analyzePlant = async () => {
    try {
      // Simulate progress
      const progressSteps = [
        { progress: 20, status: 'Uploading image...', delay: 500 },
        { progress: 40, status: 'Processing image...', delay: 800 },
        { progress: 60, status: 'Running AI analysis...', delay: 1000 },
        { progress: 80, status: 'Identifying disease...', delay: 1000 },
        { progress: 95, status: 'Finalizing results...', delay: 500 },
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        setProgress(step.progress);
        setStatus(step.status);
      }

      // Make API call
      const result = await predictionAPI.predict(imageFile);

      // Navigate to results
      setProgress(100);
      setStatus('Complete!');
      
      setTimeout(() => {
        navigate('/result', { 
          state: { 
            result,
            imageUrl: URL.createObjectURL(imageFile)
          } 
        });
      }, 500);

    } catch (error) {
      console.error('Analysis error:', error);
      
      // Navigate to result with error
      navigate('/result', {
        state: {
          error: error.response?.data?.detail || 'Failed to analyze image. Please try again.',
          imageUrl: URL.createObjectURL(imageFile)
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Analyzing Card */}
          <div className="card text-center space-y-8">
            {/* Spinner */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 border-8 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
              </div>
            </div>

            {/* Status Text */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">
                Analyzing Your Plant
              </h2>
              <p className="text-xl text-primary-600 font-semibold">
                {status}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Progress Percentage */}
            <p className="text-gray-600 font-mono text-lg">
              {progress}%
            </p>

            {/* Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                ⏱️ This usually takes 5-10 seconds
              </p>
            </div>
          </div>

          {/* Animation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
