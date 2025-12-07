/**
 * History Page - View past predictions
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLeaf } from 'react-icons/fa';
import { predictionService } from '../services/prediction';
import Header from '../components/Header';

const History = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await predictionService.getPredictionHistory(page, 10);
      setPredictions(response.predictions);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 
                     font-semibold text-lg"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <h2 className="text-2xl font-bold text-primary-700">
            Scan History
          </h2>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading history...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card bg-red-50 border-2 border-red-300 text-center">
            <p className="text-red-700 text-lg">{error}</p>
            <button
              onClick={fetchHistory}
              className="btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && predictions.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Scans Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start scanning plants to build your history
            </p>
            <button
              onClick={() => navigate('/scan')}
              className="btn-primary"
            >
              Scan First Plant
            </button>
          </div>
        )}

        {/* History List */}
        {!loading && !error && predictions.length > 0 && (
          <div className="space-y-4">
            {predictions.map((pred) => {
              const isHealthy = pred.disease_name.toLowerCase().includes('healthy');
              const isHighConfidence = pred.confidence > 80;

              return (
                <div key={pred.id} className="card hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    {/* Disease Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaLeaf className={`text-2xl ${isHealthy ? 'text-green-500' : 'text-orange-500'}`} />
                        <h3 className="text-xl font-bold text-gray-800">
                          {pred.disease_name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          <strong>Confidence:</strong>{' '}
                          <span className={`font-semibold ${
                            isHighConfidence ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {pred.confidence.toFixed(1)}%
                          </span>
                        </span>
                        <span>•</span>
                        <span>{formatDate(pred.created_at)}</span>
                      </div>
                    </div>

                    {/* Confidence Badge */}
                    <div className={`px-4 py-2 rounded-xl font-semibold ${
                      isHighConfidence 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {pred.confidence.toFixed(0)}%
                    </div>
                  </div>

                  {/* Top Predictions */}
                  {pred.top_predictions && pred.top_predictions.length > 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Other possibilities:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pred.top_predictions.slice(1, 3).map((p, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg"
                          >
                            {p.disease_name} ({p.confidence.toFixed(0)}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 pt-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-outline disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-outline disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
