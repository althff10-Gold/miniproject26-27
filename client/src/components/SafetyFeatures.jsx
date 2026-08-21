import React from 'react';
import { ShieldCheck, Eye, Cpu, FileCheck, Lock, AlertTriangle } from 'lucide-react';

export default function SafetyFeatures() {
  const safetyCards = [
    {
      icon: ShieldCheck,
      title: 'Parental Consent Gate',
      description: 'Minor student accounts remain in pending status until their legal guardian reviews and approves registration via single-use cryptographic token links.'
    },
    {
      icon: Cpu,
      title: 'Python NLP Moderation',
      description: 'Synchronous keyword filtering combined with Python NLP sentiment scanning automatically redacts phone numbers, social media handles, and profanity.'
    },
    {
      icon: Eye,
      title: 'Guardian Oversight Feed',
      description: 'Parents maintain dedicated read-only visibility into mentor communication logs, milestone evidence uploads, and course completion records.'
    },
    {
      icon: FileCheck,
      title: 'Vetted Mentor Verification',
      description: 'Mentors must submit professional credentials and government identity proof, subject to administrative review before engaging with minors.'
    },
    {
      icon: Lock,
      title: 'OWASP & COPPA Security',
      description: 'Bcrypt hashed credentials, short-lived JWT access tokens with rotation, IP rate limiters, and Helmet HTTP security headers.'
    },
    {
      icon: AlertTriangle,
      title: 'Admin Moderation Queue',
      description: 'Any flagged message or suspicious interaction is routed to a real-time safety dashboard with instant one-click suspension and warning capabilities.'
    }
  ];

  return (
    <section id="safety" style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '80px 24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge badge-green" style={{ marginBottom: '14px' }}>
          Child Safety Architecture
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
          Built Ground-Up for Adolescent Safety
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
          Traditional startup incubators lack child protection protocols. TeenPreneur Hub provides bank-grade security and supervisory controls so minors can build fearlessly.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {safetyCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={idx} className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <IconComponent size={24} color="#34d399" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
