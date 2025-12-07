/**
 * Header component with language selector
 */
import React, { useState } from 'react';
import { FaGlobeAmericas, FaSignOutAlt } from 'react-icons/fa';
import { LANGUAGES, MESSAGES } from '../config/constants';
import { authUtils } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const navigate = useNavigate();
  const isAuthenticated = authUtils.isAuthenticated();
  const userData = authUtils.getUserData();

  const handleLogout = () => {
    authUtils.logout();
    navigate('/signin');
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setShowLanguages(false);
    // Store language preference
    localStorage.setItem('plant_disease_language', langCode);
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              {MESSAGES[currentLang]?.APP_NAME || 'Plant Disease Detection'}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            {isAuthenticated && userData && (
              <div className="hidden md:block">
                <span className="text-sm opacity-90">{userData.name}</span>
              </div>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-2 bg-primary-700 hover:bg-primary-800 px-3 py-2 rounded-lg transition-colors"
              >
                <FaGlobeAmericas className="text-lg" />
                <span className="hidden sm:inline text-sm">
                  {LANGUAGES.find(l => l.code === currentLang)?.nativeName}
                </span>
              </button>

              {/* Language Dropdown */}
              {showLanguages && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl z-50 min-w-[160px]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-3 text-gray-800 hover:bg-primary-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        currentLang === lang.code ? 'bg-primary-100 font-semibold' : ''
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg transition-colors"
                title="Logout"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="hidden sm:inline text-sm">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
