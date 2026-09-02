import React, { useState, useEffect } from 'react';
import './MentorDashboard.css';

const MentorDashboard = ({ user, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned', 'sessions', 'directory'

  const demoMentor = {
    first_name: user?.first_name || 'Dr. Sarah',
    last_name: user?.last_name || 'Chen',
    email: user?.email || 'sarah.chen@incubator.org',
    designation: 'EdTech Venture Partner & Lead Incubator Mentor',
    company: 'NextGen Innovators Fund',
    vetting_status: 'APPROVED',
    rating: 4.95,
    total_reviews: 32,
    expertise: ['AI / Machine Learning', 'Product-Market Fit', 'Youth Mentorship', 'Pitch Preparation'],
    bio: 'Dedicated to helping school and early-college founders take ideas from raw hypotheses to scalable prototypes with rigorous safety standards.'
  };

  const initialStartups = [
    {
      id: 'startup-eco-001',
      name: 'EcoTrack AI',
      tagline: 'Computer vision waste segregation for high school cafeterias',
      stage: 'PROTOTYPE',
      industry: 'CleanTech / AI',
      readiness_score: 84,
      founder: 'Aarav Patel (Age 16)',
      guardian_consent: 'VERIFIED',
      current_milestone: 'Camera Model Accuracy Validation (>92%)',
      milestone_status: 'PENDING_REVIEW',
      submission_notes: 'Attached test dataset of 200 cafeteria packaging items tested across 3 lighting conditions.',
      next_session: 'Tomorrow at 5:00 PM IST'
    },
    {
      id: 'startup-peer-002',
      name: 'PeerStudy Hub',
      tagline: 'Collaborative gamified peer tutoring and problem sharing network',
      stage: 'VALIDATION',
      industry: 'EdTech / Social',
      readiness_score: 78,
      founder: 'Diya Sharma (Age 15)',
      guardian_consent: 'VERIFIED',
      current_milestone: 'Survey 50 Target High School Students on Study Habits',
      milestone_status: 'IN_PROGRESS',
      submission_notes: 'Collected 38 responses so far. Preparing summary insights.',
      next_session: 'Thursday at 6:30 PM IST'
    }
  ];

  const sessions = [
    {
      id: 'sess-1',
      startup_name: 'EcoTrack AI',
      student: 'Aarav Patel',
      date: 'Tomorrow, 5:00 PM - 5:45 PM IST',
      topic: 'Edge AI Deployment & Hardware Bill of Materials',
      status: 'CONFIRMED',
      link: 'https://meet.teenpreneur.org/room/eco-track-001'
    },
    {
      id: 'sess-2',
      startup_name: 'PeerStudy Hub',
      student: 'Diya Sharma',
      date: 'Thursday, 6:30 PM - 7:15 PM IST',
      topic: 'User Retention Loop & Safety Guidelines for Peer Chat',
      status: 'CONFIRMED',
      link: 'https://meet.teenpreneur.org/room/peer-study-002'
    }
  ];

  useEffect(() => {
    // Attempt to fetch from API, with fallback to demo data
    const fetchMentorData = async () => {
      try {
        const token = localStorage.getItem('teenpreneur_token');
        if (token) {
          const res = await fetch('http://localhost:5000/api/v1/mentors/assigned-startups', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data?.data?.length > 0) {
            setStartups(data.data);
          } else {
            setStartups(initialStartups);
          }
        } else {
          setStartups(initialStartups);
        }
      } catch (err) {
        setStartups(initialStartups);
      } finally {
        setProfile(demoMentor);
        setLoading(false);
      }
    };

    fetchMentorData();
  }, []);

  const handleApproveMilestone = (startupId) => {
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        return { ...s, milestone_status: 'APPROVED', readiness_score: Math.min(100, s.readiness_score + 6) };
      }
      return s;
    }));
    setFeedbackSent(true);
    setTimeout(() => {
      setSelectedStartup(null);
      setFeedbackSent(false);
      setFeedbackText('');
    }, 1500);
  };

  return (
    <div className="mentor-dashboard-container">
      {/* Mentor Header Profile */}
      <header className="mentor-header glassmorphism">
        <div className="mentor-profile-main">
          <div className="mentor-avatar-badge">
            <div className="mentor-avatar">
              {demoMentor.first_name[0]}{demoMentor.last_name[0]}
            </div>
            <span className="vetting-pill verified">
              <span className="dot"></span> COPPA Vetted Mentor
            </span>
          </div>

          <div className="mentor-info">
            <div className="mentor-title-row">
              <h1>{demoMentor.first_name} {demoMentor.last_name}</h1>
              <span className="mentor-rating">⭐ {demoMentor.rating} ({demoMentor.total_reviews} reviews)</span>
            </div>
            <p className="mentor-role">{demoMentor.designation} • <strong>{demoMentor.company}</strong></p>
            <p className="mentor-bio">{demoMentor.bio}</p>

            <div className="expertise-tags">
              {demoMentor.expertise.map((exp, idx) => (
                <span key={idx} className="expertise-pill">{exp}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mentor-safety-card">
          <div className="safety-icon">🛡️</div>
          <div className="safety-text">
            <h4>Supervised Mentorship Standard</h4>
            <p>All student interactions and code reviews are supervised under COPPA guidelines. Linked guardians have read-access to session notes.</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mentor-tabs">
        <button
          className={`tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('assigned')}
        >
          🚀 Assigned Startups ({startups.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          📅 Mentoring Sessions ({sessions.length})
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'assigned' && (
        <section className="startups-section">
          <div className="section-title-row">
            <h2>Assigned Teen Entrepreneur Ventures</h2>
            <span className="badge-highlight">Active Mentees</span>
          </div>

          <div className="startups-grid">
            {startups.map((st) => (
              <div key={st.id} className="startup-card glassmorphism">
                <div className="startup-top">
                  <span className="stage-pill">{st.stage}</span>
                  <span className="readiness-pill">Readiness: {st.readiness_score}/100</span>
                </div>

                <h3>{st.name}</h3>
                <p className="startup-tagline">{st.tagline}</p>
                <div className="founder-row">
                  <span>👤 Founder: <strong>{st.founder || (st.founder_first_name + ' ' + st.founder_last_name)}</strong></span>
                  <span className="consent-tag">✓ Parental Consent</span>
                </div>

                <div className="milestone-box">
                  <div className="milestone-label">Current Milestone:</div>
                  <div className="milestone-title">{st.current_milestone || 'MVP Architecture Definition'}</div>
                  <div className={`milestone-status ${st.milestone_status?.toLowerCase() || 'pending'}`}>
                    Status: {st.milestone_status || 'Under Evaluation'}
                  </div>
                </div>

                <div className="startup-card-actions">
                  <button
                    className="btn-review"
                    onClick={() => setSelectedStartup(st)}
                  >
                    📝 Review Evidence & Give Feedback
                  </button>
                  <a
                    href="https://meet.teenpreneur.org"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-session"
                  >
                    🎥 Join Safe Room
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'sessions' && (
        <section className="sessions-section glassmorphism">
          <h2>Upcoming Scheduled Mentoring Sessions</h2>
          <p className="section-subtitle">
            Video sessions are conducted through secure internal links. Guardian notifications are dispatched 1 hour prior.
          </p>

          <div className="sessions-list">
            {sessions.map((s) => (
              <div key={s.id} className="session-card">
                <div className="session-info">
                  <div className="session-time">{s.date}</div>
                  <h4>{s.startup_name} • {s.student}</h4>
                  <p className="session-topic"><strong>Topic:</strong> {s.topic}</p>
                </div>
                <div className="session-actions">
                  <span className="badge-confirmed">● {s.status}</span>
                  <a href={s.link} target="_blank" rel="noreferrer" className="btn-join">
                    Launch Room
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Milestone Review Modal */}
      {selectedStartup && (
        <div className="modal-backdrop" onClick={() => setSelectedStartup(null)}>
          <div className="modal-content glassmorphism" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Milestone Review: {selectedStartup.name}</h3>
              <button className="close-btn" onClick={() => setSelectedStartup(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="review-meta">
                <p><strong>Milestone:</strong> {selectedStartup.current_milestone}</p>
                <p><strong>Founder:</strong> {selectedStartup.founder || 'Student Founder'}</p>
                <p><strong>Submitted Evidence:</strong> {selectedStartup.submission_notes || 'Dataset test metrics and prototype screencast.'}</p>
              </div>

              <div className="feedback-input-group">
                <label>Mentor Feedback & Guidance (Supervised):</label>
                <textarea
                  rows="4"
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Provide constructive encouragement, architectural advice, and next steps for the student..."
                />
              </div>

              {feedbackSent ? (
                <div className="success-banner">
                  ✓ Milestone Approved & Feedback shared with Student & Guardian!
                </div>
              ) : (
                <div className="modal-actions">
                  <button
                    className="btn-approve"
                    onClick={() => handleApproveMilestone(selectedStartup.id)}
                  >
                    ✓ Approve Milestone & Award Score
                  </button>
                  <button
                    className="btn-request-revisions"
                    onClick={() => setSelectedStartup(null)}
                  >
                    Request Clarifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
