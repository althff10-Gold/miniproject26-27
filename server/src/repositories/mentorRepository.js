const db = require('../config/database');
const logger = require('../config/logger');

class MentorRepository {
  async findAllMentors({ status = 'APPROVED', specialization = null, page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    let query = db('mentors')
      .join('users', 'mentors.user_id', 'users.id')
      .select(
        'mentors.id',
        'mentors.user_id',
        'mentors.bio',
        'mentors.expertise',
        'mentors.years_of_experience',
        'mentors.company',
        'mentors.designation',
        'mentors.linkedin_url',
        'mentors.vetting_status',
        'mentors.max_mentees',
        'mentors.is_available',
        'mentors.rating',
        'mentors.total_reviews',
        'users.first_name',
        'users.last_name',
        'users.avatar_url',
        'users.email'
      );

    if (status) {
      query = query.where('mentors.vetting_status', status);
    }
    if (specialization) {
      query = query.whereRaw('? = ANY(mentors.expertise)', [specialization]);
    }

    return query.limit(limit).offset(offset).orderBy('mentors.rating', 'desc');
  }

  async findMentorById(id) {
    return db('mentors')
      .join('users', 'mentors.user_id', 'users.id')
      .where('mentors.id', id)
      .select(
        'mentors.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.avatar_url'
      )
      .first();
  }

  async findMentorByUserId(userId) {
    return db('mentors')
      .where({ user_id: userId })
      .first();
  }

  async createMentorProfile(mentorData) {
    const [mentor] = await db('mentors')
      .insert(mentorData)
      .returning('*');
    return mentor;
  }

  async updateVettingStatus(id, status, notes = null, adminId = null) {
    const [updated] = await db('mentors')
      .where({ id })
      .update({
        vetting_status: status,
        vetted_at: db.fn.now(),
        vetted_by: adminId,
        vetting_notes: notes,
        updated_at: db.fn.now()
      })
      .returning('*');
    return updated;
  }

  async findAssignedStartups(mentorId) {
    return db('startups')
      .join('users as founder', 'startups.user_id', 'founder.id')
      .where('startups.mentor_id', mentorId)
      .select(
        'startups.id',
        'startups.name',
        'startups.tagline',
        'startups.stage',
        'startups.industry',
        'startups.readiness_score',
        'startups.created_at',
        'founder.first_name as founder_first_name',
        'founder.last_name as founder_last_name',
        'founder.email as founder_email'
      );
  }

  async assignMentorToStartup(mentorId, startupId) {
    const [updated] = await db('startups')
      .where({ id: startupId })
      .update({
        mentor_id: mentorId,
        updated_at: db.fn.now()
      })
      .returning('*');
    return updated;
  }

  async findMentoringSessions(mentorId) {
    return db('mentoring_sessions')
      .join('startups', 'mentoring_sessions.startup_id', 'startups.id')
      .join('users as founder', 'startups.user_id', 'founder.id')
      .where('mentoring_sessions.mentor_id', mentorId)
      .select(
        'mentoring_sessions.*',
        'startups.name as startup_name',
        'founder.first_name as student_first_name',
        'founder.last_name as student_last_name'
      )
      .orderBy('mentoring_sessions.scheduled_at', 'asc');
  }

  async scheduleSession(sessionData) {
    const [session] = await db('mentoring_sessions')
      .insert(sessionData)
      .returning('*');
    return session;
  }
}

module.exports = new MentorRepository();
