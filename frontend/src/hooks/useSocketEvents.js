// src/hooks/useSocketEvents.js
import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useSocket } from '../context/SocketContext';

export default function useSocketEvents() {
  const socket = useSocket();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!socket) return;

    const handleFriendRequest = (data) => {
      addNotification({
        type: 'friendRequest',
        message: `${data.from.name} sent you a friend request`,
        data,
      });
    };

    const handleFriendRequestAccepted = (data) => {
      addNotification({
        type: 'friendRequestAccepted',
        message: `${data.from.name} accepted your friend request`,
        data,
      });
    };

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('friendRequest', handleFriendRequest);
    socket.on('friendRequestAccepted', handleFriendRequestAccepted);

    return () => {
      socket.off('friendRequest', handleFriendRequest);
      socket.off('friendRequestAccepted', handleFriendRequestAccepted);
    };
  }, [socket, addNotification]);
}