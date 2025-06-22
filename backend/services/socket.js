const Notification = require('../models/Notification');
const { SOCKET_EVENTS } = require('../utils/constants');
const logger = require('../utils/logger');

module.exports = (io, socket) => {
  // Friend request notification
  socket.on(SOCKET_EVENTS.FRIEND_REQUEST, async (data) => {
    try {
      const notification = await Notification.findById(data.notificationId)
        .populate('senderInfo');
      
      if (notification) {
        io.to(`user_${notification.user}`).emit(
          SOCKET_EVENTS.NOTIFICATION, 
          notification
        );
      }
    } catch (err) {
      logger.error('Socket friend request error:', err);
    }
  });

  // Friend request accepted notification
  socket.on(SOCKET_EVENTS.FRIEND_ACCEPTED, async (data) => {
    try {
      const notification = await Notification.findById(data.notificationId)
        .populate('senderInfo');
      
      if (notification) {
        io.to(`user_${notification.user}`).emit(
          SOCKET_EVENTS.NOTIFICATION, 
          notification
        );
      }
    } catch (err) {
      logger.error('Socket friend accepted error:', err);
    }
  });
};