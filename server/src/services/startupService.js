const startupRepository = require('../repositories/startupRepository');
const aiModerationService = require('./aiModerationService');
const authRepository = require('../repositories/authRepository');
const { AUDIT_ACTIONS } = require('../config/constants');
const ApiError = require('../utils/ApiError');

class StartupService {
  async getMyStartups(userId) {
    const student = await startupRepository.findStudentByUserId(userId);
    if (!student) {
      throw ApiError.notFound('Student profile not found');
    }

    const startups = await startupRepository.findStartupsByStudentId(student.id);
    const enriched = await Promise.all(
      startups.map(async (s) => {
        const ideas = await startupRepository.findIdeasByStartupId(s.id);
        const milestones = await startupRepository.findMilestonesByStartupId(s.id);
        return {
          ...s,
          ideas,
          milestones
        };
      })
    );

    return enriched;
  }

  async createStartup(userId, data) {
    const student = await startupRepository.findStudentByUserId(userId);
    if (!student) throw ApiError.notFound('Student profile not found');

    const startup = await startupRepository.createStartup({
      student_id: student.id,
      name: data.name,
      tagline: data.tagline || null,
      description: data.description,
      industry: data.industry,
      stage: data.stage || 'ideation'
    });

    await authRepository.createAuditLog(userId, AUDIT_ACTIONS.STARTUP_CREATE, 'startups', startup.id, { name: startup.name });
    return startup;
  }

  async getStartupDetails(id) {
    const startup = await startupRepository.findStartupById(id);
    if (!startup) throw ApiError.notFound('Startup venture not found');

    const ideas = await startupRepository.findIdeasByStartupId(id);
    const milestones = await startupRepository.findMilestonesByStartupId(id);

    return {
      ...startup,
      ideas,
      milestones
    };
  }

  async createIdea(userId, startupId, ideaData) {
    const student = await startupRepository.findStudentByUserId(userId);
    if (!student) throw ApiError.notFound('Student not found');

    const startup = await startupRepository.findStartupById(startupId);
    if (!startup || startup.student_id !== student.id) {
      throw ApiError.forbidden('You do not have permission to modify this startup');
    }

    // Evaluate idea with AI service
    const evaluation = await aiModerationService.evaluateIdea(
      ideaData.title,
      ideaData.problemStatement,
      ideaData.solution,
      ideaData.targetMarket
    );

    const idea = await startupRepository.createIdea({
      startup_id: startupId,
      title: ideaData.title,
      problem_statement: ideaData.problemStatement,
      target_market: ideaData.targetMarket || null,
      validation_status: 'draft'
    });

    return {
      idea,
      aiEvaluation: evaluation
    };
  }

  async evaluateIdeaDirectly(data) {
    return await aiModerationService.evaluateIdea(
      data.title,
      data.problem,
      data.solution,
      data.targetMarket
    );
  }

  async createMilestone(userId, startupId, milestoneData) {
    const student = await startupRepository.findStudentByUserId(userId);
    if (!student) throw ApiError.notFound('Student not found');

    const startup = await startupRepository.findStartupById(startupId);
    if (!startup || startup.student_id !== student.id) {
      throw ApiError.forbidden('Unauthorized to add milestone');
    }

    return await startupRepository.createMilestone({
      startup_id: startupId,
      title: milestoneData.title,
      description: milestoneData.description || null,
      target_date: milestoneData.targetDate,
      status: 'pending'
    });
  }
}

module.exports = new StartupService();
