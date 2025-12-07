/**
 * Disclaimer modal component
 */
import React from 'react';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { MESSAGES } from '../config/constants';

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaExclamationCircle className="text-yellow-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {MESSAGES.en.DISCLAIMER_TITLE}
        </h2>

        {/* Content */}
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            {MESSAGES.en.DISCLAIMER_TEXT}
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">
              For Best Results:
            </h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>✓ Use clear, well-lit images</li>
              <li>✓ Capture affected leaves closely</li>
              <li>✓ Take multiple angles if possible</li>
              <li>✓ Consult experts for confirmation</li>
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-primary w-full mt-6"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
