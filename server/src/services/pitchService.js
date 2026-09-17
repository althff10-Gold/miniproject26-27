const pitchRepository = require('../repositories/pitchRepository');
const logger = require('../config/logger');

class PitchService {
  async getUpcomingEvents() {
    return await pitchRepository.findAllEvents();
  }

  async getLeaderboard(eventId) {
    return await pitchRepository.findSubmissionsByEvent(eventId);
  }

  async submitPitch(submissionData) {
    return await pitchRepository.createSubmission(submissionData);
  }

  async scoreSubmission(submissionId, scoreData) {
    return await pitchRepository.submitScorecard(submissionId, scoreData);
  }
}

module.exports = new PitchService();
