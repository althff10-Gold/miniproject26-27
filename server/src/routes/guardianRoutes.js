const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const guardianController = require('../controllers/guardianController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { ROLES } = require('../config/constants');

// Protect all guardian routes: must be authenticated and have role guardian or admin
router.use(authenticate, authorize(ROLES.GUARDIAN, ROLES.ADMIN));

/**
 * @route   GET /api/v1/guardians/children
 * @desc    List all students linked to the authenticated guardian
 * @access  Guardian, Admin
 */
router.get('/children', (req, res, next) => guardianController.getChildren(req, res, next));

/**
 * @route   PUT /api/v1/guardians/children/:linkId/consent
 * @desc    Approve or reject parental consent for linked child
 * @access  Guardian, Admin
 */
router.put(
  '/children/:linkId/consent',
  [
    param('linkId').isInt().withMessage('Link ID must be an integer'),
    body('decision').isIn(['approved', 'rejected']).withMessage('Decision must be approved or rejected'),
    validate
  ],
  (req, res, next) => guardianController.updateConsent(req, res, next)
);

/**
 * @route   GET /api/v1/guardians/children/:studentId/activity
 * @desc    Get recent activity stream of linked child
 * @access  Guardian, Admin
 */
router.get(
  '/children/:studentId/activity',
  [param('studentId').isInt().withMessage('Student ID must be an integer'), validate],
  (req, res, next) => guardianController.getChildActivity(req, res, next)
);

/**
 * @route   GET /api/v1/guardians/children/:studentId/conversations
 * @desc    View read-only supervised conversations of child
 * @access  Guardian, Admin
 */
router.get(
  '/children/:studentId/conversations',
  [param('studentId').isInt().withMessage('Student ID must be an integer'), validate],
  (req, res, next) => guardianController.getChildConversations(req, res, next)
);

module.exports = router;
