import React, { useState } from 'react';
import api from '../services/api';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

export default function GuardianApprovalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [token, setToken] = useState('');
  const [decision, setDecision] = useState('approved');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleDecision = async (selectedDecision) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post('/auth/guardian-approval', {
        token: token.trim(),
        decision: selectedDecision
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Authorization verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '36px',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.15)',
            color: '#22d3ee',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <ShieldCheck size={26} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            Parental Consent Verification
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Enter the authorization token received via email to approve or reject your child's incubator account.
          </p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(244,63,94,0.15)',
            border: '1px solid rgba(244,63,94,0.3)',
            color: '#f43f5e',
            fontSize: '0.85rem',
            marginBottom: '18px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            padding: '18px',
            borderRadius: 'var(--radius-sm)',
            background: result.decision === 'approved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: `1px solid ${result.decision === 'approved' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {result.decision === 'approved' ? (
              <CheckCircle2 size={32} color="#34d399" />
            ) : (
              <XCircle size={32} color="#fbbf24" />
            )}
            <div style={{ fontSize: '0.92rem', color: '#fff' }}>{result.message}</div>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
            Authorization Token
          </label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="e.g. 32-character hexadecimal token"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              outline: 'none',
              fontSize: '0.88rem'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            disabled={loading || !token.trim()}
            onClick={() => handleDecision('approved')}
            className="btn btn-primary"
            style={{ padding: '10px' }}
          >
            <CheckCircle2 size={18} />
            Grant Approval
          </button>
          <button
            type="button"
            disabled={loading || !token.trim()}
            onClick={() => handleDecision('rejected')}
            className="btn btn-secondary"
            style={{ padding: '10px', color: '#f43f5e' }}
          >
            <XCircle size={18} />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
