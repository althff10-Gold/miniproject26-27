const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/auth');
const { db } = require('../config/database');
const ApiError = require('../utils/ApiError');

/**
 * Authentication middleware - verifies JWT token
 * Attaches user object to req.user
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, jwtConfig.secret);

    // Fetch user from database to ensure they still exist and are active
    const user = await db('users')
      .where({ id: decoded.id })
      .whereNot({ status: 'deactivated' })
      .first();

    if (!user) {
      throw new ApiError(401, 'User not found or account deactivated.');
    }

    // Attach user to request (exclude password)
    const { password_hash, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, 'Invalid token.'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, 'Token expired.'));
    }
    next(error);
  }
};

/**
 * Optional authentication - doesn't fail if no token provided
 */
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  return authenticate(req, res, next);
};

module.exports = authenticate;
module.exports.authenticate = authenticate;
module.exports.optionalAuth = optionalAuth;
