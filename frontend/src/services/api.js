import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 globally (Session Expiration)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If we get a 401 Unauthorized, automatically log out or attempt refresh
    if (error.response && error.response.status === 401) {
      // Basic implementation: Clear token and redirect to login
      // For a robust system, you would call a /refresh endpoint here and retry the original request
      console.warn('Session expired or unauthorized. Redirecting to login.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
