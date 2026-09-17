const pitchService = require('../services/pitchService');

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

  async submitPitch(req, res, next) {
    try {
      const { eventId } = req.params;
      const { startup_id, pitch_title, pitch_content, presentation_url, video_url } = req.body;
      const studentId = req.user ? req.user.id : 1;

      const submission = await pitchService.submitPitch({
        event_id: Number(eventId),
        startup_id: Number(startup_id) || 1,
        student_id: studentId,
        pitch_title,
        pitch_content: pitch_content || '',
        presentation_url,
        video_url: video_url || ''
      });

      res.status(201).json({
        success: true,
        message: 'Pitch submitted successfully to virtual demo day',
        data: submission
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
        problem_score: Number(problem_score || 8),
        market_score: Number(market_score || 8),
        feasibility_score: Number(feasibility_score || 8),
        presentation_score: Number(presentation_score || 8),
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
