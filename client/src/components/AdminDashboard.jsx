import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ onBack }) => {
  const [metrics] = useState({
    totalFounders: 142,
    activeVentures: 46,
    verifiedMentors: 22,
    pendingVetting: 3,
    flaggedIncidents: 2,
    coppaCompliance: '100%'
  });

  const [mentorQueue, setMentorQueue] = useState([
    {
      id: 'app-1',
      name: 'Ananya Deshmukh',
      designation: 'Senior Product Architect at ScaleHub',
      expertise: 'Fintech & SaaS',
      experience: '9 Years',
      status: 'PENDING',
      docs: 'Govt ID & LinkedIn Verified'
    },
    {
      id: 'app-2',
      name: 'Dr. Rajesh Verma',
      designation: 'AI Research Director at Neuromorph Lab',
      expertise: 'Deep Learning & Robotics',
      experience: '14 Years',
      status: 'PENDING',
      docs: 'PhD Credentials & Background Check Cleared'
    }
  ]);

  const [auditLogs] = useState([
    { id: 1, event: 'COPPA_CONSENT_GRANTED', actor: 'Sunita Sharma (Parent)', target: 'Diya Sharma (Student)', time: '2026-09-22 15:30 IST', status: 'VERIFIED' },
    { id: 2, event: 'AI_PII_AUTO_FLAGGED', actor: 'NLP Safety Engine', target: 'Message #4029 (Phone number masked)', time: '2026-09-22 14:15 IST', status: 'FLAGGED' },
    { id: 3, event: 'MENTOR_CREDENTIAL_UPLOADED', actor: 'Dr. Rajesh Verma', target: 'Mentor Application', time: '2026-09-21 18:20 IST', status: 'PENDING_REVIEW' },
    { id: 4, event: 'PITCH_SCORECARD_SUBMITTED', actor: 'Dr. Sarah Chen (Mentor)', target: 'EcoTrack AI Demo Day Pitch', time: '2026-09-20 16:45 IST', status: 'RECORDED' }
  ]);

  const handleApproveMentor = (id) => {
    setMentorQueue(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="admin-dashboard-container glassmorphism">
      <div className="admin-header">
        <div>
          <button className="back-btn" onClick={onBack}>&larr; Back to Platform Home</button>
          <h2>🛡️ Platform Administration & COPPA Safety Governance</h2>
          <p className="admin-subtitle">Live system telemetry, mentor vetting pipeline, and student child protection audit logs.</p>
        </div>
        <div className="coppa-badge">
          <span>✓ 100% COPPA Certified Architecture</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-box">
          <span className="metric-title">Teen Founders</span>
          <span className="metric-value">{metrics.totalFounders}</span>
          <span className="metric-sub">Across 38 Schools</span>
        </div>
        <div className="metric-box">
          <span className="metric-title">Active Ventures</span>
          <span className="metric-value">{metrics.activeVentures}</span>
          <span className="metric-sub">In Incubation Tracks</span>
        </div>
        <div className="metric-box">
          <span className="metric-title">Vetted Mentors</span>
          <span className="metric-value">{metrics.verifiedMentors}</span>
          <span className="metric-sub">Background Checked</span>
        </div>
        <div className="metric-box alert-box">
          <span className="metric-title">Pending Vetting</span>
          <span className="metric-value">{mentorQueue.length}</span>
          <span className="metric-sub">Awaiting Admin Review</span>
        </div>
        <div className="metric-box safety-box">
          <span className="metric-title">Safety Compliance</span>
          <span className="metric-value">{metrics.coppaCompliance}</span>
          <span className="metric-sub">Zero Unsupervised Chats</span>
        </div>
      </div>

      {/* Mentor Approval Queue */}
      <section className="admin-section">
        <h3>📋 Mentor Vetting Queue (Background & COPPA Check)</h3>
        {mentorQueue.length === 0 ? (
          <p className="empty-notice">No pending mentor applications in review queue.</p>
        ) : (
          <div className="mentor-queue-grid">
            {mentorQueue.map((m) => (
              <div key={m.id} className="queue-card">
                <div>
                  <h4>{m.name}</h4>
                  <p className="queue-designation">{m.designation}</p>
                  <p className="queue-meta">Specialty: <strong>{m.expertise}</strong> • {m.experience}</p>
                  <p className="queue-docs">📄 {m.docs}</p>
                </div>
                <div className="queue-actions">
                  <button className="btn-approve-mentor" onClick={() => handleApproveMentor(m.id)}>
                    ✓ Approve & Grant Mentor License
                  </button>
                  <button className="btn-reject-mentor" onClick={() => handleApproveMentor(m.id)}>
                    Request Background Documentation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Audit Logs Trail */}
      <section className="admin-section">
        <h3>🔍 Real-Time Child Safety & Activity Audit Trail</h3>
        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Actor</th>
                <th>Target Resource</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td><code>{log.event}</code></td>
                  <td>{log.actor}</td>
                  <td>{log.target}</td>
                  <td>{log.time}</td>
                  <td>
                    <span className={`status-tag ${log.status.toLowerCase()}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
