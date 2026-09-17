const express = require('express');
const router = express.Router();
const pitchController = require('../controllers/pitchController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Public pitch competitions list
router.get('/events', pitchController.getEvents);

// Event leaderboard and submissions
router.get('/events/:eventId/leaderboard', pitchController.getLeaderboard);

// Student pitch submission
router.post(
  '/events/:eventId/submit',
  authenticate,
  authorize('student', 'admin'),
  pitchController.submitPitch
);

// Judge evaluation endpoint
router.post(
  '/submissions/:submissionId/score',
  authenticate,
  authorize('mentor', 'admin'),
  pitchController.scoreSubmission
);

module.exports = router;
