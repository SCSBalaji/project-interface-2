/**
 * Image Upload Page (Camera/Gallery Selection)
 */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaImage, FaTimes } from 'react-icons/fa';
import { predictionService } from '../services/prediction';
import Header from '../components/Header';

const ImageUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    setSelectedImage(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setError('');

    try {
      const result = await predictionService.predictDisease(selectedImage);
      
      // Navigate to result page with data
      navigate('/result', { 
        state: { 
          prediction: result.prediction,
          imagePreview 
        } 
      });
      
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header />
      
      <div className="container-custom py-8">
        <div className="card max-w-md mx-auto fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary-700 mb-2">
              {selectedImage ? 'Review Image' : 'Upload Plant Image'}
            </h2>
            <p className="text-gray-600 text-base">
              {selectedImage ? 'Looks good? Proceed to analyze' : 'Choose from camera or gallery'}
            </p>
          </div>

          {/* Image Preview or Upload Options */}
          {!selectedImage ? (
            <div className="space-y-4">
              {/* Camera Option */}
              <button
                onClick={handleCameraClick}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white 
                         font-semibold py-6 px-6 rounded-2xl shadow-lg 
                         transition-all duration-200 flex items-center justify-center 
                         space-x-4 min-h-[80px]"
              >
                <FaCamera className="text-4xl" />
                <div className="text-left">
                  <div className="text-xl">Take Photo</div>
                  <div className="text-sm text-primary-100">Use camera</div>
                </div>
              </button>

              {/* Gallery Option */}
              <button
                onClick={handleGalleryClick}
                className="w-full bg-white hover:bg-gray-50 text-primary-700 
                         font-semibold py-6 px-6 rounded-2xl border-2 border-primary-600
                         shadow-lg transition-all duration-200 flex items-center 
                         justify-center space-x-4 min-h-[80px]"
              >
                <FaImage className="text-4xl" />
                <div className="text-left">
                  <div className="text-xl">Choose from Gallery</div>
                  <div className="text-sm text-primary-600">Select existing photo</div>
                </div>
              </button>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />

              {/* Back Button */}
              <button
                onClick={() => navigate('/')}
                className="w-full btn-outline"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected plant"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <button
                  onClick={handleClearImage}
                  className="absolute top-4 right-4 bg-red-600 text-white p-3 
                           rounded-full shadow-lg hover:bg-red-700 transition-all"
                  aria-label="Remove image"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="btn-primary w-full"
              >
                {analyzing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="spinner"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Plant'
                )}
              </button>

              {/* Retake Button */}
              <button
                onClick={handleClearImage}
                disabled={analyzing}
                className="btn-secondary w-full"
              >
                Choose Different Image
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analyzing Overlay */}
      {analyzing && (
        <div className="loading-overlay">
          <div className="card text-center">
            <div className="spinner mb-4"></div>
            <h3 className="text-2xl font-bold text-primary-700 mb-2">
              Analyzing Your Plant
            </h3>
            <p className="text-gray-600">
              Our AI is examining the image...
            </p>
            <div className="mt-4 text-6xl pulse-animation">🔬</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
