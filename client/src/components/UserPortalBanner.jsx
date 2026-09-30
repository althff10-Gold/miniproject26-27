import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Shield, Users, ShieldAlert, CheckCircle, ArrowRight, BookOpen, MessageSquare, Award } from 'lucide-react';

export default function UserPortalBanner({
  onOpenConsentModal,
  onOpenGuardianDashboard,
  onOpenStudentDashboard,
  onOpenMentorDashboard,
  onOpenAdminDashboard,
  onOpenLms,
  onOpenPitch,
  onOpenChat
}) {
  const { user } = useAuth();
  if (!user) return null;

  const roleMeta = {
    student: {
      color: '#818cf8',
      title: 'Student Founder Workspace',
      badge: 'Young Innovator Track',
      icon: Rocket,
      nextStep: 'Ready to build your idea? Explore incubation tracks, evaluate business ideas with AI, or enter the Demo Day competition.'
    },
    guardian: {
      color: '#22d3ee',
      title: 'Guardian Oversight Portal',
      badge: 'Parental Supervision Active',
      icon: Shield,
      nextStep: 'You have full read-only oversight over your linked child’s progress, milestones, and mentor communications.'
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
      title: 'Platform Safety & Governance Console',
      badge: 'Full Governance Access',
      icon: ShieldAlert,
      nextStep: 'Inspect real-time telemetry, approve mentor applications, and review AI content moderation flags.'
    }
  };

  const meta = roleMeta[user.role] || roleMeta.student;
  const Icon = meta.icon;

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '20px auto 0',
      padding: '0 24px'
    }}>
      <div className="glass-card" style={{
        padding: '24px 32px',
        borderLeft: `4px solid ${meta.color}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: `${meta.color}18`,
            border: `1px solid ${meta.color}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={26} color={meta.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                Welcome back, {user.firstName} {user.lastName}!
              </h2>
              <span className="badge" style={{ backgroundColor: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}35` }}>
                {meta.badge}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {meta.nextStep}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {user.role === 'guardian' && (
            <>
              <button
                onClick={onOpenConsentModal}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              >
                Verify Child Token
              </button>
              <button
                onClick={onOpenGuardianDashboard}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
              >
                Guardian Oversight
                <ArrowRight size={15} />
              </button>
            </>
          )}

          {user.role === 'student' && (
            <>
              <button
                onClick={onOpenStudentDashboard}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
              >
                Open Student Studio
                <ArrowRight size={15} />
              </button>
              <button
                onClick={onOpenLms}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <BookOpen size={14} />
                LMS Academy
              </button>
            </>
          )}

          {user.role === 'mentor' && (
            <>
              <button
                onClick={onOpenMentorDashboard}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 16px', background: '#6366f1' }}
              >
                Mentor Workspace
                <ArrowRight size={15} />
              </button>
              <button
                onClick={onOpenPitch}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Award size={14} />
                Judge Demo Day
              </button>
            </>
          )}

          {user.role === 'admin' && (
            <button
              onClick={onOpenAdminDashboard}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '8px 18px', background: '#f43f5e', borderColor: '#f43f5e' }}
            >
              <ShieldAlert size={15} />
              Open Admin Console
              <ArrowRight size={15} />
            </button>
          )}

          <button
            onClick={onOpenChat}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <MessageSquare size={14} />
            Supervised Chat
          </button>
        </div>
      </div>
    </div>
  );
}
