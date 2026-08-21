import React from 'react';
import { Rocket, ShieldCheck, Sparkles, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenAuth }) {
  return (
    <section style={{
      position: 'relative',
      padding: '80px 24px 70px',
      maxWidth: '1240px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      {/* Supervised Pill */}
      <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
        <span className="badge badge-primary animate-pulse-glow" style={{ padding: '6px 18px', fontSize: '0.82rem' }}>
          <ShieldCheck size={16} />
          COPPA-Compliant & Guardian Supervised Platform
        </span>
      </div>

      {/* Main Headline */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        maxWidth: '920px',
        margin: '0 auto 24px',
        lineHeight: 1.15
      }}>
        Launch Your First Startup <br />
        <span style={{
          background: 'linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Before You Graduate
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 40px',
        lineHeight: 1.6
      }}>
        The secure incubator platform built for ambitious students aged 13–19. Turn classroom ideas into real products with vetted industry mentors, parental oversight, and pitch grants.
      </p>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '50px'
      }}>
        <button
          onClick={() => onOpenAuth('register', 'student')}
          className="btn btn-primary"
          style={{ padding: '14px 28px', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' }}
        >
          <Rocket size={20} />
          Start as Student Founder
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => onOpenAuth('register', 'guardian')}
          className="btn btn-secondary"
          style={{ padding: '14px 26px', fontSize: '1.05rem' }}
        >
          <ShieldCheck size={20} color="#22d3ee" />
          Guardian Portal
        </button>

        <button
          onClick={() => onOpenAuth('register', 'mentor')}
          className="btn btn-secondary"
          style={{ padding: '14px 26px', fontSize: '1.05rem' }}
        >
          <Sparkles size={20} color="#fbbf24" />
          Become a Mentor
        </button>
      </div>

      {/* Trust Badges */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>Parental Consent Gate</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>AI-Powered Text Moderation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>Zero Unsupervised Chat</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>Verified Industry Leaders</span>
        </div>
      </div>
    </section>
  );
}
