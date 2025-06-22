const User = require('../models/User');
const { AppError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -__v')
      .populate('friends', 'name email');

    if (!user) {
      throw new NotFoundError('User');
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 3) {
      throw new AppError('Search query must be at least 3 characters', 400);
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: req.user.id } // Exclude current user
    }).select('name email');

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};