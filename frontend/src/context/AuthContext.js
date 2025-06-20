import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearError = () => setTimeout(() => setError(null), 5000);

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    setError(null);
    navigate('/dashboard');
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/register', userData);
      handleAuthSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      clearError();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      handleAuthSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      clearError();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const { data } = await api.get('/auth/verify');
          setUser(data.user);
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};