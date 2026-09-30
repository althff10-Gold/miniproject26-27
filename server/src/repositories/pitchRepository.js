const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class PitchRepository {
  async findAllEvents() {
    try {
      return await db('pitch_events').select('*').orderBy('event_date', 'asc');
    } catch (err) {
      return dataStore.table('pitch_events');
    }
  }

  async findEventById(id) {
    try {
      return await db('pitch_events').where({ id }).first();
    } catch (err) {
      return dataStore.find('pitch_events', e => String(e.id) === String(id));
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
      const subs = dataStore.filter('pitch_submissions', s => String(s.event_id) === String(eventId));
      return subs.map(s => {
        const startup = dataStore.find('startups', st => String(st.id) === String(s.startup_id)) || {};
        const founder = dataStore.find('users', u => String(u.id) === String(startup.user_id || s.student_id)) || {};
        return {
          ...s,
          startup_name: startup.name || 'Student Venture',
          startup_tagline: startup.tagline || 'NextGen Student Startup',
          founder_first_name: founder.first_name || 'Founder',
          founder_last_name: founder.last_name || ''
        };
      }).sort((a, b) => (b.total_score || 0) - (a.total_score || 0));
    }
  }

  async createSubmission(submissionData) {
    try {
      const [sub] = await db('pitch_submissions').insert(submissionData).returning('*');
      return sub;
    } catch (err) {
      return dataStore.insert('pitch_submissions', {
        ...submissionData,
        status: 'submitted',
        total_score: 8.0
      });
    }
  }

  async submitScorecard(submissionId, { judge_id, problem_score, market_score, feasibility_score, presentation_score, comments }) {
    const total = Number(((problem_score + market_score + feasibility_score + presentation_score) / 4).toFixed(1));
    try {
      const [scorecard] = await db('pitch_feedback')
        .insert({
          submission_id: submissionId,
          mentor_id: judge_id,
          rating: Math.round(total),
          innovation_score: problem_score,
          feasibility_score,
          presentation_score,
          comments
        })
        .returning('*');

      await db('pitch_submissions')
        .where({ id: submissionId })
        .update({ total_score: total, status: 'reviewed', updated_at: db.fn.now() });

      return scorecard;
    } catch (err) {
      dataStore.insert('pitch_feedback', {
        submission_id: submissionId,
        mentor_id: judge_id,
        rating: Math.round(total),
        innovation_score: problem_score,
        feasibility_score,
        presentation_score,
        comments
      });
      dataStore.update('pitch_submissions', submissionId, {
        total_score: total,
        status: 'reviewed'
      });
      return { submission_id: submissionId, judge_id, total_score: total, comments };
    }
  }
}

module.exports = new PitchRepository();
