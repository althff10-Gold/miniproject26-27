import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Shield, LogIn, UserPlus, LogOut, LayoutDashboard, BookOpen, Award, MessageSquare } from 'lucide-react';

export default function Navbar({ onOpenAuth, currentView = 'landing', onSwitchView }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Logo */}
        <button
          onClick={() => onSwitchView && onSwitchView('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}>
            <Rocket size={20} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
              Teen<span style={{ color: 'var(--secondary)' }}>Preneur</span> Hub
            </span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Secure Student Incubator
            </div>
          </div>
        </button>

        {/* Primary Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={() => onSwitchView && onSwitchView('landing')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.88rem',
              color: currentView === 'landing' ? 'var(--secondary)' : 'var(--text-muted)',
              fontWeight: currentView === 'landing' ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            Home
          </button>

          <button
            onClick={() => onSwitchView && onSwitchView('lms')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.88rem',
              color: currentView === 'lms' ? 'var(--secondary)' : 'var(--text-muted)',
              fontWeight: currentView === 'lms' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <BookOpen size={15} />
            LMS Academy
          </button>

          <button
            onClick={() => onSwitchView && onSwitchView('pitch')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.88rem',
              color: currentView === 'pitch' ? 'var(--secondary)' : 'var(--text-muted)',
              fontWeight: currentView === 'pitch' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Award size={15} />
            Demo Day Pitch
          </button>

          <button
            onClick={() => onSwitchView && onSwitchView('chat')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.88rem',
              color: currentView === 'chat' ? 'var(--secondary)' : 'var(--text-muted)',
              fontWeight: currentView === 'chat' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <MessageSquare size={15} />
            Supervised Chat
          </button>

          {/* Role-Specific Portal Switchers */}
          {isAuthenticated && user && (
            <button
              onClick={() => onSwitchView && onSwitchView(user.role === 'admin' ? 'admin' : user.role === 'guardian' ? 'guardian' : user.role === 'mentor' ? 'mentor' : 'student')}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid var(--border-accent)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LayoutDashboard size={14} />
              {user.role === 'admin' ? 'Admin Governance' : user.role === 'guardian' ? 'Guardian Oversight' : user.role === 'mentor' ? 'Mentor Desk' : 'Student Studio'}
            </button>
          )}
        </nav>

        {/* Auth CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}>
                  {user.firstName ? user.firstName.charAt(0) : 'U'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
                  <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ padding: '7px 12px', fontSize: '0.82rem' }}
                title="Log Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <LogIn size={15} />
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                <UserPlus size={15} />
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
