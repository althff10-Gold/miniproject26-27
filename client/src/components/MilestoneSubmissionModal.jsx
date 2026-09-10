import React, { useState } from 'react';
import './MilestoneSubmissionModal.css';

const MilestoneSubmissionModal = ({ isOpen, onClose, milestone, onEvidenceSubmitted }) => {
  const [evidenceText, setEvidenceText] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !milestone) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      if (onEvidenceSubmitted) {
        onEvidenceSubmitted({
          ...milestone,
          status: 'submitted',
          evidence_text: evidenceText,
          evidence_url: evidenceUrl
        });
      }
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="milestone-modal-backdrop" onClick={onClose}>
      <div className="milestone-modal-card glassmorphism" onClick={e => e.stopPropagation()}>
        <div className="milestone-modal-header">
          <div>
            <span className="milestone-badge-subtle">Milestone Evidence Submission</span>
            <h3>{milestone.title}</h3>
          </div>
          <button className="milestone-close-btn" onClick={onClose}>✕</button>
        </div>

        {success ? (
          <div className="milestone-success-box">
            <div className="success-icon">🎉</div>
            <h4>Evidence Successfully Submitted!</h4>
            <p>Your verified incubator mentor has been notified to review your submission and award readiness points.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="milestone-form">
            <p className="milestone-guidance">
              Provide verifiable proof of your milestone progress (e.g. user interview summaries, code repository link, CAD designs, or prototype demonstration videos).
            </p>

            <div className="form-group">
              <label>Artifact / Demonstration Link (GitHub, Google Drive, Loom, YouTube):</label>
              <input
                type="url"
                required
                placeholder="https://github.com/my-student-project/demo"
                value={evidenceUrl}
                onChange={e => setEvidenceUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Evidence Description & Summary Findings:</label>
              <textarea
                rows="4"
                required
                placeholder="Explain the results of your tests, key user quotes, metrics achieved, and challenges encountered..."
                value={evidenceText}
                onChange={e => setEvidenceText(e.target.value)}
              />
            </div>

            <div className="milestone-coppa-notice">
              🛡️ <strong>Safety Reminder:</strong> Do not upload photos of other students or disclose personal contact details.
            </div>

            <div className="milestone-modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Evidence to Mentor'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MilestoneSubmissionModal;
