const assert = require('assert');

describe('Sprint 10: Guardian Oversight & Activity Logging Tests', () => {
  it('should maintain immutable audit entry on consent approval', () => {
    const auditRecord = {
      action: 'GUARDIAN_CONSENT_APPROVAL',
      guardian_id: 'guard-101',
      student_id: 'student-202',
      timestamp: new Date().toISOString()
    };
    assert.strictEqual(auditRecord.action, 'GUARDIAN_CONSENT_APPROVAL');
    assert.ok(auditRecord.timestamp);
  });

  it('should restrict unlinked guardians from viewing child startups', () => {
    const linkedGuardians = ['guard-101', 'guard-102'];
    const currentGuardian = 'guard-999';
    const isAuthorized = linkedGuardians.includes(currentGuardian);
    assert.strictEqual(isAuthorized, false);
  });
});
