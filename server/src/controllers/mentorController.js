const mentorService = require('../services/mentorService');
const logger = require('../config/logger');

class MentorController {
  async getDirectory(req, res, next) {
    try {
      const { specialization, page, limit } = req.query;
      const mentors = await mentorService.getVettedMentors({ specialization, page, limit });
      res.json({
        success: true,
        data: mentors
      });
    } catch (err) {
      next(err);
    }
  }

  async getMyProfile(req, res, next) {
    try {
      const profile = await mentorService.getMentorProfile(req.user.id);
      res.json({
        success: true,
        data: profile
      });
    } catch (err) {
      next(err);
    }
  }

  async getAssignedStartups(req, res, next) {
    try {
      const mentor = await mentorService.getMentorProfile(req.user.id);
      const startups = await mentorService.getAssignedStartups(mentor.id);
      res.json({
        success: true,
        data: startups
      });
    } catch (err) {
      next(err);
    }
  }

  async scheduleSession(req, res, next) {
    try {
      const { startup_id, scheduled_at, duration_minutes, topic, meeting_link } = req.body;
      const mentor = await mentorService.getMentorProfile(req.user.id);
      const session = await mentorService.scheduleSession({
        mentor_id: mentor.id,
        startup_id,
        scheduled_at,
        duration_minutes: duration_minutes || 45,
        topic,
        meeting_link: meeting_link || 'https://meet.teenpreneur.org/room/' + Date.now()
      });
      res.status(201).json({
        success: true,
        message: 'Mentoring session scheduled successfully with guardian notification',
        data: session
      });
    } catch (err) {
      next(err);
    }
  }

  async updateVetting(req, res, next) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const updated = await mentorService.updateVetting(id, status, notes, req.user.id);
      res.json({
        success: true,
        message: `Mentor vetting status updated to ${status}`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MentorController();
