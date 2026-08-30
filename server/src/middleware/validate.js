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

    return res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Input validation failed',
        details: formattedErrors
      }
    });
  }
  next();
};

module.exports = validate;
module.exports.validate = validate;
