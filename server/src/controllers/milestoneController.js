const milestoneService = require('../services/milestoneService');
const logger = require('../config/logger');

class MilestoneController {
  async getStartupMilestones(req, res, next) {
    try {
      const { startupId } = req.params;
      const milestones = await milestoneService.getStartupMilestones(startupId);
      res.json({
        success: true,
        data: milestones
      });
    } catch (err) {
      next(err);
    }
  }

  async submitEvidence(req, res, next) {
    try {
      const { id } = req.params;
      const { evidence_text, evidence_url } = req.body;
      const updated = await milestoneService.submitEvidence(id, {
        evidence_text,
        evidence_url,
        submitted_by: req.user ? req.user.id : 'demo-student'
      });
      res.json({
        success: true,
        message: 'Evidence submitted for mentor verification',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }

  async verifyMilestone(req, res, next) {
    try {
      const { id } = req.params;
      const { status, mentor_feedback } = req.body;
      const updated = await milestoneService.verifyMilestone(id, {
        status,
        mentor_feedback,
        verified_by: req.user ? req.user.id : 'demo-mentor'
      });
      res.json({
        success: true,
        message: `Milestone marked as ${status}`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MilestoneController();
