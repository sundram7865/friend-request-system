import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNotifications } from '../context/NotificationContext';
import { useFriends } from '../context/FriendContext';

export default function useSocketEvents() {
  const socket = useSocket();
  const { addNotification } = useNotifications();
  const { setRequests, setFriends } = useFriends();

  useEffect(() => {
    if (!socket) return;

    const handleNewRequest = (data) => {
      setRequests(prev => [...prev, data.request]);
      addNotification({
        type: 'info',
        message: `${data.sender.username} sent you a friend request!`,
        link: `/requests`
      });
    };

    const handleRequestAccepted = (data) => {
      setFriends(prev => [...prev, data.newFriend]);
      setRequests(prev => prev.filter(req => req._id !== data.requestId));
      addNotification({
        type: 'success',
        message: `${data.acceptor.username} accepted your friend request!`,
        link: `/friends`
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

    return () => {
      socket.off('new-request', handleNewRequest);
      socket.off('request-accepted', handleRequestAccepted);
      socket.off('user-blocked', handleUserBlocked);
    };
  }, [socket, addNotification, setRequests, setFriends]);
}