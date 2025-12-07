/**
 * Home page with scan plant button
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaLeaf } from 'react-icons/fa';
import Header from './Header';
import { MESSAGES } from '../config/constants';

const Home = () => {
  const navigate = useNavigate();

  const handleScanPlant = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {MESSAGES.en.WELCOME} 👋
            </h2>
            <p className="text-xl text-gray-600">
              Protect your crops with AI-powered disease detection
            </p>
          </div>

          {/* Main Card */}
          <div className="card text-center space-y-8 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                <FaLeaf className="text-white text-8xl" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800">
                Scan Your Plant
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Take a photo or upload an image of your plant leaf to detect diseases instantly using AI technology
              </p>
            </div>

            {/* Scan Button */}
            <button
              onClick={handleScanPlant}
              className="btn-primary inline-flex items-center space-x-3 text-xl px-8 py-4"
            >
              <FaCamera className="text-2xl" />
              <span>{MESSAGES.en.SCAN_PLANT}</span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '⚡', title: 'Fast', desc: 'Get results in seconds' },
              { icon: '🎯', title: 'Accurate', desc: 'AI-powered analysis' },
              { icon: '📱', title: 'Easy', desc: 'Simple and user-friendly' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card text-center hover:shadow-xl transition-all"
                style={{animationDelay: `${0.2 + idx * 0.1}s`}}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
