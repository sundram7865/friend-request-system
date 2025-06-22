const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../utils/constants');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: Object.values(NOTIFICATION_TYPES),
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

// Add virtual populate
notificationSchema.virtual('senderInfo', {
  ref: 'User',
  localField: 'sender',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email' }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;