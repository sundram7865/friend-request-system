const mongoose = require('mongoose');
const { FRIEND_STATUS } = require('../utils/constants');

const friendSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(FRIEND_STATUS),
    default: FRIEND_STATUS.PENDING
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Prevent duplicate friend requests
friendSchema.index({ requester: 1, recipient: 1 }, { unique: true });

// Add virtual populate
friendSchema.virtual('requesterInfo', {
  ref: 'User',
  localField: 'requester',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email' }
});

friendSchema.virtual('recipientInfo', {
  ref: 'User',
  localField: 'recipient',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email' }
});

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;