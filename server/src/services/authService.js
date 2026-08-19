const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authRepository = require('../repositories/authRepository');
const { jwt: jwtConfig, security } = require('../config/auth');
const { ROLES, USER_STATUS, AUDIT_ACTIONS } = require('../config/constants');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { db } = require('../config/database');

class AuthService {
  async register(registrationData, ipAddress = null) {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      schoolName,
      gradeLevel,
      guardianEmail,
      relationshipType,
      expertiseAreas,
      yearsExperience,
      company
    } = registrationData;

    const existing = await authRepository.findByEmail(email);
    if (existing) {
      throw ApiError.conflict('An account with this email address already exists');
    }

    const passwordHash = await bcrypt.hash(password, security.bcryptRounds);

    let initialStatus = USER_STATUS.ACTIVE;
    let isMinor = false;

    if (role === ROLES.STUDENT) {
      if (!dateOfBirth) {
        throw ApiError.badRequest('Date of birth is required for student registration');
      }

      const birthDate = new Date(dateOfBirth);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

      if (calculatedAge < 13) {
        throw ApiError.forbidden('Students under 13 years of age cannot register without direct school institutional partnership');
      }

      if (calculatedAge < 18) {
        isMinor = true;
        initialStatus = USER_STATUS.PENDING;
        if (!guardianEmail) {
          throw ApiError.badRequest('Students under 18 must provide a valid guardian email address for parental authorization');
        }
      }
    }

    if (role === ROLES.MENTOR) {
      initialStatus = USER_STATUS.PENDING;
    }

    return await db.transaction(async (trx) => {
      const newUser = await authRepository.createUser({
        email,
        password_hash: passwordHash,
        role,
        status: initialStatus,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null
      }, trx);

      if (role === ROLES.STUDENT) {
        const studentProfile = await authRepository.createStudentProfile({
          user_id: newUser.id,
          date_of_birth: dateOfBirth,
          school_name: schoolName || null,
          grade_level: gradeLevel || null
        }, trx);

        if (isMinor) {
          let guardianUser = await authRepository.findByEmail(guardianEmail);
          let guardianProfileId;

          if (!guardianUser) {
            const tempPassword = await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10);
            guardianUser = await authRepository.createUser({
              email: guardianEmail,
              password_hash: tempPassword,
              role: ROLES.GUARDIAN,
              status: USER_STATUS.PENDING,
              first_name: 'Guardian of',
              last_name: firstName
            }, trx);

            const gProfile = await authRepository.createGuardianProfile({
              user_id: guardianUser.id,
              relationship_type: 'Parent/Guardian'
            }, trx);
            guardianProfileId = gProfile.id;
          } else {
            const gProfile = await trx('guardians').where({ user_id: guardianUser.id }).first();
            guardianProfileId = gProfile ? gProfile.id : null;
          }

          if (guardianProfileId) {
            const approvalToken = crypto.randomBytes(32).toString('hex');
            await authRepository.createGuardianStudentLink({
              guardian_id: guardianProfileId,
              student_id: studentProfile.id,
              status: 'pending',
              approval_token: approvalToken
            }, trx);

            logger.info(`[COPPA] Generated parental authorization token for minor ${email}: ${approvalToken}`);
          }
        }
      } else if (role === ROLES.GUARDIAN) {
        await authRepository.createGuardianProfile({
          user_id: newUser.id,
          relationship_type: relationshipType || 'Parent/Guardian'
        }, trx);
      } else if (role === ROLES.MENTOR) {
        await authRepository.createMentorProfile({
          user_id: newUser.id,
          expertise_areas: expertiseAreas || 'General Entrepreneurship',
          years_experience: yearsExperience || 1,
          company: company || null,
          verification_status: 'pending'
        }, trx);
      }

      await authRepository.createAuditLog(
        newUser.id,
        AUDIT_ACTIONS.USER_REGISTER,
        'users',
        newUser.id,
        { role, isMinor },
        ipAddress
      );

      let tokens = null;
      if (initialStatus === USER_STATUS.ACTIVE) {
        tokens = this._generateTokens(newUser);
      }

      return {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          firstName: newUser.first_name,
          lastName: newUser.last_name
        },
        requiresGuardianConsent: isMinor,
        tokens
      };
    });
  }

  async login(email, password, ipAddress = null) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const remainingMinutes = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
      throw ApiError.forbidden(`Account temporarily locked due to multiple failed login attempts. Try again in ${remainingMinutes} minutes.`);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      await authRepository.recordLoginFailure(user.id, user.failed_login_attempts);
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (user.status === USER_STATUS.PENDING) {
      if (user.role === ROLES.STUDENT) {
        throw ApiError.forbidden('Your account is awaiting parental consent authorization before you can log in.');
      } else if (user.role === ROLES.MENTOR) {
        throw ApiError.forbidden('Your mentor application is currently undergoing administrator verification.');
      } else {
        throw ApiError.forbidden('Your account registration is currently pending review.');
      }
    }

    if (user.status === USER_STATUS.SUSPENDED) {
      throw ApiError.forbidden('This account has been suspended for terms violation. Please contact support.');
    }

    await authRepository.recordLoginSuccess(user.id);
    await authRepository.createAuditLog(user.id, AUDIT_ACTIONS.USER_LOGIN, 'users', user.id, null, ipAddress);

    const tokens = this._generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url
      },
      tokens
    };
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized('Refresh token is required');
    }

    try {
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
      const user = await authRepository.findById(decoded.id);

      if (!user || user.status !== USER_STATUS.ACTIVE) {
        throw ApiError.unauthorized('User not found or account inactive');
      }

      const tokens = this._generateTokens(user);
      return { user, tokens };
    } catch (err) {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }
  }

  async processGuardianApproval(token, decision = 'approved') {
    const link = await authRepository.findLinkByToken(token);
    if (!link) {
      throw ApiError.notFound('Invalid or expired parental consent token');
    }

    if (link.status !== 'pending') {
      throw ApiError.badRequest(`This consent request has already been ${link.status}`);
    }

    const newStatus = decision === 'approved' ? 'approved' : 'rejected';
    await authRepository.updateLinkStatus(link.id, newStatus);

    if (newStatus === 'approved') {
      const student = await db('students').where({ id: link.student_id }).first();
      if (student) {
        await authRepository.updateUserStatus(student.user_id, USER_STATUS.ACTIVE);
      }
    }

    return {
      success: true,
      decision: newStatus,
      message: newStatus === 'approved' 
        ? 'Parental authorization granted! The student account is now active.'
        : 'Parental consent declined. The student account remains inactive.'
    };
  }

  async getCurrentUser(userId) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    let roleData = null;
    if (user.role === ROLES.STUDENT) {
      roleData = await db('students').where({ user_id: userId }).first();
    } else if (user.role === ROLES.GUARDIAN) {
      roleData = await db('guardians').where({ user_id: userId }).first();
    } else if (user.role === ROLES.MENTOR) {
      roleData = await db('mentors').where({ user_id: userId }).first();
    }

    return { ...user, profile: roleData };
  }

  _generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn
    });

    return { accessToken, refreshToken, expiresIn: jwtConfig.expiresIn };
  }
}

module.exports = new AuthService();
