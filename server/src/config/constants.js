/**
 * Application-wide constants and enums
 */
const ROLES = {
  STUDENT: 'student',
  GUARDIAN: 'guardian',
  MENTOR: 'mentor',
  ADMIN: 'admin'
};

const USER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DEACTIVATED: 'deactivated'
};

const GUARDIAN_LINK_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REVOKED: 'revoked'
};

const MENTOR_VERIFICATION_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

const STARTUP_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};

const STARTUP_STAGE = {
  IDEATION: 'ideation',
  VALIDATION: 'validation',
  DEVELOPMENT: 'development',
  LAUNCH: 'launch',
  GROWTH: 'growth'
};

const IDEA_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const MILESTONE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue'
};

const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

const COURSE_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

const PITCH_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  REVIEWED: 'reviewed'
};

const MESSAGE_FLAG_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  DISMISSED: 'dismissed',
  ACTIONED: 'actioned'
};

const FLAG_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

const MODERATION_ACTION_TYPE = {
  APPROVE: 'approve',
  DELETE: 'delete',
  WARN_USER: 'warn_user',
  SUSPEND_USER: 'suspend_user'
};

const NOTIFICATION_TYPE = {
  GUARDIAN_APPROVAL: 'guardian_approval',
  MENTOR_VERIFICATION: 'mentor_verification',
  MENTOR_ASSIGNMENT: 'mentor_assignment',
  MESSAGE_FLAGGED: 'message_flagged',
  PITCH_EVENT: 'pitch_event',
  PITCH_FEEDBACK: 'pitch_feedback',
  MILESTONE_UPDATE: 'milestone_update',
  COURSE_COMPLETION: 'course_completion',
  SYSTEM: 'system',
  ACCOUNT_STATUS: 'account_status'
};

const CONVERSATION_TYPE = {
  DIRECT: 'direct',
  GROUP: 'group',
  MENTORSHIP: 'mentorship'
};

const ASSIGNMENT_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

module.exports = {
  ROLES,
  USER_STATUS,
  GUARDIAN_LINK_STATUS,
  MENTOR_VERIFICATION_STATUS,
  STARTUP_STATUS,
  STARTUP_STAGE,
  IDEA_STATUS,
  MILESTONE_STATUS,
  COURSE_STATUS,
  COURSE_DIFFICULTY,
  EVENT_STATUS,
  PITCH_STATUS,
  MESSAGE_FLAG_STATUS,
  FLAG_SEVERITY,
  MODERATION_ACTION_TYPE,
  NOTIFICATION_TYPE,
  CONVERSATION_TYPE,
  ASSIGNMENT_STATUS
};
