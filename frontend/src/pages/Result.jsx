/**
 * Result Page - Display prediction results
 */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCamera, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Header from '../components/Header';
import DisclaimerModal from '../components/DisclaimerModal';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const { prediction, imagePreview } = location.state || {};

  // Redirect if no prediction data
  if (!prediction) {
    navigate('/');
    return null;
  }

  const { disease_name, confidence, top_predictions } = prediction;
  const isHealthy = disease_name.toLowerCase().includes('healthy');
  const isHighConfidence = confidence > 80;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header />
      
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto space-y-6 fade-in">
          {/* Result Card */}
          <div className="card">
            {/* Image */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Analyzed plant"
                className="w-full h-64 object-cover rounded-xl shadow-md mb-6"
              />
            )}

            {/* Status Icon */}
            <div className="text-center mb-6">
              {isHealthy ? (
                <FaCheckCircle className="text-7xl text-green-500 mx-auto mb-4" />
              ) : (
                <FaExclamationTriangle className="text-7xl text-orange-500 mx-auto mb-4" />
              )}
            </div>

            {/* Disease Name */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {disease_name}
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg text-gray-600">Confidence:</span>
                <span className={`text-2xl font-bold ${
                  isHighConfidence ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {confidence.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    isHighConfidence ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Disclaimer Button */}
            <button
              onClick={() => setShowDisclaimer(true)}
              className="w-full bg-blue-50 border-2 border-blue-300 text-blue-700 
                       font-medium py-3 px-4 rounded-xl hover:bg-blue-100 
                       transition-all flex items-center justify-center space-x-2"
            >
              <FaInfoCircle className="text-xl" />
              <span>Important Information</span>
            </button>
          </div>

          {/* Top Predictions */}
          {top_predictions && top_predictions.length > 1 && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Other Possibilities
              </h3>
              <div className="space-y-3">
                {top_predictions.slice(1, 4).map((pred, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      {pred.disease_name}
                    </span>
                    <span className="text-gray-600 font-semibold">
                      {pred.confidence.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className={`card ${isHealthy ? 'bg-green-50 border-2 border-green-300' : 'bg-orange-50 border-2 border-orange-300'}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {isHealthy ? '✅ Your plant looks healthy!' : '⚠️ Recommended Actions'}
            </h3>
            {isHealthy ? (
              <p className="text-gray-700 text-base">
                Your plant appears to be in good health. Continue with regular care 
                and monitoring. Keep taking good care of your crops!
              </p>
            ) : (
              <ul className="space-y-2 text-gray-700 text-base">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Consult with local agriculture experts for treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Isolate affected plants to prevent spread</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Take multiple photos for better diagnosis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-2">•</span>
                  <span>Visit your nearest agricultural extension office</span>
                </li>
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/scan')}
              className="btn-primary w-full flex items-center justify-center space-x-3"
            >
              <FaCamera className="text-xl" />
              <span>Scan Another Plant</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full flex items-center justify-center space-x-3"
            >
              <FaHome className="text-xl" />
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
};

export default Result;
