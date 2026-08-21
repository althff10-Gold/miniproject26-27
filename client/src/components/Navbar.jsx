import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Shield, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(7, 9, 14, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '16px 24px'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}>
            <Rocket size={22} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
              Teen<span style={{ color: 'var(--secondary)' }}>Preneur</span> Hub
            </span>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Secure Student Incubator
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#tracks" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }}>
            Tracks
          </a>
          <a href="#safety" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }}>
            COPPA Safety
          </a>
          <a href="#stats" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }}>
            Impact
          </a>
        </nav>

        {/* Auth CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  {user.firstName ? user.firstName.charAt(0) : 'U'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <LogIn size={16} />
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.88rem' }}
              >
                <UserPlus size={16} />
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
