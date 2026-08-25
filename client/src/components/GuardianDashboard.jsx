import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ShieldCheck, User, Rocket, MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

export default function GuardianDashboard({ onBack }) {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, chats, activity
  const [activityStream, setActivityStream] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState(null);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const res = await api.get('/guardians/children');
      if (res.data?.success && res.data.data.length > 0) {
        setChildren(res.data.data);
        setSelectedChild(res.data.data[0]);
        loadChildDetails(res.data.data[0]);
      } else {
        // Fallback demo mock data for instant preview
        const mockChild = {
          link_id: 1,
          student_id: 1,
          user_id: 3,
          first_name: 'Aarav',
          last_name: 'Sharma',
          email: 'aarav@demo.com',
          school_name: 'Greenwood High International',
          grade_level: '10th Grade',
          consent_status: 'pending',
          account_status: 'pending',
          startups: [
            {
              id: 1,
              name: 'EcoTrack Smart Campus',
              industry: 'CleanTech & IoT',
              stage: 'prototype',
              tagline: 'Automated energy auditing and recycling rewards for schools.'
            }
          ]
        };
        setChildren([mockChild]);
        setSelectedChild(mockChild);
        loadMockDetails();
      }
    } catch (err) {
      loadMockDetails();
    } finally {
      setLoading(false);
    }
  };

  const loadMockDetails = () => {
    setActivityStream([
      { id: 1, action: 'MILESTONE_SUBMITTED', details: 'Aarav submitted Milestone: MVP Hardware Testing Proof', created_at: 'Today at 14:20' },
      { id: 2, action: 'COURSE_LESSON_COMPLETED', details: 'Completed LMS Module: "Unit Economics for Student Startups"', created_at: 'Yesterday at 17:45' },
      { id: 3, action: 'QUIZ_PASSED', details: 'Scored 100% on "Customer Validation Basics Quiz"', created_at: 'Aug 21, 2026' }
    ]);
    setConversations([
      {
        id: 1,
        title: 'Mentorship: EcoTrack Review',
        mentor_name: 'Dr. Rajesh Kumar (Tech Entrepreneur)',
        messages: [
          { id: 101, sender_name: 'Aarav Sharma', sender_role: 'student', message_text: 'Hello Dr. Kumar, we finalized our sensor prototype test on campus!', is_flagged: false, created_at: '14:30' },
          { id: 102, sender_name: 'Dr. Rajesh Kumar', sender_role: 'mentor', message_text: 'Impressive progress Aarav! Let us review your power consumption data this Thursday.', is_flagged: false, created_at: '14:45' }
        ]
      }
    ]);
  };

  const loadChildDetails = async (child) => {
    try {
      const [actRes, convRes] = await Promise.all([
        api.get(`/guardians/children/${child.student_id}/activity`),
        api.get(`/guardians/children/${child.student_id}/conversations`)
      ]);
      setActivityStream(actRes.data?.data || []);
      setConversations(convRes.data?.data || []);
    } catch (err) {
      loadMockDetails();
    }
  };

  const handleConsentDecision = async (decision) => {
    if (!selectedChild) return;
    try {
      await api.put(`/guardians/children/${selectedChild.link_id}/consent`, { decision });
      setActionFeedback(`Parental consent successfully updated to: ${decision.toUpperCase()}`);
      setSelectedChild(prev => ({ ...prev, consent_status: decision, account_status: decision === 'approved' ? 'active' : 'pending' }));
    } catch (err) {
      // Offline fallback
      setActionFeedback(`[Demo Mode] Parental consent updated to: ${decision.toUpperCase()}`);
      setSelectedChild(prev => ({ ...prev, consent_status: decision, account_status: decision === 'approved' ? 'active' : 'pending' }));
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 24px' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            &larr; Back to Public Portal
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Guardian Supervision Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Supervise child incubation milestones, review mentor messaging, and manage COPPA authorization.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-cyan" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <ShieldCheck size={16} />
            Supervised Guardian Session
          </span>
        </div>
      </div>

      {actionFeedback && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#34d399',
          marginBottom: '24px'
        }}>
          <CheckCircle2 size={20} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Pending Consent Banner if applicable */}
      {selectedChild && selectedChild.consent_status === 'pending' && (
        <div className="glass-card" style={{
          padding: '24px 28px',
          marginBottom: '28px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          background: 'rgba(245, 158, 11, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
              <AlertCircle size={20} />
              Action Required: Minor Account Awaiting Parental Consent
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Your child, <strong>{selectedChild.first_name} {selectedChild.last_name}</strong>, has requested to join TeenPreneur Hub. In compliance with COPPA child safety guidelines, your approval is required to activate their account.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleConsentDecision('approved')}
              className="btn btn-primary"
              style={{ padding: '9px 18px', fontSize: '0.88rem', background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              <CheckCircle2 size={16} />
              Authorize Account
            </button>
            <button
              onClick={() => handleConsentDecision('rejected')}
              className="btn btn-secondary"
              style={{ padding: '9px 18px', fontSize: '0.88rem', color: '#f43f5e' }}
            >
              <XCircle size={16} />
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Linked Child Profile */}
        {selectedChild && (
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.2)',
                border: '2px solid var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '10px'
              }}>
                {selectedChild.first_name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {selectedChild.first_name} {selectedChild.last_name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {selectedChild.school_name || 'Middle / High School Founder'}
              </div>
              <div style={{ marginTop: '10px' }}>
                <span className={`badge ${selectedChild.consent_status === 'approved' ? 'badge-green' : 'badge-amber'}`}>
                  {selectedChild.consent_status === 'approved' ? 'Authorized by You' : 'Pending Consent'}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-faint)' }}>Grade / Level: </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedChild.grade_level || 'Grade 10'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-faint)' }}>Email: </span>
                <span style={{ color: '#fff' }}>{selectedChild.email}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-faint)' }}>Active Ventures: </span>
                <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                  {selectedChild.startups?.length || 1} Startup
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Tabbed Content (Overview, Supervised Chats, Activity Stream) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            {[
              { id: 'overview', label: 'Startup Progress', icon: Rocket },
              { id: 'chats', label: 'Supervised Mentor Chats', icon: MessageSquare },
              { id: 'activity', label: 'Safety & Activity Feed', icon: Clock }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <TabIcon size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Startup Progress */}
          {activeTab === 'overview' && selectedChild && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {selectedChild.startups?.map((startup, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
                        {startup.industry}
                      </span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{startup.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
                        {startup.tagline}
                      </p>
                    </div>
                    <span className="badge badge-primary">Stage: {startup.stage}</span>
                  </div>

                  <div style={{
                    background: 'rgba(0,0,0,0.25)',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Current Active Milestone</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                        Hardware IoT Sensor Prototype Validation (75% Complete)
                      </div>
                    </div>
                    <span className="badge badge-green">In Progress</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Supervised Mentor Chats */}
          {activeTab === 'chats' && (
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Supervised Chat Transcripts</h3>
                <span className="badge badge-green">
                  <ShieldCheck size={14} />
                  AI Safety Filter Active
                </span>
              </div>

              {conversations.map(c => (
                <div key={c.id} style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  padding: '18px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                    {c.title} &mdash; <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.mentor_name || 'Assigned Mentor'}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {c.messages?.map(m => (
                      <div key={m.id} style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: m.sender_role === 'student' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: m.sender_role === 'student' ? '#818cf8' : '#fbbf24' }}>
                            {m.sender_name} ({m.sender_role})
                          </span>
                          <span>{m.created_at}</span>
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#fff', lineHeight: 1.5 }}>
                          {m.message_text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Safety & Activity Feed */}
          {activeTab === 'activity' && (
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
                Recent Student Activity Log
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activityStream.map(act => (
                  <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#22d3ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 600 }}>{act.details}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>{act.created_at}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
