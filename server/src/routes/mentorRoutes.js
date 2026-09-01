const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');

// Public mentor directory for students & parents
router.get('/', mentorController.getDirectory);

// Mentor-specific authenticated endpoints
router.get(
  '/my-profile',
  authenticate,
  authorize('mentor', 'admin'),
  mentorController.getMyProfile
);

router.get(
  '/assigned-startups',
  authenticate,
  authorize('mentor', 'admin'),
  mentorController.getAssignedStartups
);

router.post(
  '/schedule-session',
  authenticate,
  authorize('mentor', 'admin'),
  [
    body('startup_id').isString().notEmpty().withMessage('Startup ID is required'),
    body('scheduled_at').isISO8601().withMessage('Valid ISO scheduled datetime required'),
    body('topic').isString().isLength({ min: 5, max: 200 }).withMessage('Topic must be between 5 and 200 chars')
  ],
  validate,
  mentorController.scheduleSession
);

// Admin-only vetting route
router.put(
  '/:id/vetting',
  authenticate,
  authorize('admin'),
  [
    param('id').isString().notEmpty(),
    body('status').isIn(['APPROVED', 'REJECTED', 'SUSPENDED']).withMessage('Invalid status')
  ],
  validate,
  mentorController.updateVetting
);

module.exports = router;
