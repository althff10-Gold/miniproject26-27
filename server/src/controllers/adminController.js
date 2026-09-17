const adminService = require('../services/adminService');

class AdminController {
  async getDashboard(req, res, next) {
    try {
      const data = await adminService.getDashboardData();
      res.json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await adminService.getAllUsers();
      res.json({
        success: true,
        data: users
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await adminService.updateUserStatus(id, status);
      res.json({
        success: true,
        message: `User status updated to ${status}`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }

  async approveMentor(req, res, next) {
    try {
      const { id } = req.params;
      const result = await adminService.approveMentor(id, req.user?.id);
      res.json({
        success: true,
        message: 'Mentor approved and verified successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  async getModerationFlags(req, res, next) {
    try {
      const flags = await adminService.getModerationFlags();
      res.json({
        success: true,
        data: flags
      });
    } catch (err) {
      next(err);
    }
  }

  async takeModerationAction(req, res, next) {
    try {
      const { flagId, actionType, notes } = req.body;
      const result = await adminService.takeModerationAction(flagId, actionType, notes, req.user?.id);
      res.json({
        success: true,
        message: 'Moderation action applied successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
