const adminService = require('../services/adminService');
const logger = require('../config/logger');

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
}

module.exports = new AdminController();
