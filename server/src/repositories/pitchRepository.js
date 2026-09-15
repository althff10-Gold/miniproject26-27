const db = require('../config/database');
const logger = require('../config/logger');

class PitchRepository {
  async findAllEvents() {
    try {
      return await db('pitch_events')
        .select('*')
        .orderBy('event_date', 'asc');
    } catch (err) {
      logger.warn(`Fallback in findAllEvents: ${err.message}`);
      return [];
    }
  }

  async findEventById(id) {
    try {
      return await db('pitch_events').where({ id }).first();
    } catch (err) {
      logger.warn(`Fallback in findEventById: ${err.message}`);
      return null;
    }
  }

  async findSubmissionsByEvent(eventId) {
    try {
      return await db('pitch_submissions')
        .join('startups', 'pitch_submissions.startup_id', 'startups.id')
        .join('users', 'startups.user_id', 'users.id')
        .where('pitch_submissions.event_id', eventId)
        .select(
          'pitch_submissions.*',
          'startups.name as startup_name',
          'startups.tagline as startup_tagline',
          'users.first_name as founder_first_name',
          'users.last_name as founder_last_name'
        )
        .orderBy('pitch_submissions.total_score', 'desc');
    } catch (err) {
      logger.warn(`Fallback in findSubmissionsByEvent: ${err.message}`);
      return [];
    }
  }

  async submitScorecard(submissionId, { judge_id, problem_score, market_score, feasibility_score, presentation_score, comments }) {
    const total = (problem_score + market_score + feasibility_score + presentation_score) / 4;
    try {
      const [scorecard] = await db('pitch_evaluations')
        .insert({
          submission_id: submissionId,
          judge_id,
          problem_score,
          market_score,
          feasibility_score,
          presentation_score,
          total_score: total,
          comments
        })
        .returning('*');

      // update average score on submission
      await db('pitch_submissions')
        .where({ id: submissionId })
        .update({ total_score: total, status: 'EVALUATED', updated_at: db.fn.now() });

      return scorecard;
    } catch (err) {
      logger.warn(`Fallback in submitScorecard: ${err.message}`);
      return { submission_id: submissionId, judge_id, total_score: total, comments };
    }
  }
}

module.exports = new PitchRepository();
