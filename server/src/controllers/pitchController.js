const pitchService = require('../services/pitchService');
const logger = require('../config/logger');

class PitchController {
  async getEvents(req, res, next) {
    try {
      const events = await pitchService.getUpcomingEvents();
      res.json({
        success: true,
        data: events
      });
    } catch (err) {
      next(err);
    }
  }

  async getLeaderboard(req, res, next) {
    try {
      const { eventId } = req.params;
      const leaderboard = await pitchService.getLeaderboard(eventId);
      res.json({
        success: true,
        data: leaderboard
      });
    } catch (err) {
      next(err);
    }
  }

  async scoreSubmission(req, res, next) {
    try {
      const { submissionId } = req.params;
      const { problem_score, market_score, feasibility_score, presentation_score, comments } = req.body;
      const judgeId = req.user ? req.user.id : 'demo-judge';

      const result = await pitchService.scoreSubmission(submissionId, {
        judge_id: judgeId,
        problem_score: Number(problem_score),
        market_score: Number(market_score),
        feasibility_score: Number(feasibility_score),
        presentation_score: Number(presentation_score),
        comments
      });

      res.json({
        success: true,
        message: 'Scorecard submitted successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PitchController();
