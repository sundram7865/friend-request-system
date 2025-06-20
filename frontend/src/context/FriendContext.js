import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useSocket } from './SocketContext';
import { useNotifications } from './NotificationContext';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [friendsRes, requestsRes] = await Promise.all([
          api.get('/friends'),
          api.get('/friend-requests'),
        ]);
        setFriends(friendsRes.data);
        setRequests(requestsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('new-request', (data) => {
      setRequests((prev) => [...prev, data.request]);
      addNotification({
        message: `${data.sender.username} sent you a friend request!`,
        type: 'request',
        isRead: false,
      });
    });

    socket.on('request-accepted', (data) => {
      setFriends((prev) => [...prev, data.newFriend]);
      setRequests((prev) => prev.filter((req) => req._id !== data.requestId));
      addNotification({
        message: `${data.acceptor.username} accepted your request!`,
        type: 'accept',
        isRead: false,
      });
    });

    return () => {
      socket.off('new-request');
      socket.off('request-accepted');
    };
  }, [socket, addNotification]);

  const sendRequest = async (receiverId) => {
    try {
      const { data } = await api.post('/friend-requests', { receiverId });
      return data;
    } catch (err) {
      throw err;
    }
  };

  const respondToRequest = async (requestId, action) => {
    try {
      await api.patch(`/friend-requests/${requestId}/${action}`);
      if (action === 'accept') {
        const request = requests.find((req) => req._id === requestId);
        socket.emit('accept-request', {
          requester: request.sender._id,
          acceptor: request.receiver,
          requestId,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        requests,
        loading,
        sendRequest,
        respondToRequest,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => useContext(FriendContext);