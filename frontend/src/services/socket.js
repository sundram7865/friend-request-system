import { io } from 'socket.io-client';

let socket;

export const initSocket = (token) => {
  socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
    auth: { token },
  });
  return socket;
};

export const getSocket = () => socket;