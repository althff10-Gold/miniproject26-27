const startupService = require('../services/startupService');
const ResponseFormatter = require('../utils/responseFormatter');

class StartupController {
  async getMyStartups(req, res, next) {
    try {
      const startups = await startupService.getMyStartups(req.user.id);
      return ResponseFormatter.success(res, startups, 'Startups retrieved');
    } catch (error) {
      next(error);
    }
  }

  async createStartup(req, res, next) {
    try {
      const startup = await startupService.createStartup(req.user.id, req.body);
      return ResponseFormatter.created(res, startup, 'Startup created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getStartupDetails(req, res, next) {
    try {
      const { id } = req.params;
      const startup = await startupService.getStartupDetails(parseInt(id));
      return ResponseFormatter.success(res, startup, 'Startup details retrieved');
    } catch (error) {
      next(error);
    }
  }

  async createIdea(req, res, next) {
    try {
      const { id } = req.params;
      const result = await startupService.createIdea(req.user.id, parseInt(id), req.body);
      return ResponseFormatter.created(res, result, 'Idea added with AI evaluation');
    } catch (error) {
      next(error);
    }
  }

  async evaluateIdeaDirectly(req, res, next) {
    try {
      const result = await startupService.evaluateIdeaDirectly(req.body);
      return ResponseFormatter.success(res, result, 'AI Idea Evaluation complete');
    } catch (error) {
      next(error);
    }
  }

  async createMilestone(req, res, next) {
    try {
      const { id } = req.params;
      const milestone = await startupService.createMilestone(req.user.id, parseInt(id), req.body);
      return ResponseFormatter.created(res, milestone, 'Milestone created');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StartupController();
