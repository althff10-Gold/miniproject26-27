import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Shield, Users, ShieldAlert, CheckCircle, ArrowRight, BookOpen, MessageSquare } from 'lucide-react';

export default function UserPortalBanner({ onOpenConsentModal, onOpenGuardianDashboard, onOpenStudentDashboard, onOpenMentorDashboard }) {
  const { user } = useAuth();
  if (!user) return null;

  const roleMeta = {
    student: {
      color: '#818cf8',
      title: 'Student Founder Workspace',
      badge: 'Young Innovator Track',
      icon: Rocket,
      nextStep: 'Ready to build your idea? Explore the Incubation Tracks below or start drafting your startup canvas.'
    },
    guardian: {
      color: '#22d3ee',
      title: 'Guardian Oversight Portal',
      badge: 'Parental Supervision Active',
      icon: Shield,
      nextStep: 'You have full read-only oversight over your linked child’s progress and mentor communications.'
    },
    mentor: {
      color: '#fbbf24',
      title: 'Industry Mentor Desk',
      badge: 'Verified Mentor Workspace',
      icon: Users,
      nextStep: 'Review assigned student startup milestones or evaluate submissions for upcoming pitch demo days.'
    },
    admin: {
      color: '#f43f5e',
      title: 'Platform Safety & Admin Console',
      badge: 'Full Governance Access',
      icon: ShieldAlert,
      nextStep: 'Inspect real-time telemetry, moderate flagged messages, and verify new mentor credential uploads.'
    }
  };

  const meta = roleMeta[user.role] || roleMeta.student;
  const Icon = meta.icon;

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '24px auto 0',
      padding: '0 24px'
    }}>
      <div className="glass-card" style={{
        padding: '28px 36px',
        borderLeft: `4px solid ${meta.color}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: `${meta.color}18`,
            border: `1px solid ${meta.color}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={28} color={meta.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                Welcome back, {user.firstName} {user.lastName}!
              </h2>
              <span className="badge" style={{ backgroundColor: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}35` }}>
                {meta.badge}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {meta.nextStep}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user.role === 'guardian' && (
            <>
              <button
                onClick={onOpenConsentModal}
                className="btn btn-secondary"
                style={{ fontSize: '0.88rem', padding: '9px 16px' }}
              >
                Verify Child Token
              </button>
              <button
                onClick={onOpenGuardianDashboard}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem', padding: '9px 18px' }}
              >
                Guardian Dashboard
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {user.role === 'student' && (
            <button
              onClick={onOpenStudentDashboard}
              className="btn btn-primary"
              style={{ fontSize: '0.88rem', padding: '9px 18px' }}
            >
              Open Student Studio
              <ArrowRight size={16} />
            </button>
          )}

          {user.role === 'mentor' && (
            <button
              onClick={onOpenMentorDashboard}
              className="btn btn-primary"
              style={{ fontSize: '0.88rem', padding: '9px 18px', background: '#6366f1' }}
            >
              Open Mentor Workspace
              <ArrowRight size={16} />
            </button>
          )}

          {user.role !== 'guardian' && user.role !== 'student' && user.role !== 'mentor' && (
            <a
              href="#tracks"
              className="btn btn-primary"
              style={{ fontSize: '0.88rem', padding: '9px 18px' }}
            >
              Explore Workspace
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
