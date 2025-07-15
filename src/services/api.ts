import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Keep track of logout state to prevent redirect loops
let isLoggingOut = false;

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to unauthorized access
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      
      // Only redirect if not already on login page and not trying to login
      const isLoginPage = window.location.pathname === '/admin/login';
      const isLoginRequest = error.config.url.includes('/auth/login');
      
      if (!isLoginPage && !isLoginRequest) {
        // Store the current location
        const currentPath = window.location.pathname;
        if (currentPath !== '/admin/login') {
          sessionStorage.setItem('redirectAfterLogin', currentPath);
        }
        
        // Redirect to login
        window.location.href = '/admin/login';
      }
      
      isLoggingOut = false;
    }
    return Promise.reject(error);
  }
);

export default api; 