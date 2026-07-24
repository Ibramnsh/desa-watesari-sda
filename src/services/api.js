import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-watesari.vercel.app/api',
});

// Request interceptor to add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Helper function to resolve image source dynamically (Cloudinary vs local uploads)
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Replace the '/api' from baseURL to get the root URL for local fallback
  const rootURL = api.defaults.baseURL.replace(/\/api\/?$/, '');
  return `${rootURL}${imagePath}`;
};

export default api;
