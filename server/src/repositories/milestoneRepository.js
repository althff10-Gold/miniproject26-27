const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class MilestoneRepository {
  async findMilestonesByStartupId(startupId) {
    try {
      return await db('milestones')
        .where({ startup_id: startupId })
        .orderBy('due_date', 'asc');
    } catch (err) {
      return dataStore.filter('milestones', m => String(m.startup_id) === String(startupId));
    }
  }

  async findMilestoneById(id) {
    try {
      return await db('milestones').where({ id }).first();
    } catch (err) {
      return dataStore.find('milestones', m => String(m.id) === String(id));
    }
  }

  async submitEvidence(id, { evidence_text, evidence_url, submitted_by }) {
    try {
      const [updated] = await db('milestones')
        .where({ id })
        .update({
          evidence_text,
          evidence_url,
          status: 'submitted',
          submitted_at: db.fn.now(),
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('milestones', id, {
        evidence_text,
        evidence_url,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      });
    }
  }

  async verifyMilestone(id, { status, mentor_feedback, verified_by }) {
    try {
      const [updated] = await db('milestones')
        .where({ id })
        .update({
          status: status.toLowerCase(), // 'completed' or 'revisions_requested'
          mentor_feedback,
          verified_by,
          verified_at: db.fn.now(),
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('milestones', id, {
        status: status.toLowerCase(),
        mentor_feedback,
        verified_by,
        verified_at: new Date().toISOString()
      });
    }
  }
}

module.exports = new MilestoneRepository();
