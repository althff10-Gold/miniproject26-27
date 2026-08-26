const { db } = require('../config/database');

class StartupRepository {
  async findStudentByUserId(userId) {
    return db('students').where({ user_id: userId }).first();
  }

  async findStartupsByStudentId(studentId) {
    return db('startups').where({ student_id: studentId }).orderBy('created_at', 'desc');
  }

  async findStartupById(id) {
    return db('startups').where({ id }).first();
  }

  async createStartup(startupData) {
    const [startup] = await db('startups').insert(startupData).returning('*');
    return startup;
  }

  async updateStartup(id, updateData) {
    const [updated] = await db('startups')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning('*');
    return updated;
  }

  async findIdeasByStartupId(startupId) {
    return db('business_ideas').where({ startup_id: startupId }).orderBy('created_at', 'desc');
  }

  async createIdea(ideaData) {
    const [idea] = await db('business_ideas').insert(ideaData).returning('*');
    return idea;
  }

  async updateIdea(id, updateData) {
    const [updated] = await db('business_ideas')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning('*');
    return updated;
  }

  async findMilestonesByStartupId(startupId) {
    return db('milestones').where({ startup_id: startupId }).orderBy('target_date', 'asc');
  }

  async createMilestone(milestoneData) {
    const [milestone] = await db('milestones').insert(milestoneData).returning('*');
    return milestone;
  }
}

module.exports = new StartupRepository();
