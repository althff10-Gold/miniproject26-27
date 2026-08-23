const guardianRepository = require('../repositories/guardianRepository');
const authRepository = require('../repositories/authRepository');
const { USER_STATUS, AUDIT_ACTIONS } = require('../config/constants');
const ApiError = require('../utils/ApiError');
const { db } = require('../config/database');

class GuardianService {
  /**
   * Get all linked children with startup and consent summaries
   */
  async getLinkedChildren(userId) {
    const guardian = await guardianRepository.findByUserId(userId);
    if (!guardian) {
      throw ApiError.notFound('Guardian profile not found');
    }

    const students = await guardianRepository.findLinkedStudents(guardian.id);

    // Enrich with startup summaries
    const enriched = await Promise.all(
      students.map(async (child) => {
        const startups = await guardianRepository.getChildStartups(child.student_id);
        return {
          ...child,
          startups
        };
      })
    );

    return enriched;
  }

  /**
   * Update parental consent decision for a linked child
   */
  async updateConsent(userId, linkId, decision) {
    const guardian = await guardianRepository.findByUserId(userId);
    if (!guardian) {
      throw ApiError.notFound('Guardian profile not found');
    }

    const link = await db('guardian_student_links')
      .where({ id: linkId, guardian_id: guardian.id })
      .first();

    if (!link) {
      throw ApiError.notFound('Consent record not found for this guardian');
    }

    const status = decision === 'approved' ? 'approved' : 'rejected';
    await guardianRepository.updateConsent(linkId, status);

    const student = await db('students').where({ id: link.student_id }).first();
    if (student) {
      const newAccountStatus = status === 'approved' ? USER_STATUS.ACTIVE : USER_STATUS.PENDING;
      await authRepository.updateUserStatus(student.user_id, newAccountStatus);

      // Create audit log
      await authRepository.createAuditLog(
        userId,
        status === 'approved' ? AUDIT_ACTIONS.GUARDIAN_APPROVE : AUDIT_ACTIONS.GUARDIAN_REJECT,
        'guardian_student_links',
        linkId,
        { studentId: student.id, decision: status }
      );
    }

    return {
      linkId,
      decision: status,
      message: status === 'approved' 
        ? 'Parental authorization granted! Student account is now active.'
        : 'Parental authorization declined. Student account remains pending.'
    };
  }

  /**
   * Get child activity audit stream
   */
  async getChildActivity(userId, studentId) {
    const guardian = await guardianRepository.findByUserId(userId);
    if (!guardian) throw ApiError.notFound('Guardian not found');

    const link = await db('guardian_student_links')
      .where({ guardian_id: guardian.id, student_id: studentId })
      .first();

    if (!link) throw ApiError.forbidden('You are not authorized to view this student’s activity');

    const student = await db('students').where({ id: studentId }).first();
    const activity = await guardianRepository.getChildActivityStream(student.user_id);
    return activity;
  }

  /**
   * Get child's supervised conversations
   */
  async getChildConversations(userId, studentId) {
    const guardian = await guardianRepository.findByUserId(userId);
    if (!guardian) throw ApiError.notFound('Guardian not found');

    const link = await db('guardian_student_links')
      .where({ guardian_id: guardian.id, student_id: studentId })
      .first();

    if (!link) throw ApiError.forbidden('You are not authorized to view this student’s messages');

    const student = await db('students').where({ id: studentId }).first();
    const convos = await guardianRepository.getChildConversations(student.user_id);

    // Enrich conversations with recent messages and safety tags
    const enriched = await Promise.all(
      convos.map(async (c) => {
        const messages = await guardianRepository.getConversationMessages(c.id);
        return {
          ...c,
          messages
        };
      })
    );

    return enriched;
  }
}

module.exports = new GuardianService();
