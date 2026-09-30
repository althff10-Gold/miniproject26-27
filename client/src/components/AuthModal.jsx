import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Shield, Briefcase, Calendar, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', initialRole = 'student' }) {
  if (!isOpen) return null;

  const { login, demoLogin, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Role specific states
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('10th Grade');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [relationshipType, setRelationshipType] = useState('Parent');
  const [company, setCompany] = useState('');
  const [expertiseAreas, setExpertiseAreas] = useState('Technology & Software');
  const [yearsExperience, setYearsExperience] = useState(5);

  const handleDemoClick = async (demoRole) => {
    setLoading(true);
    setError(null);
    try {
      await demoLogin(demoRole);
      onClose();
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (mode === 'login') {
        await login(email, password);
        onClose();
      } else {
        const payload = {
          email: email.trim(),
          password,
          role,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim() || undefined,
          dateOfBirth: role === 'student' && dateOfBirth ? dateOfBirth : undefined,
          schoolName: role === 'student' && schoolName.trim() ? schoolName.trim() : undefined,
          gradeLevel: role === 'student' ? gradeLevel : undefined,
          guardianEmail: role === 'student' && guardianEmail.trim() ? guardianEmail.trim() : undefined,
          relationshipType: role === 'guardian' ? relationshipType : undefined,
          company: role === 'mentor' && company.trim() ? company.trim() : undefined,
          expertiseAreas: role === 'mentor' ? expertiseAreas : undefined,
          yearsExperience: role === 'mentor' ? Number(yearsExperience) : undefined
        };

        const res = await register(payload);
        if (res.requiresGuardianConsent) {
          setSuccessMessage('Account created! A parental authorization confirmation link has been issued to your guardian.');
        } else {
          setSuccessMessage('Registration successful! Welcome to TeenPreneur Hub.');
          setTimeout(() => onClose(), 1500);
        }
      }
    } catch (err) {
      const apiErr = err.response?.data?.error;
      const errorMsg = apiErr?.message || apiErr?.summary || err.response?.data?.message || err.message || 'Authentication operation failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '36px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {mode === 'login' 
              ? 'Log in to access your incubation portal and projects'
              : 'Join the premier student startup incubator'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner (Available in Login Mode) */}
        {mode === 'login' && (
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818cf8', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={14} />
              1-CLICK DEMO TEST ACCOUNTS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleDemoClick('student')}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 10px' }}
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('guardian')}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 10px' }}
              >
                Guardian Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('mentor')}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 10px' }}
              >
                Mentor Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('admin')}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 10px' }}
              >
                Admin Demo
              </button>
            </div>
          </div>
        )}

        {/* Role Selector (in Register Mode) */}
        {mode === 'register' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '22px'
          }}>
            {[
              { id: 'student', label: 'Student', sub: 'Ages 13-19' },
              { id: 'guardian', label: 'Guardian', sub: 'Parent' },
              { id: 'mentor', label: 'Mentor', sub: 'Industry' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: role === r.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: role === r.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                  color: role === r.id ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{r.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>{r.sub}</div>
              </button>
            ))}
          </div>
        )}

        {/* Feedback Alerts */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Aarav"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          {/* Student Specific Fields */}
          {mode === 'register' && role === 'student' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Date of Birth (COPPA Age Verification)
                </label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Parent / Guardian Email (Required for minors under 18)
                </label>
                <input
                  type="email"
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="parent@domain.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '4px', display: 'block' }}>
                  A secure authorization link will be sent to your parent for COPPA consent.
                </span>
              </div>
            </>
          )}

          {/* Mentor Specific Fields */}
          {mode === 'register' && role === 'mentor' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Current Organization / Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, TechVentures, University"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Primary Expertise Domain
                </label>
                <input
                  type="text"
                  value={expertiseAreas}
                  onChange={(e) => setExpertiseAreas(e.target.value)}
                  placeholder="e.g. AI, CleanTech, EdTech, Product Management"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '10px' }}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Complete Registration'}
          </button>
        </form>

        {/* Mode Switcher */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
