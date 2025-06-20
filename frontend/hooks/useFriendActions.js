import { useCallback } from 'react';
import { useFriends } from '../context/FriendContext';
import api from '../services/api';

export default function useFriendActions() {
  const { sendRequest, respondToRequest } = useFriends();

  const blockUser = useCallback(async (userId) => {
    try {
      await api.post(`/users/${userId}/block`);
      return true;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to block user';
    }
  }, []);

  const unblockUser = useCallback(async (userId) => {
    try {
      await api.post(`/users/${userId}/unblock`);
      return true;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to unblock user';
    }
  }, []);

  const cancelRequest = useCallback(async (requestId) => {
    try {
      await api.delete(`/friend-requests/${requestId}`);
      return true;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to cancel request';
    }
  }, []);

  return {
    sendRequest,
    respondToRequest,
    blockUser,
    unblockUser,
    cancelRequest
  };
}