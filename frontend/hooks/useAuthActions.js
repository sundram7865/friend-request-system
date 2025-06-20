import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export default function useAuthActions() {
  const { login, register } = useAuth();

  const loginWithCredentials = useCallback(async (email, password) => {
    try {
      await login({ email, password });
      return true;
    } catch (err) {
      throw err.message || 'Login failed';
    }
  }, [login]);

  const registerWithDetails = useCallback(async (userData) => {
    try {
      await register(userData);
      return true;
    } catch (err) {
      throw err.message || 'Registration failed';
    }
  }, [register]);

  return {
    loginWithCredentials,
    registerWithDetails
  };
}