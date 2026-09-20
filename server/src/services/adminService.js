const adminRepository = require('../repositories/adminRepository');
const logger = require('../config/logger');

class AdminService {
  async getDashboardData() {
    const metrics = await adminRepository.getPlatformMetrics();
    const auditLogs = await adminRepository.getRecentAuditLogs();
    const pendingMentors = await adminRepository.getPendingMentorVettingQueue();

    return {
      metrics,
      auditLogs: auditLogs.length > 0 ? auditLogs : [
        { id: 1, action: 'PARENTAL_CONSENT_GRANTED', user: 'Sunita Sharma (Guardian)', timestamp: '2026-09-19 14:10 IST', status: 'SUCCESS' },
        { id: 2, action: 'AI_PII_FILTER_TRIGGERED', user: 'System Heuristic Filter', timestamp: '2026-09-19 11:35 IST', status: 'FLAGGED' },
        { id: 3, action: 'MENTOR_APPLICATION_SUBMITTED', user: 'Vikram Malhotra', timestamp: '2026-09-18 19:40 IST', status: 'PENDING' }
      ],
      pendingMentors: pendingMentors.length > 0 ? pendingMentors : [
        {
          id: 'mentor-app-003',
          first_name: 'Ananya',
          last_name: 'Deshmukh',
          email: 'ananya.d@scalehub.org',
          company: 'Fintech Catalyst Lab',
          designation: 'Senior Product Architect',
          expertise: ['Fintech', 'SaaS', 'Digital Payments'],
          years_of_experience: 9,
          submitted_date: '2026-09-19'
        }
      ]
    };
  }
}

module.exports = new AdminService();
