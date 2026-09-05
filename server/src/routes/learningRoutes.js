const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const authenticate = require('../middleware/authenticate');

// Public or student tracks list
router.get('/tracks', learningController.getTracks);

// Submit quiz answer (authenticated student)
router.post('/lessons/:lessonId/quiz', authenticate, learningController.submitQuiz);

module.exports = router;
