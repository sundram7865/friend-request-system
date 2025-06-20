import { useCallback } from 'react';
import api from '../services/api';
import { useFriends } from '../context/FriendContext';

export default function useFriendActions() {
  const { setFriends, setRequests, setError, clearError } = useFriends();

  const sendRequest = useCallback(async (receiverId) => {
    try {
      const { data } = await api.post('/friend-requests', { receiverId });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send request';
      setError(message);
      clearError();
      return { success: false, error: message };
    }
  }, [setError, clearError]);

  const respondToRequest = useCallback(async (requestId, action) => {
    try {
      await api.patch(`/friend-requests/${requestId}/${action}`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || `Failed to ${action} request`;
      setError(message);
      clearError();
      return { success: false, error: message };
    }
  }, [setError, clearError]);

  const blockUser = useCallback(async (userId) => {
    try {
      await api.post(`/users/${userId}/block`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to block user';
      setError(message);
      clearError();
      return { success: false, error: message };
    }
  }, [setError, clearError]);

  return {
    sendRequest,
    respondToRequest,
    blockUser
  };
}