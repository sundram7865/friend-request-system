// Application-wide constants
module.exports = {
  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
  },

  // Friend Request Statuses
  FRIEND_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    BLOCKED: 'blocked'
  },

  // Notification Types
  NOTIFICATION_TYPES: {
    FRIEND_REQUEST: 'friend_request',
    FRIEND_ACCEPTED: 'friend_accepted',
    NEW_MESSAGE: 'new_message'
  },

  // Validation Rules
  VALIDATION: {
    USERNAME: {
      MIN: 3,
      MAX: 30
    },
    PASSWORD: {
      MIN: 8,
      MAX: 128
    },
    EMAIL: {
      MAX: 254
    }
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  },

  // JWT Configuration
  JWT: {
    EXPIRES_IN: '7d',
    COOKIE_EXPIRES: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  },

  // Socket.IO Events
  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    FRIEND_REQUEST: 'friend_request',
    FRIEND_ACCEPTED: 'friend_accepted',
    NOTIFICATION: 'notification'
  }
};