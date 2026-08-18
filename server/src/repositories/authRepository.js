const { db } = require('../config/database');

class AuthRepository {
  async findByEmail(email) {
    return db('users').where({ email: email.toLowerCase() }).first();
  }

  async findById(id) {
    return db('users')
      .where({ id })
      .select('id', 'email', 'role', 'status', 'first_name', 'last_name', 'phone', 'avatar_url', 'created_at')
      .first();
  }

  async createUser(userData, trx = null) {
    const query = (trx || db)('users').insert({
      ...userData,
      email: userData.email.toLowerCase()
    }).returning('*');

    const [user] = await query;
    return user;
  }

  async createStudentProfile(profileData, trx = null) {
    const query = (trx || db)('students').insert(profileData).returning('*');
    const [student] = await query;
    return student;
  }

  async createGuardianProfile(profileData, trx = null) {
    const query = (trx || db)('guardians').insert(profileData).returning('*');
    const [guardian] = await query;
    return guardian;
  }

  async createMentorProfile(profileData, trx = null) {
    const query = (trx || db)('mentors').insert(profileData).returning('*');
    const [mentor] = await query;
    return mentor;
  }

  async createGuardianStudentLink(linkData, trx = null) {
    const query = (trx || db)('guardian_student_links').insert(linkData).returning('*');
    const [link] = await query;
    return link;
  }

  async findLinkByToken(token) {
    return db('guardian_student_links')
      .where({ approval_token: token })
      .first();
  }

  async updateLinkStatus(id, status, trx = null) {
    return (trx || db)('guardian_student_links')
      .where({ id })
      .update({
        status,
        approved_at: status === 'approved' ? new Date() : null,
        updated_at: new Date()
      });
  }

  async updateUserStatus(userId, status, trx = null) {
    return (trx || db)('users')
      .where({ id: userId })
      .update({ status, updated_at: new Date() });
  }

  async recordLoginSuccess(userId) {
    return db('users')
      .where({ id: userId })
      .update({
        failed_login_attempts: 0,
        locked_until: null,
        last_login: new Date()
      });
  }

  async recordLoginFailure(userId, currentAttempts) {
    const newAttempts = (currentAttempts || 0) + 1;
    const updateData = { failed_login_attempts: newAttempts };

    if (newAttempts >= 5) {
      updateData.locked_until = new Date(Date.now() + 15 * 60 * 1000);
    }

    return db('users').where({ id: userId }).update(updateData);
  }

  async createAuditLog(userId, action, entityType = null, entityId = null, details = null, ipAddress = null) {
    return db('audit_logs').insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details ? JSON.stringify(details) : null,
      ip_address: ipAddress,
      created_at: new Date()
    });
  }
}

module.exports = new AuthRepository();
