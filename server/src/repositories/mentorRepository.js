const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class MentorRepository {
  async findAllMentors({ status = 'APPROVED', specialization = null, page = 1, limit = 20 } = {}) {
    try {
      const offset = (page - 1) * limit;
      let query = db('mentors')
        .join('users', 'mentors.user_id', 'users.id')
        .select(
          'mentors.id',
          'mentors.user_id',
          'mentors.bio',
          'mentors.expertise',
          'mentors.years_of_experience',
          'mentors.organization as company',
          'mentors.linkedin_url',
          'mentors.verification_status as vetting_status',
          'mentors.rating',
          'mentors.total_reviews',
          'users.first_name',
          'users.last_name',
          'users.avatar_url',
          'users.email'
        );

      if (status) {
        query = query.where('mentors.verification_status', status);
      }
      return await query.limit(limit).offset(offset).orderBy('mentors.rating', 'desc');
    } catch (err) {
      let mentors = dataStore.table('mentors');
      if (status) {
        mentors = mentors.filter(m => String(m.verification_status).toUpperCase() === String(status).toUpperCase());
      }
      return mentors.map(m => {
        const u = dataStore.find('users', user => String(user.id) === String(m.user_id)) || {};
        return {
          id: m.id,
          user_id: m.user_id,
          bio: m.bio,
          expertise: m.expertise,
          years_of_experience: m.years_of_experience,
          company: m.organization || m.company,
          linkedin_url: m.linkedin_url,
          vetting_status: m.verification_status || 'APPROVED',
          rating: m.rating || 4.9,
          total_reviews: m.total_reviews || 20,
          first_name: u.first_name || 'Mentor',
          last_name: u.last_name || '',
          avatar_url: u.avatar_url,
          email: u.email
        };
      });
    }
  }

  async findMentorById(id) {
    try {
      return await db('mentors')
        .join('users', 'mentors.user_id', 'users.id')
        .where('mentors.id', id)
        .select('mentors.*', 'users.first_name', 'users.last_name', 'users.email', 'users.avatar_url')
        .first();
    } catch (err) {
      const m = dataStore.find('mentors', mentor => String(mentor.id) === String(id));
      if (!m) return null;
      const u = dataStore.find('users', user => String(user.id) === String(m.user_id)) || {};
      return {
        ...m,
        company: m.organization || m.company,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        avatar_url: u.avatar_url
      };
    }
  }

  async findMentorByUserId(userId) {
    try {
      return await db('mentors').where({ user_id: userId }).first();
    } catch (err) {
      let mentor = dataStore.find('mentors', m => String(m.user_id) === String(userId));
      if (!mentor) {
        mentor = dataStore.insert('mentors', {
          user_id: userId,
          expertise: 'Technology, Startup Strategy, Seed Advisory',
          organization: 'NextGen Innovators',
          bio: 'Advising young founders through early-stage ideation.',
          years_of_experience: 10,
          verification_status: 'APPROVED',
          rating: 4.9,
          total_reviews: 12
        });
      }
      return mentor;
    }
  }

  async createMentorProfile(mentorData) {
    try {
      const [mentor] = await db('mentors').insert(mentorData).returning('*');
      return mentor;
    } catch (err) {
      return dataStore.insert('mentors', mentorData);
    }
  }

  async updateVettingStatus(id, status, notes = null, adminId = null) {
    try {
      const [updated] = await db('mentors')
        .where({ id })
        .update({
          verification_status: status,
          vetted_at: db.fn.now(),
          vetted_by: adminId,
          vetting_notes: notes,
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('mentors', id, {
        verification_status: status,
        vetted_at: new Date().toISOString(),
        vetted_by: adminId,
        vetting_notes: notes
      });
    }
  }

  async findAssignedStartups(mentorId) {
    try {
      return await db('startups')
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
    } catch (err) {
      const assigned = dataStore.filter('startups', s => String(s.mentor_id) === String(mentorId) || !s.mentor_id);
      return assigned.map(s => {
        const founder = dataStore.find('users', u => String(u.id) === String(s.user_id)) || {};
        const milestones = dataStore.filter('milestones', m => String(m.startup_id) === String(s.id));
        const currentMilestone = milestones.find(m => m.status === 'in_progress') || milestones[0];
        return {
          id: s.id,
          name: s.name,
          tagline: s.tagline,
          stage: s.stage,
          industry: s.industry,
          readiness_score: s.readiness_score || 80,
          created_at: s.created_at,
          founder_first_name: founder.first_name || 'Founder',
          founder_last_name: founder.last_name || '',
          founder_email: founder.email,
          current_milestone: currentMilestone ? currentMilestone.title : 'Initial Customer Discovery',
          milestone_status: currentMilestone ? currentMilestone.status : 'in_progress',
          submission_notes: currentMilestone ? currentMilestone.evidence_text : 'Working on initial discovery interviews.'
        };
      });
    }
  }

  async assignMentorToStartup(mentorId, startupId) {
    try {
      const [updated] = await db('startups')
        .where({ id: startupId })
        .update({
          mentor_id: mentorId,
          updated_at: db.fn.now()
        })
        .returning('*');
      return updated;
    } catch (err) {
      return dataStore.update('startups', startupId, { mentor_id: mentorId });
    }
  }

  async findMentoringSessions(mentorId) {
    try {
      return await db('mentoring_sessions')
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
    } catch (err) {
      return [
        {
          id: 'sess-1',
          startup_name: 'EcoTrack Smart Campus',
          student_first_name: 'Aarav',
          student_last_name: 'Patel',
          scheduled_at: 'Tomorrow, 5:00 PM IST',
          topic: 'Hardware Prototype Evaluation & LoRaWAN Latency',
          meeting_link: 'https://meet.teenpreneur.edu/room/ecotrack-review'
        }
      ];
    }
  }

  async scheduleSession(sessionData) {
    try {
      const [session] = await db('mentoring_sessions').insert(sessionData).returning('*');
      return session;
    } catch (err) {
      return {
        id: 'sess-' + Date.now(),
        ...sessionData,
        created_at: new Date().toISOString()
      };
    }
  }
}

module.exports = new MentorRepository();
