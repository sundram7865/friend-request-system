const Friend = require('../models/Friend');
const Notification = require('../models/Notification');
const { AppError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const { recipientId } = req.body;
    const requesterId = req.user.id;

    if (requesterId === recipientId) {
      throw new AppError('You cannot send a friend request to yourself', 400);
    }

    // Check for existing request
    const existingRequest = await Friend.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId }
      ]
    });

    if (existingRequest) {
      throw new AppError('Friend request already exists', 409);
    }

    const friendRequest = await Friend.create({
      requester: requesterId,
      recipient: recipientId,
      status: 'pending'
    });

    // Create notification
    await Notification.create({
      user: recipientId,
      type: 'friend_request',
      sender: requesterId,
      relatedId: friendRequest._id
    });

    res.status(201).json({
      status: 'success',
      data: friendRequest
    });
  } catch (err) {
    next(err);
  }
};

exports.respondToRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body;
    const userId = req.user.id;

    const friendRequest = await Friend.findOne({
      _id: requestId,
      recipient: userId,
      status: 'pending'
    });

    if (!friendRequest) {
      throw new NotFoundError('Friend request');
    }

    if (!['accepted', 'rejected'].includes(action)) {
      throw new AppError('Invalid action', 400);
    }

    friendRequest.status = action;
    await friendRequest.save();

    if (action === 'accepted') {
      await Notification.create({
        user: friendRequest.requester,
        type: 'friend_accepted',
        sender: userId,
        relatedId: friendRequest._id
      });
    }

    res.status(200).json({
      status: 'success',
      data: friendRequest
    });
  } catch (err) {
    next(err);
  }
};