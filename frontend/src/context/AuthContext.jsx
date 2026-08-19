import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      // Default fallback mock student user if browsing without login
      const defaultUser = {
        fullName: 'Dhanshree Saini',
        email: 'dhanshreesaini7877@gmail.com',
        role: 'STUDENT',
        token: 'mock_token'
      };
      setUser(defaultUser);
    }
    setLoading(false);
  }, []);

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const newUser = { ...(prev || {}), ...updatedFields };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      const token = data.accessToken || data.token;
      
      const userData = {
        email: data.email,
        role: data.role,
        fullName: data.fullName,
        token: token,
        accessToken: token,
        refreshToken: data.refreshToken
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      const errorMsg = typeof error.response?.data === 'string'
        ? error.response.data
        : (error.response?.data?.message || error.response?.data?.error || 'Login failed. Please check your credentials.');
      throw errorMsg;
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
    } catch (error) {
      const errorMsg = typeof error.response?.data === 'string'
        ? error.response.data
        : (error.response?.data?.message || error.response?.data?.error || 'Registration failed.');
      throw errorMsg;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, register, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
