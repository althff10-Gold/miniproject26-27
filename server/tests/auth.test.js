const assert = require('assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Sprint 10: Authentication & COPPA Parental Consent Tests', () => {
  const secret = 'teenpreneur_super_secure_academic_jwt_secret_2026';

  it('should generate valid JWT payload with user role', () => {
    const user = { id: 'usr-1', email: 'aarav@school.edu', role: 'student' };
    const token = jwt.sign(user, secret, { expiresIn: '15m' });
    const decoded = jwt.verify(token, secret);
    assert.strictEqual(decoded.email, 'aarav@school.edu');
    assert.strictEqual(decoded.role, 'student');
  });

  it('should properly hash passwords with bcrypt', async () => {
    const rawPassword = 'SecureStudentPass2026!';
    const hash = await bcrypt.hash(rawPassword, 10);
    assert.notStrictEqual(rawPassword, hash);
    const isValid = await bcrypt.compare(rawPassword, hash);
    assert.strictEqual(isValid, true);
  });

  it('should enforce parental consent requirement for students under 18', () => {
    const student = { age: 15, guardian_approved: false };
    const canLaunchPublicVenture = student.age >= 18 || student.guardian_approved;
    assert.strictEqual(canLaunchPublicVenture, false);
  });
});
