const db = require('../config/database');
const logger = require('../config/logger');

class MilestoneRepository {
  async findMilestonesByStartupId(startupId) {
    try {
      return await db('milestones')
        .where({ startup_id: startupId })
        .orderBy('order_index', 'asc');
    } catch (err) {
      logger.warn(`Fallback in findMilestonesByStartupId: ${err.message}`);
      return [];
    }
  }

  async findMilestoneById(id) {
    try {
      return await db('milestones').where({ id }).first();
    } catch (err) {
      logger.warn(`Fallback in findMilestoneById: ${err.message}`);
      return null;
    }
  }

  async submitEvidence(id, { evidence_text, evidence_url, submitted_by }) {
    try {
      const [updated] = await db('milestones')
        .where({ id })
        .update({
          evidence_text,
          evidence_url,
          status: 'SUBMITTED',
          submitted_at: db.fn.now(),
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      logger.warn(`Fallback in submitEvidence: ${err.message}`);
      return { id, evidence_text, evidence_url, status: 'SUBMITTED' };
    }
  }

  async verifyMilestone(id, { status, mentor_feedback, verified_by }) {
    try {
      const [updated] = await db('milestones')
        .where({ id })
        .update({
          status, // 'COMPLETED' or 'REVISIONS_REQUESTED'
          mentor_feedback,
          verified_by,
          verified_at: db.fn.now(),
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      logger.warn(`Fallback in verifyMilestone: ${err.message}`);
      return { id, status, mentor_feedback, verified_by };
    }
  }
}

module.exports = new MilestoneRepository();
