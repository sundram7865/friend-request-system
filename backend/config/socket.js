const socketIO = require('socket.io');
const { authenticateSocket } = require('../middleware/auth');
const socketHandlers = require('../services/socket');
const logger = require('../utils/logger');

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket']
  });

  io.use(authenticateSocket).on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.id}`);
    
    // Join user's personal room
    socket.join(`user_${socket.user.id}`);
    
    // Initialize socket handlers
    socketHandlers(io, socket);

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.id}`);
    });

    socket.on('error', (err) => {
      logger.error(`Socket error for user ${socket.user.id}:`, err);
    });
  });

  return io;
};

module.exports = setupSocket;