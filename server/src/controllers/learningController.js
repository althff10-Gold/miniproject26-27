const learningService = require('../services/learningService');
const logger = require('../config/logger');

class LearningController {
  async getTracks(req, res, next) {
    try {
      const tracks = await learningService.getAllTracks();
      res.json({
        success: true,
        data: tracks
      });
    } catch (err) {
      next(err);
    }
  }

  async submitQuiz(req, res, next) {
    try {
      const { lessonId } = req.params;
      const { selectedAnswer } = req.body;
      const studentId = req.user ? req.user.id : 'demo-student';
      const result = await learningService.submitQuiz(studentId, lessonId, Number(selectedAnswer));
      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LearningController();
