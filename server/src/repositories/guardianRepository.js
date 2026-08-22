const { db } = require('../config/database');

class GuardianRepository {
  /**
   * Find guardian record by user ID
   */
  async findByUserId(userId) {
    return db('guardians').where({ user_id: userId }).first();
  }

  /**
   * Find all children linked to a guardian
   */
  async findLinkedStudents(guardianId) {
    return db('guardian_student_links as gsl')
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
  }

  /**
   * Get child's active startup and milestone information
   */
  async getChildStartups(studentId) {
    return db('startups')
      .where({ student_id: studentId })
      .select('id', 'name', 'tagline', 'industry', 'stage', 'created_at');
  }

  /**
   * Get child's recent activity stream from audit logs
   */
  async getChildActivityStream(userId) {
    return db('audit_logs')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(20)
      .select('id', 'action', 'entity_type', 'details', 'created_at');
  }

  /**
   * Get child's conversations for supervised oversight
   */
  async getChildConversations(userId) {
    return db('conversation_participants as cp')
      .join('conversations as c', 'cp.conversation_id', 'c.id')
      .where('cp.user_id', userId)
      .select('c.id', 'c.title', 'c.type', 'c.created_at', 'c.updated_at');
  }

  /**
   * Get messages inside a child's conversation with moderation flags
   */
  async getConversationMessages(conversationId) {
    return db('messages as m')
      .join('users as u', 'm.sender_id', 'u.id')
      .where('m.conversation_id', conversationId)
      .orderBy('m.created_at', 'asc')
      .select(
        'm.id',
        'm.message_text',
        'm.is_flagged',
        'm.created_at',
        'u.id as sender_id',
        'u.first_name',
        'u.last_name',
        'u.role as sender_role'
      );
  }

  /**
   * Update consent status for linked student
   */
  async updateConsent(linkId, status) {
    return db('guardian_student_links')
      .where({ id: linkId })
      .update({
        status,
        approved_at: status === 'approved' ? new Date() : null,
        updated_at: new Date()
      });
  }
}

module.exports = new GuardianRepository();
