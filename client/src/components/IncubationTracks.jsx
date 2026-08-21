import React, { useState } from 'react';
import { Rocket, Shield, Users, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';

export default function IncubationTracks({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('student');

  const tracks = {
    student: {
      icon: Rocket,
      title: 'For Young Founders (Ages 13–19)',
      badge: 'Incubation Journey',
      color: '#818cf8',
      description: 'Transform classroom ideas into real products with our step-by-step incubation framework.',
      features: [
        'Structured Business Ideation Canvas with problem-solution mapping',
        'Milestone Roadmap: Ideation, Customer Validation, MVP, Pitching',
        'Gamified LMS with interactive entrepreneurship modules & quizzes',
        'AI Feasibility Evaluation on your business concepts before launch'
      ],
      cta: 'Launch Your Venture'
    },
    guardian: {
      icon: Shield,
      title: 'For Parents & Guardians',
      badge: 'Parental Supervision',
      color: '#22d3ee',
      description: 'Full transparency and peace of mind while your child explores high-impact entrepreneurship.',
      features: [
        'Mandatory single-click parental authorization before account activation',
        'Supervised read-only visibility into mentor chats and milestone logs',
        'Immediate notification of child progress, course completions, and pitch entries',
        'Strict COPPA compliance and automatic PII/contact leak prevention'
      ],
      cta: 'Access Guardian Portal'
    },
    mentor: {
      icon: Users,
      title: 'For Industry Mentors & Founders',
      badge: 'Expert Guidance',
      color: '#fbbf24',
      description: 'Give back to the next generation of innovators in a structured, safe environment.',
      features: [
        'Administrative credential verification & vetting before onboarding',
        'Scheduled 1-on-1 milestone reviews with assigned young founders',
        'Standardized evaluation scorecards for problem clarity and MVP traction',
        'Supervised message channels with automated safety filters'
      ],
      cta: 'Apply as a Mentor'
    },
    pitch: {
      icon: Trophy,
      title: 'Virtual Pitch Arena',
      badge: 'Competitions & Grants',
      color: '#34d399',
      description: 'Showcase your prototype to industry judges and compete for seed incubation grants.',
      features: [
        'Quarterly virtual pitch demo days with live and video submission tracks',
        'Mentor rubric scoring across Innovation, Feasibility, and Market Size',
        'Non-dilutive micro-grants and incubator certificate recognitions',
        'Direct constructive feedback to iterate your startup prototype'
      ],
      cta: 'Explore Pitch Events'
    }
  };

  const current = tracks[activeTab];
  const IconComponent = current.icon;

  return (
    <section id="tracks" style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '80px 24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '14px' }}>
          Four Pillars of Incubation
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
          Tailored Workspaces for Every Role
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          Whether you are an aspiring student founder, a protective parent, or an experienced mentor, TeenPreneur Hub provides specialized tools designed for your goals.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}>
        {Object.entries(tracks).map(([key, item]) => {
          const TabIcon = item.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: 'var(--radius-sm)',
                border: isActive ? `1px solid ${item.color}` : '1px solid var(--border-subtle)',
                background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <TabIcon size={18} color={isActive ? item.color : 'var(--text-muted)'} />
              <span>{item.title.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Track Card */}
      <div className="glass-card" style={{
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <span className="badge" style={{ backgroundColor: `${current.color}15`, color: current.color, border: `1px solid ${current.color}35` }}>
              {current.badge}
            </span>
          </div>
          <h3 style={{ fontSize: '2rem', marginBottom: '18px' }}>{current.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
            {current.description}
          </p>

          <button
            onClick={() => onOpenAuth('register', activeTab === 'pitch' ? 'student' : activeTab)}
            className="btn btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <span>{current.cta}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Features Checklist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          background: 'rgba(0,0,0,0.25)',
          padding: '32px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Included Capabilities:</h4>
          {current.features.map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ marginTop: '3px' }}>
                <CheckCircle2 size={20} color={current.color} />
              </div>
              <span style={{ color: 'var(--text-main)', fontSize: '0.96rem', lineHeight: 1.5 }}>
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
