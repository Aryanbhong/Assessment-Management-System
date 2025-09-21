// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  verifyToken: () => api.post('/auth/verify'),
};

// Reports API
export const reportsAPI = {
  getSessions: () => api.get('/reports/sessions'),
  generateReport: (sessionId) => api.post('/reports/generate', { session_id: sessionId }),
  generateReportByGet: (sessionId) => api.get(`/reports/generate/${sessionId}`),
  listReports: () => api.get('/reports/list'),
  downloadReport: (filename) => api.get(`/reports/download/${filename}`, { responseType: 'blob' }),
  deleteReport: (filename) => api.delete(`/reports/${filename}`),
  getConfig: (assessmentId) => api.get(`/reports/config/${assessmentId}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

// Utility functions
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
    return {
      message,
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null
    };
  }
};
export default api