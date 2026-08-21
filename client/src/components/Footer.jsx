import React from 'react';
import { Rocket, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'rgba(7, 9, 14, 0.95)',
      padding: '60px 24px 30px'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '50px'
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Rocket size={20} color="#fff" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Teen<span style={{ color: 'var(--secondary)' }}>Preneur</span> Hub
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
            A secure, supervised incubator ecosystem empowering adolescent innovators to build, iterate, and pitch ventures with parental transparency.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>
            <Shield size={16} />
            <span>COPPA & Child Safety Certified</span>
          </div>
        </div>

        {/* Roles */}
        <div>
          <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '18px' }}>Platform Portals</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li><a href="#tracks" style={{ transition: 'color 0.2s' }}>Student Founders</a></li>
            <li><a href="#tracks" style={{ transition: 'color 0.2s' }}>Guardian Oversight</a></li>
            <li><a href="#tracks" style={{ transition: 'color 0.2s' }}>Industry Mentors</a></li>
            <li><a href="#tracks" style={{ transition: 'color 0.2s' }}>School Administrators</a></li>
          </ul>
        </div>

        {/* Legal & Safety */}
        <div>
          <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '18px' }}>Safety & Compliance</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li><a href="#safety">COPPA Privacy Policy</a></li>
            <li><a href="#safety">Parental Consent Terms</a></li>
            <li><a href="#safety">Content Moderation Rules</a></li>
            <li><a href="#safety">Mentor Code of Conduct</a></li>
          </ul>
        </div>

        {/* Academic Meta */}
        <div>
          <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '18px' }}>Project Specification</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '8px' }}>
            <strong>Degree</strong>: Master of Computer Applications (MCA) Mini Project
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            <strong>Methodology</strong>: Agile Scrum (12 Sprints, Aug 14 – Sep 30, 2026)
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        color: 'var(--text-faint)',
        fontSize: '0.85rem'
      }}>
        <div>
          &copy; 2026 TeenPreneur Hub. Designed and developed by ALTHAF OK. All rights reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Empowering the next generation of builders</span>
          <Heart size={14} color="#f43f5e" fill="#f43f5e" />
        </div>
      </div>
    </footer>
  );
}
