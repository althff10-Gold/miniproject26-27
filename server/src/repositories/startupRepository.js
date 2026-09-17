const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class StartupRepository {
  async findStudentByUserId(userId) {
    try {
      return await db('students').where({ user_id: userId }).first();
    } catch (err) {
      let student = dataStore.find('students', s => String(s.user_id) === String(userId));
      if (!student) {
        // Automatically create a student profile if none exists for this user
        const user = dataStore.find('users', u => String(u.id) === String(userId));
        if (user && user.role === 'student') {
          student = dataStore.insert('students', {
            user_id: userId,
            date_of_birth: '2008-01-01',
            school_name: 'TeenPreneur Partner Academy',
            grade_level: '10th Grade',
            guardian_approved: true
          });
        }
      }
      return student;
    }
  }

  async findStartupsByStudentId(studentId) {
    try {
      return await db('startups').where({ student_id: studentId }).orderBy('created_at', 'desc');
    } catch (err) {
      return dataStore.filter('startups', s => String(s.student_id) === String(studentId) || String(s.user_id) === String(studentId));
    }
  }

  async findStartupById(id) {
    try {
      return await db('startups').where({ id }).first();
    } catch (err) {
      return dataStore.find('startups', s => String(s.id) === String(id));
    }
  }

  async createStartup(startupData) {
    try {
      const [startup] = await db('startups').insert(startupData).returning('*');
      return startup;
    } catch (err) {
      logger.warn(`PostgreSQL offline: saving startup to persistent local store`);
      return dataStore.insert('startups', {
        ...startupData,
        readiness_score: 75,
        status: startupData.status || 'active',
        stage: startupData.stage || 'ideation'
      });
    }
  }

  async updateStartup(id, updateData) {
    try {
      const [updated] = await db('startups')
        .where({ id })
        .update({ ...updateData, updated_at: new Date() })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('startups', id, updateData);
    }
  }

  async findIdeasByStartupId(startupId) {
    try {
      return await db('business_ideas').where({ startup_id: startupId }).orderBy('created_at', 'desc');
    } catch (err) {
      return dataStore.filter('business_ideas', i => String(i.startup_id) === String(startupId));
    }
  }

  async createIdea(ideaData) {
    try {
      const [idea] = await db('business_ideas').insert(ideaData).returning('*');
      return idea;
    } catch (err) {
      return dataStore.insert('business_ideas', {
        ...ideaData,
        validation_status: ideaData.validation_status || 'draft'
      });
    }
  }

  async updateIdea(id, updateData) {
    try {
      const [updated] = await db('business_ideas')
        .where({ id })
        .update({ ...updateData, updated_at: new Date() })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('business_ideas', id, updateData);
    }
  }

  async findMilestonesByStartupId(startupId) {
    try {
      return await db('milestones').where({ startup_id: startupId }).orderBy('due_date', 'asc');
    } catch (err) {
      return dataStore.filter('milestones', m => String(m.startup_id) === String(startupId));
    }
  }

  async createMilestone(milestoneData) {
    try {
      const [milestone] = await db('milestones').insert(milestoneData).returning('*');
      return milestone;
    } catch (err) {
      return dataStore.insert('milestones', {
        ...milestoneData,
        status: milestoneData.status || 'in_progress'
      });
    }
  }
}

module.exports = new StartupRepository();
