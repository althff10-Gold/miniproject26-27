const adminRepository = require('../repositories/adminRepository');
const mentorRepository = require('../repositories/mentorRepository');
const logger = require('../config/logger');

class AdminService {
  async getDashboardData() {
    const metrics = await adminRepository.getPlatformMetrics();
    const auditLogs = await adminRepository.getRecentAuditLogs();
    const pendingMentors = await adminRepository.getPendingMentorVettingQueue();

    return {
      metrics,
      auditLogs,
      pendingMentors
    };
  }

  async getAllUsers() {
    return await adminRepository.getAllUsers();
  }

  async updateUserStatus(userId, status) {
    return await adminRepository.updateUserStatus(userId, status);
  }

  async approveMentor(mentorId, adminId) {
    return await mentorRepository.updateVettingStatus(mentorId, 'APPROVED', 'Credentials approved by Platform Administrator', adminId);
  }

  async rejectMentor(mentorId, notes, adminId) {
    return await mentorRepository.updateVettingStatus(mentorId, 'REJECTED', notes || 'Credentials insufficient', adminId);
  }

  async getModerationFlags() {
    return await adminRepository.getFlaggedMessages();
  }

  async takeModerationAction(flagId, actionType, notes, adminId) {
    return await adminRepository.handleModerationAction({
      flag_id: flagId,
      action_type: actionType,
      taken_by: adminId,
      notes
    });
  }
}

module.exports = new AdminService();
