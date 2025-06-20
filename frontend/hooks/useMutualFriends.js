import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useMutualFriends(userId) {
  const [mutualFriends, setMutualFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMutualFriends = async () => {
      if (!userId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { data } = await api.get(`/users/${userId}/mutual-friends`);
        setMutualFriends(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch mutual friends');
      } finally {
        setLoading(false);
      }
    };

    fetchMutualFriends();
  }, [userId]);

  return { mutualFriends, loading, error };
}