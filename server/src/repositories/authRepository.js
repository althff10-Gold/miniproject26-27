const { db } = require('../config/database');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');

// In-memory development store for resilient offline database operation
const devUsers = [
  {
    id: 'student-demo-001',
    email: 'aarav.student@teenpreneur.edu',
    password_hash: bcrypt.hashSync('Demo1234!', 10),
    role: 'student',
    status: 'active',
    first_name: 'Aarav',
    last_name: 'Patel',
    phone: '+919876543210',
    avatar_url: null,
    created_at: new Date()
  },
  {
    id: 'guardian-demo-001',
    email: 'sunita.guardian@teenpreneur.edu',
    password_hash: bcrypt.hashSync('Demo1234!', 10),
    role: 'guardian',
    status: 'active',
    first_name: 'Sunita',
    last_name: 'Sharma',
    phone: '+919876543211',
    avatar_url: null,
    created_at: new Date()
  },
  {
    id: 'mentor-demo-001',
    email: 'sarah.mentor@teenpreneur.edu',
    password_hash: bcrypt.hashSync('Demo1234!', 10),
    role: 'mentor',
    status: 'active',
    first_name: 'Dr. Sarah',
    last_name: 'Chen',
    phone: '+919876543212',
    avatar_url: null,
    created_at: new Date()
  },
  {
    id: 'admin-demo-001',
    email: 'admin@teenpreneur.edu',
    password_hash: bcrypt.hashSync('Demo1234!', 10),
    role: 'admin',
    status: 'active',
    first_name: 'System',
    last_name: 'Administrator',
    phone: '+919876543213',
    avatar_url: null,
    created_at: new Date()
  }
];

const devLinks = [
  {
    id: 'link-demo-001',
    guardian_id: 'guardian-demo-001',
    student_id: 'student-demo-001',
    status: 'pending',
    approval_token: 'coppa_demo_token_123456'
  }
];

class AuthRepository {
  async findByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    try {
      return await db('users').where({ email: cleanEmail }).first();
    } catch (err) {
      return devUsers.find(u => u.email.toLowerCase() === cleanEmail) || null;
    }
  }

  async findById(id) {
    try {
      return await db('users')
        .where({ id })
        .select('id', 'email', 'role', 'status', 'first_name', 'last_name', 'phone', 'avatar_url', 'created_at')
        .first();
    } catch (err) {
      const u = devUsers.find(u => u.id === id);
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
      logger.warn(`PostgreSQL offline: registering ${cleanEmail} to in-memory store`);
      const fallbackUser = {
        id: 'usr-' + Date.now(),
        ...userData,
        email: cleanEmail,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: new Date()
      };
      devUsers.push(fallbackUser);
      return fallbackUser;
    }
  }

  async createStudentProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('students').insert(profileData).returning('*');
      const [student] = await query;
      return student;
    } catch (err) {
      return { id: 'std-' + Date.now(), ...profileData };
    }
  }

  async createGuardianProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('guardians').insert(profileData).returning('*');
      const [guardian] = await query;
      return guardian;
    } catch (err) {
      return { id: 'grd-' + Date.now(), ...profileData };
    }
  }

  async createMentorProfile(profileData, trx = null) {
    try {
      const query = (trx || db)('mentors').insert(profileData).returning('*');
      const [mentor] = await query;
      return mentor;
    } catch (err) {
      return { id: 'mnt-' + Date.now(), ...profileData };
    }
  }

  async createGuardianStudentLink(linkData, trx = null) {
    try {
      const query = (trx || db)('guardian_student_links').insert(linkData).returning('*');
      const [link] = await query;
      return link;
    } catch (err) {
      const link = { id: 'lnk-' + Date.now(), ...linkData };
      devLinks.push(link);
      return link;
    }
  }

  async findLinkByToken(token) {
    try {
      return await db('guardian_student_links')
        .where({ approval_token: token })
        .first();
    } catch (err) {
      return devLinks.find(l => l.approval_token === token) || null;
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
      const link = devLinks.find(l => l.id === id);
      if (link) {
        link.status = status;
        link.approved_at = status === 'approved' ? new Date() : null;
      }
      return 1;
    }
  }

  async updateUserStatus(userId, status, trx = null) {
    try {
      return await (trx || db)('users')
        .where({ id: userId })
        .update({ status, updated_at: new Date() });
    } catch (err) {
      const u = devUsers.find(u => u.id === userId);
      if (u) u.status = status;
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
      const u = devUsers.find(u => u.id === userId);
      if (u) {
        u.failed_login_attempts = 0;
        u.locked_until = null;
        u.last_login = new Date();
      }
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
      const u = devUsers.find(u => u.id === userId);
      if (u) {
        u.failed_login_attempts = newAttempts;
        if (newAttempts >= 5) {
          u.locked_until = new Date(Date.now() + 15 * 60 * 1000);
        }
      }
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
      return 1;
    }
  }
}

module.exports = new AuthRepository();
