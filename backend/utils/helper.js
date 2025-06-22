const jwt = require('jsonwebtoken');
const { AppError } = require('./errors');
const { HTTP_STATUS } = require('./constants');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AppError('Invalid or expired token', HTTP_STATUS.UNAUTHORIZED);
  }
};

exports.filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) filteredObj[el] = obj[el];
  });
  return filteredObj;
};

exports.catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};