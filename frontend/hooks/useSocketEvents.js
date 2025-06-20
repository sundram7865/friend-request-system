import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useFriends } from '../context/FriendContext';
import { useNotifications } from '../context/NotificationContext';

export default function useSocketEvents() {
  const socket = useSocket();
  const { addNotification } = useNotifications();
  const { setFriends, setRequests } = useFriends();

  useEffect(() => {
    if (!socket) return;

    const handleNewRequest = (data) => {
      setRequests(prev => [...prev, data.request]);
      addNotification({
        type: 'info',
        message: `${data.sender.username} sent you a friend request!`,
        link: '/requests'
      });
    };

    const handleRequestAccepted = (data) => {
      setFriends(prev => [...prev, data.user]);
      setRequests(prev => prev.filter(req => req._id !== data.requestId));
      addNotification({
        type: 'success',
        message: `${data.user.username} accepted your request!`,
        link: '/friends'
      });
    };

    const handleUserBlocked = (data) => {
      addNotification({
        type: 'warning',
        message: `You've been blocked by ${data.blocker.username}`,
        isImportant: true
      });
    };

    socket.on('new-request', handleNewRequest);
    socket.on('request-accepted', handleRequestAccepted);
    socket.on('user-blocked', handleUserBlocked);
    socket.on('error', (error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Connection error',
        isImportant: true
      });
    });

    return () => {
      socket.off('new-request', handleNewRequest);
      socket.off('request-accepted', handleRequestAccepted);
      socket.off('user-blocked', handleUserBlocked);
      socket.off('error');
    };
  }, [socket, addNotification, setFriends, setRequests]);
}wh