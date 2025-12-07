/**
 * Prediction result display component
 */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaRedo } from 'react-icons/fa';
import Header from './Header';
import DisclaimerModal from './DisclaimerModal';

const PredictionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  const { result, error, imageUrl } = location.state || {};

  if (!result && !error) {
    navigate('/upload');
    return null;
  }

  const topPrediction = result?.top_prediction;
  const predictions = result?.predictions || [];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBgColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Error Display */}
          {error && (
            <div className="card bg-red-50 border-2 border-red-200 mb-6">
              <div className="flex items-start space-x-3">
                <FaExclamationTriangle className="text-3xl text-red-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Analysis Failed
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Display */}
          {!error && topPrediction && (
            <>
              {/* Result Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full">
                  <FaCheckCircle className="text-green-600 text-2xl" />
                  <span className="text-green-800 font-semibold text-lg">
                    Analysis Complete
                  </span>
                </div>
              </div>

              {/* Main Result Card */}
              <div className="card mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div>
                    <img
                      src={imageUrl}
                      alt="Analyzed plant"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>

                  {/* Top Prediction */}
                  <div className="flex flex-col justify-center space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Detected Disease</p>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {topPrediction.class}
                      </h2>
                    </div>

                    {/* Confidence */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          Confidence Level
                        </span>
                        <span className={`text-lg font-bold ${getConfidenceColor(topPrediction.confidence)}`}>
                          {topPrediction.confidence_percent}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`${getConfidenceBgColor(topPrediction.confidence)} h-full rounded-full transition-all duration-500`}
                          style={{ width: topPrediction.confidence_percent }}
                        ></div>
                      </div>
                    </div>

                    {/* Disclaimer Button */}
                    <button
                      onClick={() => setShowDisclaimer(true)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <FaInfoCircle />
                      <span>Important Information</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Predictions */}
              {predictions.length > 1 && (
                <div className="card mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Other Possible Matches
                  </h3>
                  <div className="space-y-3">
                    {predictions.slice(1).map((pred, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700">
                            {pred.rank}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {pred.class}
                          </span>
                        </div>
                        <span className={`font-bold ${getConfidenceColor(pred.confidence)}`}>
                          {pred.confidence_percent}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <FaRedo />
              <span>Scan Another Plant</span>
            </button>
            <button
              onClick={() => navigate('/home')}
              className="btn-secondary"
            >
              Back to Home
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

export default PredictionResult;
