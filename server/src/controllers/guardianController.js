const guardianService = require('../services/guardianService');
const ResponseFormatter = require('../utils/responseFormatter');

class GuardianController {
  /**
   * Get all children linked to the authenticated guardian
   * GET /api/v1/guardians/children
   */
  async getChildren(req, res, next) {
    try {
      const children = await guardianService.getLinkedChildren(req.user.id);
      return ResponseFormatter.success(res, children, 'Linked children retrieved');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update consent status for linked child
   * PUT /api/v1/guardians/children/:linkId/consent
   */
  async updateConsent(req, res, next) {
    try {
      const { linkId } = req.params;
      const { decision } = req.body;
      const result = await guardianService.updateConsent(req.user.id, parseInt(linkId), decision);
      return ResponseFormatter.success(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get activity feed for a linked child
   * GET /api/v1/guardians/children/:studentId/activity
   */
  async getChildActivity(req, res, next) {
    try {
      const { studentId } = req.params;
      const activity = await guardianService.getChildActivity(req.user.id, parseInt(studentId));
      return ResponseFormatter.success(res, activity, 'Child activity stream retrieved');
    } catch (error) {
      next(error);
    }
  }

  /**
   * View supervised conversations of a linked child
   * GET /api/v1/guardians/children/:studentId/conversations
   */
  async getChildConversations(req, res, next) {
    try {
      const { studentId } = req.params;
      const conversations = await guardianService.getChildConversations(req.user.id, parseInt(studentId));
      return ResponseFormatter.success(res, conversations, 'Supervised conversations retrieved');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GuardianController();
