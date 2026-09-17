const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class GuardianRepository {
  async findByUserId(userId) {
    try {
      return await db('guardians').where({ user_id: userId }).first();
    } catch (err) {
      let guardian = dataStore.find('guardians', g => String(g.user_id) === String(userId));
      if (!guardian) {
        guardian = dataStore.insert('guardians', {
          user_id: userId,
          relationship: 'Parent/Guardian',
          occupation: 'Parent & Advocate'
        });
      }
      return guardian;
    }
  }

  async findLinkedStudents(guardianId) {
    try {
      return await db('guardian_student_links as gsl')
        .join('students as s', 'gsl.student_id', 's.id')
        .join('users as u', 's.user_id', 'u.id')
        .where('gsl.guardian_id', guardianId)
        .select(
          'gsl.id as link_id',
          'gsl.status as consent_status',
          'gsl.approval_token',
          'gsl.approved_at',
          's.id as student_id',
          's.date_of_birth',
          's.school_name',
          's.grade_level',
          'u.id as user_id',
          'u.first_name',
          'u.last_name',
          'u.email',
          'u.status as account_status',
          'u.created_at as registered_at'
        );
    } catch (err) {
      const links = dataStore.filter('guardian_student_links', l => String(l.guardian_id) === String(guardianId));
      return links.map(link => {
        const student = dataStore.find('students', s => String(s.id) === String(link.student_id)) || {};
        const user = dataStore.find('users', u => String(u.id) === String(student.user_id)) || {};
        return {
          link_id: link.id,
          consent_status: link.status,
          approval_token: link.approval_token,
          approved_at: link.approved_at,
          student_id: student.id,
          date_of_birth: student.date_of_birth,
          school_name: student.school_name,
          grade_level: student.grade_level,
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          account_status: user.status,
          registered_at: user.created_at
        };
      });
    }
  }

  async getChildStartups(studentId) {
    try {
      return await db('startups')
        .where({ student_id: studentId })
        .select('id', 'name', 'tagline', 'industry', 'stage', 'created_at');
    } catch (err) {
      return dataStore.filter('startups', s => String(s.student_id) === String(studentId));
    }
  }

  async getChildActivityStream(userId) {
    try {
      return await db('audit_logs')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc')
        .limit(20)
        .select('id', 'action', 'entity_type', 'details', 'created_at');
    } catch (err) {
      return dataStore.filter('audit_logs', a => String(a.user_id) === String(userId))
        .slice(0, 20);
    }
  }

  async getChildConversations(userId) {
    try {
      return await db('conversation_participants as cp')
        .join('conversations as c', 'cp.conversation_id', 'c.id')
        .where('cp.user_id', userId)
        .select('c.id', 'c.title', 'c.type', 'c.created_at', 'c.updated_at');
    } catch (err) {
      const parts = dataStore.filter('conversation_participants', cp => String(cp.user_id) === String(userId));
      return parts.map(p => {
        const c = dataStore.find('conversations', conv => String(conv.id) === String(p.conversation_id));
        return c || { id: p.conversation_id, title: 'Mentorship Chat', type: 'mentorship' };
      });
    }
  }

  async getConversationMessages(conversationId) {
    try {
      return await db('messages as m')
        .join('users as u', 'm.sender_id', 'u.id')
        .where('m.conversation_id', conversationId)
        .orderBy('m.created_at', 'asc')
        .select(
          'm.id',
          'm.content as message_text',
          'm.is_flagged',
          'm.created_at',
          'u.id as sender_id',
          'u.first_name',
          'u.last_name',
          'u.role as sender_role'
        );
    } catch (err) {
      const msgs = dataStore.filter('messages', m => String(m.conversation_id) === String(conversationId) || String(m.channel_id) === String(conversationId));
      return msgs.map(m => {
        const u = dataStore.find('users', user => String(user.id) === String(m.sender_id)) || {};
        return {
          id: m.id,
          message_text: m.content || m.message_text,
          is_flagged: m.is_flagged || false,
          created_at: m.created_at,
          sender_id: u.id || m.sender_id,
          first_name: u.first_name || m.sender_name?.split(' ')[0] || 'User',
          last_name: u.last_name || m.sender_name?.split(' ')[1] || '',
          sender_role: u.role || m.sender_role || 'student'
        };
      });
    }
  }

  async updateConsent(linkId, status) {
    try {
      return await db('guardian_student_links')
        .where({ id: linkId })
        .update({
          status,
          approved_at: status === 'approved' ? new Date() : null,
          updated_at: new Date()
        });
    } catch (err) {
      return dataStore.update('guardian_student_links', linkId, {
        status,
        approved_at: status === 'approved' ? new Date().toISOString() : null
      });
    }
  }
}

module.exports = new GuardianRepository();
