import { useState, useEffect } from 'react';
import api from '../services/api';
import { useFriends } from '../context/FriendContext';

export default function useMutualFriends(targetUserId) {
  const { friends: currentUserFriends } = useFriends();
  const [mutualFriends, setMutualFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMutualFriends = useCallback(async () => {
    if (!targetUserId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First get the target user's friends
      const { data: targetUserFriends } = await api.get(`/users/${targetUserId}/friends`);
      
      // Calculate mutual friends locally
      const mutuals = currentUserFriends.filter(user => 
        targetUserFriends.some(friend => friend._id === user._id)
      );
      
      setMutualFriends(mutuals);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch mutual friends');
      console.error('Mutual friends error:', err);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, currentUserFriends]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch when targetUserId changes
  useEffect(() => {
    fetchMutualFriends();
  }, [fetchMutualFriends]);

  return {
    mutualFriends,
    loading,
    error,
    refresh: fetchMutualFriends
  };
}