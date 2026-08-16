const ApiError = require('../utils/ApiError');

/**
 * Role-based authorization middleware
 * Checks if the authenticated user has one of the allowed roles
 * 
 * @param  {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Express middleware
 * 
 * Usage: authorize('admin', 'mentor')
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 
        `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}`
      ));
    }

    next();
  };
};

/**
 * Check if user account is active
 */
const requireActiveAccount = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required.'));
  }

  if (req.user.status !== 'active') {
    return next(new ApiError(403, 
      `Account is ${req.user.status}. Please contact administrator.`
    ));
  }

  next();
};

module.exports = { authorize, requireActiveAccount };
