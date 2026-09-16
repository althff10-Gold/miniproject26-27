const { validationResult } = require('express-validator');

/**
 * Validation middleware - checks express-validator results
 * Returns 422 with detailed error messages on failure
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));

    const firstError = formattedErrors[0]?.message || 'Input validation failed';
    const combinedMessage = formattedErrors.map(e => `${e.field}: ${e.message}`).join('; ');

    return res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: firstError,
        details: formattedErrors,
        summary: combinedMessage
      }
    });
  }
  next();
};

module.exports = validate;
module.exports.validate = validate;
