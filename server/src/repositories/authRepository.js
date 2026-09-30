const { db } = require('../config/database');
const logger = require('../config/logger');
const dataStore = require('../database/dataStore');

class AuthRepository {
  async findByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    try {
      return await db('users').where({ email: cleanEmail }).first();
    } catch (err) {
      return dataStore.find('users', u => u.email.toLowerCase() === cleanEmail);
    }
  }

  async findById(id) {
    try {
      return await db('users')
        .where({ id })
        .select('id', 'email', 'role', 'status', 'first_name', 'last_name', 'phone', 'avatar_url', 'created_at')
        .first();
    } catch (err) {
      const u = dataStore.find('users', user => String(user.id) === String(id));
      if (!u) return null;
      return {
        id: u.id,
        email: u.email,
        role: u.role,
        status: u.status,
        first_name: u.first_name,
        last_name: u.last_name,
        phone: u.phone,
        avatar_url: u.avatar_url,
        created_at: u.created_at
      };
    }
  }

  async createUser(userData, trx = null) {
    const cleanEmail = userData.email.toLowerCase().trim();
    try {
      const query = (trx || db)('users').insert({
        ...userData,
        email: cleanEmail
      }).returning('*');
      const [user] = await query;
      return user;
    } catch (err) {
      logger.warn(`PostgreSQL offline: registering ${cleanEmail} to persistent local store`);
      return dataStore.insert('users', {
        id: 'usr-' + Date.now(),
        ...userData,
        email: cleanEmail,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: new Date().toISOString()
      });
    }
  }

  async createStudentProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('students').insert(profileData).returning('*');
      const [student] = await query;
      return student;
    } catch (err) {
      return dataStore.insert('students', {
        ...profileData,
        created_at: new Date().toISOString()
      });
    }
  }

  async createGuardianProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('guardians').insert(profileData).returning('*');
      const [guardian] = await query;
      return guardian;
    } catch (err) {
      return dataStore.insert('guardians', {
        ...profileData,
        created_at: new Date().toISOString()
      });
    }
  }

  async createMentorProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('mentors').insert(profileData).returning('*');
      const [mentor] = await query;
      return mentor;
    } catch (err) {
      return dataStore.insert('mentors', {
        ...profileData,
        created_at: new Date().toISOString()
      });
    }
  }

  async createGuardianStudentLink(linkData, trx = null) {
    try {
      const query = (trx || db)('guardian_student_links').insert(linkData).returning('*');
      const [link] = await query;
      return link;
    } catch (err) {
      return dataStore.insert('guardian_student_links', {
        ...linkData,
        created_at: new Date().toISOString()
      });
    }
  }

  async findLinkByToken(token) {
    try {
      return await db('guardian_student_links')
        .where({ approval_token: token })
        .first();
    } catch (err) {
      return dataStore.find('guardian_student_links', l => l.approval_token === token);
    }
  }

  async updateLinkStatus(id, status, trx = null) {
    try {
      return await (trx || db)('guardian_student_links')
        .where({ id })
        .update({
          status,
          approved_at: status === 'approved' ? new Date() : null,
          updated_at: new Date()
        });
    } catch (err) {
      dataStore.update('guardian_student_links', id, {
        status,
        approved_at: status === 'approved' ? new Date().toISOString() : null
      });
      return 1;
    }
  }

  async updateUserStatus(userId, status, trx = null) {
    try {
      return await (trx || db)('users')
        .where({ id: userId })
        .update({ status, updated_at: new Date() });
    } catch (err) {
      dataStore.update('users', userId, { status });
      return 1;
    }
  }

  async recordLoginSuccess(userId) {
    try {
      return await db('users')
        .where({ id: userId })
        .update({
          failed_login_attempts: 0,
          locked_until: null,
          last_login: new Date()
        });
    } catch (err) {
      dataStore.update('users', userId, {
        failed_login_attempts: 0,
        locked_until: null,
        last_login: new Date().toISOString()
      });
      return 1;
    }
  }

  async recordLoginFailure(userId, currentAttempts) {
    const newAttempts = (currentAttempts || 0) + 1;
    try {
      const updateData = { failed_login_attempts: newAttempts };
      if (newAttempts >= 5) {
        updateData.locked_until = new Date(Date.now() + 15 * 60 * 1000);
      }
      return await db('users').where({ id: userId }).update(updateData);
    } catch (err) {
      const updateData = { failed_login_attempts: newAttempts };
      if (newAttempts >= 5) {
        updateData.locked_until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }
      dataStore.update('users', userId, updateData);
      return 1;
    }
  }

  async createAuditLog(userId, action, entityType = null, entityId = null, details = null, ipAddress = null) {
    try {
      return await db('audit_logs').insert({
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details: details ? JSON.stringify(details) : null,
        ip_address: ipAddress,
        created_at: new Date()
      });
    } catch (err) {
      dataStore.insert('audit_logs', {
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details: details ? (typeof details === 'string' ? details : JSON.stringify(details)) : null,
        ip_address: ipAddress
      });
      return 1;
    }
  }
}

module.exports = new AuthRepository();
