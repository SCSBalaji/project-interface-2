/**
 * Disclaimer Modal Component
 */
import { FaTimes, FaInfoCircle } from 'react-icons/fa';

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-lg w-full fade-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FaInfoCircle className="text-3xl text-primary-600" />
            <h3 className="text-2xl font-bold text-gray-800">Important Notice</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
            aria-label="Close"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-base text-gray-700">
          <p className="leading-relaxed">
            This app provides <strong>AI-based plant disease predictions</strong> to 
            help you identify potential issues with your crops.
          </p>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">⚠️ Please Note:</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li>AI predictions may not always be 100% accurate</li>
              <li>Image quality affects prediction accuracy</li>
              <li>Similar-looking diseases can be confused</li>
              <li>Some rare diseases may not be in our database</li>
            </ul>
          </div>

          <div className="bg-primary-50 border-2 border-primary-300 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">✅ Recommendations:</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li>Use this as a preliminary diagnosis tool</li>
              <li>Take multiple photos from different angles</li>
              <li>For serious issues, consult local agriculture experts</li>
              <li>Visit nearby agricultural extension offices</li>
              <li>Contact experienced farmers in your area</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 italic">
            This tool is designed to assist farmers, not replace professional 
            agricultural advice.
          </p>
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
