import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token && !socket) {
      const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
        auth: { token },
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
        setSocket(newSocket);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};