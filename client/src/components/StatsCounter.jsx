import React from 'react';
import { Rocket, Users, Target, Award, Shield } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    { label: 'Active Young Founders', value: '540+', icon: Rocket, color: '#818cf8' },
    { label: 'Verified Industry Mentors', value: '120+', icon: Users, color: '#22d3ee' },
    { label: 'Milestones Completed', value: '1,450+', icon: Target, color: '#34d399' },
    { label: 'Grant Funding Facilitated', value: '₹15L+', icon: Award, color: '#fbbf24' },
    { label: 'Supervised Interactions', value: '100%', icon: Shield, color: '#f43f5e' }
  ];

  return (
    <section id="stats" style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '40px 24px 80px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.08))',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: `${item.color}15`,
                  color: item.color,
                  marginBottom: '12px'
                }}>
                  <Icon size={22} />
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  marginBottom: '4px'
                }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
