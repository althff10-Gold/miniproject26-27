/**
 * Custom API Error class
 * Provides structured error handling across the application
 */
class ApiError extends Error {
  constructor(statusCode, message, code = null, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || this.getDefaultCode(statusCode);
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  getDefaultCode(statusCode) {
    const codes = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMIT',
      500: 'INTERNAL_ERROR'
    };
    return codes[statusCode] || 'ERROR';
  }

  static badRequest(message, details) {
    return new ApiError(400, message, 'BAD_REQUEST', details);
  }

  static unauthorized(message) {
    return new ApiError(401, message || 'Authentication required', 'UNAUTHORIZED');
  }

  static forbidden(message) {
    return new ApiError(403, message || 'Access denied', 'FORBIDDEN');
  }

  static notFound(message) {
    return new ApiError(404, message || 'Resource not found', 'NOT_FOUND');
  }

  static conflict(message) {
    return new ApiError(409, message, 'CONFLICT');
  }
}

module.exports = ApiError;
