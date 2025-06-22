const jwt = require('jsonwebtoken');
const { AppError } = require('./errors');
const constants = require('./constants');

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @param {string} [expiresIn] - Token expiration time
 * @returns {string} JWT token
 */
const generateToken = (userId, expiresIn = constants.JWT.EXPIRES_IN) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 * @throws {AppError} If token is invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AppError('Invalid or expired token', constants.HTTP_STATUS.UNAUTHORIZED);
  }
};

/**
 * Paginate MongoDB query results
 * @param {Model} model - Mongoose model
 * @param {object} query - Query object
 * @param {object} options - Pagination options { page, limit }
 * @returns {Promise<object>} Paginated results
 */
const paginate = async (model, query = {}, options = {}) => {
  const page = parseInt(options.page, 10) || 1;
  const limit = parseInt(options.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query)
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    results,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

/**
 * Filter object properties
 * @param {object} obj - Original object
 * @param {string[]} allowedFields - Fields to keep
 * @returns {object} Filtered object
 */
const filterObject = (obj, allowedFields) => {
  const filtered = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) {
      filtered[key] = obj[key];
    }
  });
  return filtered;
};

/**
 * Async handler wrapper for Express routes
 * @param {Function} fn - Async route handler
 * @returns {Function} Wrapped handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Generate random alphanumeric string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  generateToken,
  verifyToken,
  paginate,
  filterObject,
  asyncHandler,
  generateRandomString,
  validateEmail,
  delay
};