import React, { useState } from 'react';
import './PitchDemoDayView.css';

const PitchDemoDayView = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [scores, setScores] = useState({ problem: 9, market: 9, feasibility: 8, presentation: 9 });
  const [comments, setComments] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const eventInfo = {
    title: '🏆 TeenPreneur Q3 Virtual Pitch Demo Day',
    date: 'Saturday, September 28, 2026 • 2:00 PM IST',
    prize_pool: '$10,000 Educational Innovation Grants',
    status: 'LIVE DEMO DAY',
    banner: 'Watch top 10 youth entrepreneurs pitch live before vetted venture judges and angel mentors.'
  };

  const submissions = [
    {
      id: 'sub-001',
      startup_name: 'EcoTrack AI',
      founder: 'Aarav Patel (Age 16)',
      track: 'CleanTech & IoT',
      tagline: 'Computer vision automated cafeteria waste sorting with student reward tokens',
      score: 92.5,
      deck_url: 'https://cdn.teenpreneur.org/decks/ecotrack.pdf',
      video_duration: '3:00 mins',
      pitch_summary: 'Addresses 40 tons of annual school cafeteria packaging waste by gamifying waste sorting with automated machine vision.'
    },
    {
      id: 'sub-002',
      startup_name: 'PeerStudy Hub',
      founder: 'Diya Sharma (Age 15)',
      track: 'EdTech',
      tagline: 'Supervised peer-to-peer homework collaboration network',
      score: 88.0,
      deck_url: 'https://cdn.teenpreneur.org/decks/peerstudy.pdf',
      video_duration: '3:00 mins',
      pitch_summary: 'Safe, COPPA-compliant peer learning platform connecting high school peers to solve advanced STEM problems collaboratively.'
    }
  ];

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSelectedSubmission(null);
      setSubmittedSuccess(false);
      setComments('');
    }, 1500);
  };

  return (
    <div className="pitch-demoday-container glassmorphism">
      <div className="demoday-header">
        <div className="demoday-header-left">
          <span className="live-tag">● {eventInfo.status}</span>
          <h2>{eventInfo.title}</h2>
          <p className="demoday-subtitle">{eventInfo.banner}</p>
        </div>
        <div className="demoday-header-right">
          <div className="prize-pill">🎁 {eventInfo.prize_pool}</div>
          <div className="event-date">📅 {eventInfo.date}</div>
        </div>
      </div>

      <div className="pitch-leaderboard-section">
        <h3>🚀 Startup Pitch Submissions & Live Leaderboard</h3>

        <div className="pitch-cards-grid">
          {submissions.map((sub, idx) => (
            <div key={sub.id} className="pitch-card">
              <div className="pitch-card-top">
                <span className="rank-badge">#{idx + 1}</span>
                <span className="track-tag">{sub.track}</span>
                <span className="score-badge">⭐ {sub.score}/100</span>
              </div>

              <h4>{sub.startup_name}</h4>
              <p className="founder-name">👤 Founder: <strong>{sub.founder}</strong></p>
              <p className="pitch-summary">{sub.pitch_summary}</p>

              <div className="pitch-media-row">
                <span className="video-tag">🎥 Pitch Video: {sub.video_duration}</span>
                <a href={sub.deck_url} target="_blank" rel="noreferrer" className="deck-link">
                  📑 View Deck
                </a>
              </div>

              <div className="pitch-card-actions">
                <button
                  className="btn-scorecard"
                  onClick={() => setSelectedSubmission(sub)}
                >
                  ⚖️ Evaluate & Submit Judge Scorecard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Judge Scoring Modal */}
      {selectedSubmission && (
        <div className="judge-modal-backdrop" onClick={() => setSelectedSubmission(null)}>
          <div className="judge-modal-card glassmorphism" onClick={e => e.stopPropagation()}>
            <div className="judge-modal-header">
              <div>
                <span className="judge-badge-subtle">Venture Judge Rubric (0 - 10)</span>
                <h3>Evaluate: {selectedSubmission.startup_name}</h3>
              </div>
              <button className="close-btn" onClick={() => setSelectedSubmission(null)}>✕</button>
            </div>

            {submittedSuccess ? (
              <div className="judge-success-banner">
                ✓ Scorecard and constructive mentor feedback submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleScoreSubmit} className="judge-form">
                <div className="rubric-grid">
                  <div className="rubric-item">
                    <label>Problem Clarity & Urgency (1-10):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={scores.problem}
                      onChange={e => setScores({ ...scores, problem: Number(e.target.value) })}
                    />
                  </div>
                  <div className="rubric-item">
                    <label>Market Feasibility & Viability (1-10):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={scores.market}
                      onChange={e => setScores({ ...scores, market: Number(e.target.value) })}
                    />
                  </div>
                  <div className="rubric-item">
                    <label>Prototype & Technical Readiness (1-10):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={scores.feasibility}
                      onChange={e => setScores({ ...scores, feasibility: Number(e.target.value) })}
                    />
                  </div>
                  <div className="rubric-item">
                    <label>Storytelling & Presentation (1-10):</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={scores.presentation}
                      onChange={e => setScores({ ...scores, presentation: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>Judge Feedback & Growth Advice for Youth Founder:</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Highlight core strengths, validation milestones, and key challenges to explore next..."
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                  />
                </div>

                <div className="judge-modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setSelectedSubmission(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit-score">
                    Submit Final Scorecard
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
