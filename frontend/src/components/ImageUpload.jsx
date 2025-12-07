/**
 * Image upload component with camera/gallery options
 */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaImage, FaUpload, FaTimes } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Header from './Header';
import { APP_CONFIG } from '../config/constants';

const ImageUpload = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleImageSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: APP_CONFIG.MAX_FILE_SIZE,
    multiple: false,
  });

  const handleImageSelect = (file) => {
    if (file && file.size <= APP_CONFIG.MAX_FILE_SIZE) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('File size too large. Maximum 10MB allowed.');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      navigate('/analyzing', { state: { image: selectedImage } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Upload Plant Image
            </h2>
            <p className="text-gray-600">
              Take a photo or select from gallery
            </p>
          </div>

          {/* Image Preview or Upload Area */}
          {!selectedImage ? (
            <div className="space-y-6">
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`card text-center cursor-pointer border-4 border-dashed transition-all ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <FaUpload className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  {isDragActive ? 'Drop image here' : 'Drag & drop image here'}
                </p>
                <p className="text-gray-500">or</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Camera Button */}
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="btn-primary inline-flex items-center justify-center space-x-3"
                >
                  <FaCamera className="text-2xl" />
                  <span>Take Photo</span>
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />

                {/* Gallery Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary inline-flex items-center justify-center space-x-3"
                >
                  <FaImage className="text-2xl" />
                  <span>Choose from Gallery</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="card">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full rounded-lg max-h-96 object-contain"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAnalyze}
                  className="btn-primary"
                >
                  Analyze Disease
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="btn-secondary"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 card bg-yellow-50 border-2 border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>✓ Take clear, well-lit photos of the leaf</li>
              <li>✓ Ensure the leaf fills most of the frame</li>
              <li>✓ Avoid blurry or dark images</li>
              <li>✓ Capture the affected area clearly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
