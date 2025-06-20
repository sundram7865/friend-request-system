import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);
      handleAuthSuccess(data);
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      handleAuthSuccess(data);
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const { data } = await api.get('/auth/verify');
          setUser(data.user);
        } catch {
          logout();
        }
      }
    };
    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);