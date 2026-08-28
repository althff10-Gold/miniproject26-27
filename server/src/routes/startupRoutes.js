const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const startupController = require('../controllers/startupController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { ROLES } = require('../config/constants');

// Require authentication for startup routes
router.use(authenticate);

/**
 * @route   GET /api/v1/startups
 * @desc    Get startups for authenticated student
 * @access  Student, Mentor, Admin
 */
router.get('/', (req, res, next) => startupController.getMyStartups(req, res, next));

/**
 * @route   POST /api/v1/startups
 * @desc    Create new student startup venture
 * @access  Student
 */
router.post(
  '/',
  authorize(ROLES.STUDENT, ROLES.ADMIN),
  [
    body('name').trim().notEmpty().withMessage('Startup name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('industry').trim().notEmpty().withMessage('Industry is required'),
    validate
  ],
  (req, res, next) => startupController.createStartup(req, res, next)
);

/**
 * @route   POST /api/v1/startups/evaluate-idea
 * @desc    Evaluate a startup concept with AI scoring
 * @access  Authenticated
 */
router.post(
  '/evaluate-idea',
  [
    body('title').trim().notEmpty().withMessage('Idea title is required'),
    body('problem').trim().notEmpty().withMessage('Problem statement is required'),
    body('solution').trim().notEmpty().withMessage('Solution is required'),
    validate
  ],
  (req, res, next) => startupController.evaluateIdeaDirectly(req, res, next)
);

/**
 * @route   GET /api/v1/startups/:id
 * @desc    Get startup details with ideas and milestones
 * @access  Authenticated
 */
router.get(
  '/:id',
  [param('id').isInt().withMessage('Startup ID must be an integer'), validate],
  (req, res, next) => startupController.getStartupDetails(req, res, next)
);

/**
 * @route   POST /api/v1/startups/:id/ideas
 * @desc    Add business idea to startup with AI evaluation
 * @access  Student (Owner)
 */
router.post(
  '/:id/ideas',
  authorize(ROLES.STUDENT, ROLES.ADMIN),
  [
    param('id').isInt().withMessage('Startup ID must be an integer'),
    body('title').trim().notEmpty().withMessage('Idea title is required'),
    body('problemStatement').trim().notEmpty().withMessage('Problem statement is required'),
    validate
  ],
  (req, res, next) => startupController.createIdea(req, res, next)
);

/**
 * @route   POST /api/v1/startups/:id/milestones
 * @desc    Create a milestone for startup
 * @access  Student (Owner)
 */
router.post(
  '/:id/milestones',
  authorize(ROLES.STUDENT, ROLES.ADMIN),
  [
    param('id').isInt().withMessage('Startup ID must be an integer'),
    body('title').trim().notEmpty().withMessage('Milestone title is required'),
    body('targetDate').notEmpty().withMessage('Target date is required'),
    validate
  ],
  (req, res, next) => startupController.createMilestone(req, res, next)
);

module.exports = router;
