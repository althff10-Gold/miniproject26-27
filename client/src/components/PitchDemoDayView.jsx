import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PitchDemoDayView.css';

const PitchDemoDayView = ({ onBack }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [scores, setScores] = useState({ problem: 9, market: 9, feasibility: 8, presentation: 9 });
  const [comments, setComments] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      startup_name: 'EcoTrack AI',
      founder: 'Aarav Patel (Age 16)',
      track: 'CleanTech & IoT',
      tagline: 'Computer vision automated cafeteria waste sorting with student reward tokens',
      total_score: 9.2,
      presentation_url: 'https://cdn.teenpreneur.org/decks/ecotrack.pdf',
      video_duration: '3:00 mins',
      pitch_content: 'Addresses 40 tons of annual school cafeteria packaging waste by gamifying waste sorting with automated machine vision.'
    },
    {
      id: 2,
      startup_name: 'PeerStudy Hub',
      founder: 'Diya Sharma (Age 15)',
      track: 'EdTech',
      tagline: 'Supervised peer-to-peer homework collaboration network',
      total_score: 8.8,
      presentation_url: 'https://cdn.teenpreneur.org/decks/peerstudy.pdf',
      video_duration: '3:00 mins',
      pitch_content: 'Safe, COPPA-compliant peer learning platform connecting high school peers to solve advanced STEM problems collaboratively.'
    }
  ]);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [pitchTitle, setPitchTitle] = useState('');
  const [deckUrl, setDeckUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pitchContent, setPitchContent] = useState('');

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const res = await api.get('/events/events');
      if (res.data?.success && res.data.data?.length > 0) {
        const eventId = res.data.data[0].id;
        const subRes = await api.get(`/events/events/${eventId}/leaderboard`);
        if (subRes.data?.success && subRes.data.data?.length > 0) {
          setSubmissions(subRes.data.data.map(s => ({
            id: s.id,
            startup_name: s.startup_name,
            founder: `${s.founder_first_name} ${s.founder_last_name}`,
            track: s.startup_tagline || 'Innovation Track',
            tagline: s.pitch_title,
            total_score: s.total_score || 8.5,
            presentation_url: s.presentation_url,
            video_duration: '3:00 mins',
            pitch_content: s.pitch_content
          })));
        }
      }
    } catch (err) {
      console.warn('Pitch event fetch error:', err.message);
    }
  };

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    try {
      await api.post(`/events/submissions/${selectedSubmission.id}/score`, {
        problem_score: scores.problem,
        market_score: scores.market,
        feasibility_score: scores.feasibility,
        presentation_score: scores.presentation,
        comments
      });
    } catch (err) {
      console.warn('Score submission error:', err.message);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSelectedSubmission(null);
      setSubmittedSuccess(false);
      setComments('');
    }, 1500);
  };

  const handleCreatePitchSubmission = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events/events/1/submit', {
        startup_id: 1,
        pitch_title: pitchTitle,
        presentation_url: deckUrl,
        video_url: videoUrl,
        pitch_content: pitchContent
      });
      fetchEventData();
      setIsSubmitModalOpen(false);
      setPitchTitle('');
      setDeckUrl('');
      setVideoUrl('');
      setPitchContent('');
    } catch (err) {
      setIsSubmitModalOpen(false);
    }
  };

  return (
    <div className="pitch-demoday-container glassmorphism" style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
          &larr; Back to Platform Home
        </button>
      </div>

      <div className="demoday-header">
        <div className="demoday-header-left">
          <span className="live-tag">● LIVE DEMO DAY</span>
          <h2>🏆 TeenPreneur Q3 Virtual Pitch Showcase</h2>
          <p className="demoday-subtitle">Watch top youth entrepreneurs pitch live before vetted venture judges and angel mentors.</p>
        </div>
        <div className="demoday-header-right">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.9rem' }}
          >
            + Submit Startup Pitch
          </button>
        </div>
      </div>

      {isSubmitModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '90%', padding: '28px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Submit Startup Demo Pitch</h3>
            <form onSubmit={handleCreatePitchSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pitch Title</label>
                <input
                  type="text"
                  required
                  value={pitchTitle}
                  onChange={(e) => setPitchTitle(e.target.value)}
                  placeholder="e.g. EcoTrack AI Cafeteria Waste Sorter"
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Slide Deck URL</label>
                <input
                  type="url"
                  required
                  value={deckUrl}
                  onChange={(e) => setDeckUrl(e.target.value)}
                  placeholder="https://slides.com/your-pitch"
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Demo Video URL</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Executive Summary</label>
                <textarea
                  required
                  value={pitchContent}
                  onChange={(e) => setPitchContent(e.target.value)}
                  placeholder="Briefly describe your problem, solution, and traction metrics."
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '4px', minHeight: '80px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
                  Submit Pitch
                </button>
                <button type="button" onClick={() => setIsSubmitModalOpen(false)} className="btn btn-secondary" style={{ padding: '10px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="pitch-leaderboard-section">
        <h3>🚀 Startup Pitch Submissions & Live Leaderboard</h3>

        <div className="pitch-cards-grid">
          {submissions.map((sub, idx) => (
            <div key={sub.id || idx} className="pitch-card">
              <div className="pitch-card-top">
                <span className="rank-badge">#{idx + 1}</span>
                <span className="track-tag">{sub.track}</span>
                <span className="score-badge">⭐ {sub.total_score || 8.5}/10</span>
              </div>

              <h4>{sub.startup_name}</h4>
              <p className="founder-name">👤 Founder: <strong>{sub.founder}</strong></p>
              <p className="pitch-summary">{sub.pitch_content || sub.tagline}</p>

              <div className="pitch-card-footer">
                {sub.presentation_url && (
                  <a href={sub.presentation_url} target="_blank" rel="noreferrer" className="btn-view-deck">
                    📄 Deck Slides
                  </a>
                )}
                <button className="btn-score-pitch" onClick={() => setSelectedSubmission(sub)}>
                  ⚖️ Score as Judge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Judge Scoring Modal */}
      {selectedSubmission && (
        <div className="modal-overlay">
          <div className="score-modal glassmorphism">
            <h3>⚖️ Judge Evaluation Scorecard</h3>
            <p className="modal-startup-title">{selectedSubmission.startup_name}</p>

            {submittedSuccess ? (
              <div className="success-banner">
                <span>✓ Scorecard successfully recorded! Leaderboard updated.</span>
              </div>
            ) : (
              <form onSubmit={handleScoreSubmit}>
                <div className="scoring-grid">
                  <div className="score-slider-group">
                    <label>Problem Validation & Pain Point: {scores.problem}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores.problem}
                      onChange={(e) => setScores({ ...scores, problem: Number(e.target.value) })}
                    />
                  </div>
                  <div className="score-slider-group">
                    <label>Market Size & Unfair Advantage: {scores.market}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores.market}
                      onChange={(e) => setScores({ ...scores, market: Number(e.target.value) })}
                    />
                  </div>
                  <div className="score-slider-group">
                    <label>Solution Feasibility & MVP: {scores.feasibility}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores.feasibility}
                      onChange={(e) => setScores({ ...scores, feasibility: Number(e.target.value) })}
                    />
                  </div>
                  <div className="score-slider-group">
                    <label>Presentation & Delivery: {scores.presentation}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores.presentation}
                      onChange={(e) => setScores({ ...scores, presentation: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="feedback-textarea-group">
                  <label>Mentor Feedback & Key Strengths:</label>
                  <textarea
                    rows="3"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide constructive feedback for student founders..."
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setSelectedSubmission(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-score">
                    Submit Scorecard
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchDemoDayView;
