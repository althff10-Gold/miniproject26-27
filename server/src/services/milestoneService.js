const milestoneRepository = require('../repositories/milestoneRepository');
const logger = require('../config/logger');

class MilestoneService {
  async getStartupMilestones(startupId) {
    const dbMilestones = await milestoneRepository.findMilestonesByStartupId(startupId);
    if (dbMilestones && dbMilestones.length > 0) return dbMilestones;

    return [
      {
        id: 'ms-101',
        startup_id: startupId,
        title: 'Customer Problem Validation Interviews',
        description: 'Conduct safe interviews with 15 target users without capturing PII under COPPA guidelines.',
        status: 'COMPLETED',
        target_date: '2026-08-25',
        order_index: 1,
        evidence_text: 'Summary of 18 student interviews on cafeteria packaging disposal habits.',
        mentor_feedback: 'Strong user pain-point identification. Ready to test physical sensor mockups.'
      },
      {
        id: 'ms-102',
        startup_id: startupId,
        title: 'Hardware Sensor Breadboard Prototype',
        description: 'Wire light sensor and IR proximity detector to an ESP32 microcontroller with serial logging.',
        status: 'SUBMITTED',
        target_date: '2026-09-08',
        order_index: 2,
        evidence_text: 'Uploaded schematics and a 45-second test video of object detection running at 94% accuracy.',
        evidence_url: 'https://cdn.teenpreneur.org/evidence/breadboard-test-v1.mp4'
      },
      {
        id: 'ms-103',
        startup_id: startupId,
        title: 'Submit Entry for Q3 Virtual Pitch Demo Day',
        description: 'Prepare a 10-slide deck covering problem, target market, unit economics, and pilot test metrics.',
        status: 'PENDING',
        target_date: '2026-09-22',
        order_index: 3
      }
    ];
  }

  async submitEvidence(milestoneId, evidenceData) {
    return await milestoneRepository.submitEvidence(milestoneId, evidenceData);
  }

  async verifyMilestone(milestoneId, verificationData) {
    return await milestoneRepository.verifyMilestone(milestoneId, verificationData);
  }
}

module.exports = new MilestoneService();
