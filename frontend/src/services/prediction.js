/**
 * Prediction API calls
 */
import api from './api';

export const predictionService = {
  // Predict disease from image
  predictDisease: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/api/prediction/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get prediction history
  getPredictionHistory: async (page = 1, pageSize = 10) => {
    const response = await api.get('/api/prediction/history', {
      params: { page, page_size: pageSize },
    });
    return response.data;
  },

  // Check prediction service health
  checkHealth: async () => {
    const response = await api.get('/api/prediction/health');
    return response.data;
  }
};
