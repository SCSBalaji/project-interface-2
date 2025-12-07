/**
 * Header Component with Language Selector
 */
import { useState } from 'react';
import { FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguages(false);
    // TODO: Implement actual language change
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🌱</div>
            <div>
              <h1 className="text-xl font-bold high-contrast">Plant Health</h1>
              {isAuthenticated && user && (
                <p className="text-sm text-primary-100">Hello, {user.name}!</p>
              )}
            </div>
          </div>

          {/* Language Selector & Logout */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-2 bg-primary-700 hover:bg-primary-800 
                         px-4 py-2 rounded-xl transition-all min-h-[48px]"
                aria-label="Select language"
              >
                <FaGlobe className="text-xl" />
                <span className="hidden sm:inline text-sm font-medium">
                  {languages.find(l => l.code === selectedLanguage)?.native}
                </span>
              </button>

              {/* Language Dropdown */}
              {showLanguages && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl 
                              shadow-xl z-50 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-3 hover:bg-primary-50 
                                transition-all first:rounded-t-xl last:rounded-b-xl
                                ${selectedLanguage === lang.code ? 'bg-primary-100 font-semibold' : ''}`}
                    >
                      <div className="font-medium">{lang.native}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 
                         px-4 py-2 rounded-xl transition-all min-h-[48px]"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
