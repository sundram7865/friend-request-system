import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export default function useAuthActions() {
  const { register: contextRegister, login: contextLogin, logout: contextLogout } = useAuth();

  const register = useCallback(async (userData) => {
    try {
      await contextRegister(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [contextRegister]);

  const login = useCallback(async (credentials) => {
    try {
      await contextLogin(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [contextLogin]);

  const logout = useCallback(() => {
    try {
      contextLogout();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [contextLogout]);

  return {
    register,
    login,
    logout
  };
}