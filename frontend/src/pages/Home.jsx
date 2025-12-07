/**
 * Home Page
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaHistory, FaLeaf } from 'react-icons/fa';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();

  const handleScanPlant = () => {
    navigate('/scan');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50">
      <Header />
      
      {/* Hero Section */}
      <div className="container-custom py-12">
        <div className="text-center mb-12 fade-in">
          {/* Plant Illustration */}
          <div className="relative mb-8">
            <div className="text-9xl mb-4 pulse-animation">🌿</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-[20rem] text-primary-600">
                🌾
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-primary-700 mb-4 high-contrast">
            Plant Health Checker
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            AI-powered disease detection
          </p>
          <p className="text-base text-gray-500">
            Take a photo to identify plant diseases
          </p>
        </div>

        {/* Main Action Button */}
        <div className="card max-w-md mx-auto mb-6 fade-in">
          <button
            onClick={handleScanPlant}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 
                     text-white font-bold py-6 px-8 rounded-2xl shadow-xl 
                     hover:shadow-2xl hover:scale-105 active:scale-95
                     transition-all duration-200 flex items-center justify-center 
                     space-x-4 min-h-[80px]"
          >
            <FaCamera className="text-4xl" />
            <div className="text-left">
              <div className="text-2xl">Scan Plant</div>
              <div className="text-sm text-primary-100">
                Camera or Gallery
              </div>
            </div>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="max-w-md mx-auto space-y-4">
          {/* View History */}
          <button
            onClick={handleViewHistory}
            className="w-full card hover:shadow-lg transition-all duration-200 
                     flex items-center justify-between p-6 min-h-[72px]"
          >
            <div className="flex items-center space-x-4">
              <FaHistory className="text-3xl text-primary-600" />
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-800">
                  View History
                </div>
                <div className="text-sm text-gray-500">
                  See past scans
                </div>
              </div>
            </div>
            <div className="text-2xl text-primary-600">›</div>
          </button>

          {/* Info Card */}
          <div className="card bg-primary-50 border-2 border-primary-200">
            <div className="flex items-start space-x-3">
              <FaLeaf className="text-2xl text-primary-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-lg">
                  How it works
                </h3>
                <ol className="text-base text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Take a clear photo of the plant leaf</li>
                  <li>Wait for AI analysis</li>
                  <li>Get disease identification & tips</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Tips for best results
            </h3>
            <ul className="text-base text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">•</span>
                <span>Use good lighting</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">•</span>
                <span>Focus on the affected leaf area</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">•</span>
                <span>Avoid blurry images</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">•</span>
                <span>Fill the frame with the leaf</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
