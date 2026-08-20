const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');
const { ROLES } = require('../config/constants');

router.post(
  '/register',
  authLimiter,
  [
    body('email')
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role')
      .isIn([ROLES.STUDENT, ROLES.GUARDIAN, ROLES.MENTOR])
      .withMessage('Role must be student, guardian, or mentor'),
    body('firstName')
      .trim().notEmpty().withMessage('First name is required')
      .isLength({ max: 50 }).withMessage('First name must be under 50 characters'),
    body('lastName')
      .trim().notEmpty().withMessage('Last name is required')
      .isLength({ max: 50 }).withMessage('Last name must be under 50 characters'),
    body('guardianEmail')
      .optional()
      .isEmail().withMessage('Guardian email must be a valid email address')
      .normalizeEmail(),
    validate
  ],
  (req, res, next) => authController.register(req, res, next)
);

router.post(
  '/login',
  authLimiter,
  [
    body('email')
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required'),
    validate
  ],
  (req, res, next) => authController.login(req, res, next)
);

router.post(
  '/refresh',
  [
    body('refreshToken')
      .notEmpty().withMessage('Refresh token is required'),
    validate
  ],
  (req, res, next) => authController.refresh(req, res, next)
);

router.post('/logout', authenticate, (req, res, next) => authController.logout(req, res, next));

router.get('/me', authenticate, (req, res, next) => authController.getCurrentUser(req, res, next));

router.post(
  '/guardian-approval',
  [
    body('token').notEmpty().withMessage('Approval token is required'),
    body('decision').optional().isIn(['approved', 'rejected']),
    validate
  ],
  (req, res, next) => authController.guardianApproval(req, res, next)
);

module.exports = router;
