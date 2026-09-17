import React, { useState } from 'react';
import api from '../services/api';
import './LmsView.css';

const LmsView = ({ onBack }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});

  const tracks = [
    {
      id: 'track-ideation',
      title: '💡 Ideation & Problem Discovery',
      badge: 'Level 1: Beginner',
      description: 'Master how to identify urgent customer problems in your school and community.',
      lessons: [
        {
          id: 'les-1',
          title: 'Finding Problems Worth Solving',
          duration: '15 mins',
          content: 'The biggest mistake young innovators make is starting with a cool solution and searching for a problem. Real entrepreneurial ventures start with deep listening. Look for recurring frictions, manual paperwork, or wasted time in your daily life.',
          quizQuestion: 'Which problem represents a strong business opportunity for student founders?',
          options: [
            'A minor annoyance people only complain about once a year',
            'A recurring pain point users actively spend time or money trying to work around',
            'A random idea with zero evidence of user demand'
          ],
          correctAnswer: 1,
          explanation: 'Users will only adopt or pay for solutions that address genuine, persistent pain points.'
        },
        {
          id: 'les-2',
          title: 'Customer Discovery & COPPA Safe Interviews',
          duration: '20 mins',
          content: 'Customer discovery involves asking open-ended questions like "When was the last time you experienced this problem?" instead of "Would you buy my app?". Under COPPA guidelines, never collect personal identifiers or contact information from minors without parental consent.',
          quizQuestion: 'When interviewing youth under 18 for user research, what rule must be observed?',
          options: [
            'Collect their full address and phone number for future marketing',
            'Conduct anonymous surveys without collecting personal identifying information',
            'Charge them a fee to participate in the survey'
          ],
          correctAnswer: 1,
          explanation: 'COPPA compliance strictly mandates privacy safeguards and prohibits unsolicited PII collection from minors.'
        }
      ]
    },
    {
      id: 'track-business',
      title: '📊 Lean Business Canvas & Unit Economics',
      badge: 'Level 2: Intermediate',
      description: 'Calculate unit costs, gross margins, and customer acquisition strategies.',
      lessons: [
        {
          id: 'les-3',
          title: 'Pricing Your First Product or Service',
          duration: '25 mins',
          content: 'Understand the difference between Cost-Plus Pricing (Cost + markup) and Value-Based Pricing (pricing based on the economic value delivered to the customer). A sustainable business model requires a healthy gross margin to cover operations.',
          quizQuestion: 'If an educational kit costs $15 to produce and you sell it for $30, what is your gross margin percentage?',
          options: ['25%', '50%', '100%'],
          correctAnswer: 1,
          explanation: 'Gross Margin = (Selling Price - Cost) / Selling Price = ($30 - $15) / $30 = 50%.'
        }
      ]
    },
    {
      id: 'track-pitching',
      title: '🎤 Pitch Deck Creation & Live Storytelling',
      badge: 'Level 3: Advanced',
      description: 'Craft a compelling 10-slide narrative and deliver a high-impact 3-minute pitch.',
      lessons: [
        {
          id: 'les-4',
          title: 'The 3-Minute Hook & Story Arc',
          duration: '30 mins',
          content: 'The first 30 seconds must grab the judges with an relatable story or surprising statistic. Move cleanly through Problem, Solution, Market Size, Traction, Team, and the Ask.',
          quizQuestion: 'What should the opening 30 seconds of an incubator pitch accomplish?',
          options: [
            'List all technical API frameworks and backend libraries used',
            'Hook the judges with a relatable, vivid human problem statement',
            'Present 5-year complex discounted cash flow financial projections'
          ],
          correctAnswer: 1,
          explanation: 'An emotional hook makes your pitch memorable and immediately clarifies the problem you are solving.'
        }
      ]
    }
  ];

  const currentTrack = tracks[activeTrackIndex];
  const currentLesson = currentTrack.lessons[activeLessonIndex];

  const handleSelectAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
  };

  const handleVerifyQuiz = async () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentLesson.correctAnswer;

    try {
      await api.post(`/learning/lessons/${currentLesson.id}/quiz`, {
        selectedAnswer: selectedOption
      });
    } catch (err) {
      console.warn('LMS quiz submit warning:', err.message);
    }

    setQuizResult({
      passed: isCorrect,
      explanation: currentLesson.explanation
    });

    if (isCorrect) {
      setCompletedLessons(prev => ({ ...prev, [currentLesson.id]: true }));
    }
  };

  const handleLessonSwitch = (idx) => {
    setActiveLessonIndex(idx);
    setSelectedOption(null);
    setQuizResult(null);
  };

  return (
    <div className="lms-container glassmorphism" style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 24px' }}>
      {onBack && (
        <div style={{ marginBottom: '16px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
            &larr; Back to Platform Home
          </button>
        </div>
      )}

      {/* Course Header */}
      <div className="lms-header">
        <div>
          <span className="lms-badge">{currentTrack.badge}</span>
          <h2>{currentTrack.title}</h2>
          <p className="lms-subtitle">{currentTrack.description}</p>
        </div>
        <div className="track-switcher">
          {tracks.map((t, idx) => (
            <button
              key={t.id}
              className={`track-tab-btn ${activeTrackIndex === idx ? 'active' : ''}`}
              onClick={() => { setActiveTrackIndex(idx); setActiveLessonIndex(0); setSelectedOption(null); setQuizResult(null); }}
            >
              {t.title.split(' ')[0]} {t.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="lms-layout">
        {/* Sidebar Lesson List */}
        <aside className="lms-sidebar">
          <h4>Course Modules</h4>
          <div className="lessons-list">
            {currentTrack.lessons.map((les, idx) => (
              <div
                key={les.id}
                className={`lesson-item ${activeLessonIndex === idx ? 'active' : ''} ${completedLessons[les.id] ? 'completed' : ''}`}
                onClick={() => handleLessonSwitch(idx)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-status-icon">
                    {completedLessons[les.id] ? '✓' : idx + 1}
                  </span>
                  <div>
                    <div className="lesson-item-title">{les.title}</div>
                    <div className="lesson-item-time">{les.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Lesson Content */}
        <main className="lms-content-panel">
          <div className="lesson-reader">
            <h3>{currentLesson.title}</h3>
            <p className="lesson-text">{currentLesson.content}</p>

            {/* Embedded Interactive Quiz */}
            <div className="quiz-card">
              <div className="quiz-header">
                <span className="quiz-tag">Checkpoint Quiz</span>
                <span className="quiz-points">+25 Incubator XP</span>
              </div>
              <h4 className="quiz-question">{currentLesson.quizQuestion}</h4>

              <div className="quiz-options">
                {currentLesson.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    className={`quiz-opt-btn ${selectedOption === oIdx ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(oIdx)}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + oIdx)}.</span>
                    <span className="opt-text">{opt}</span>
                  </button>
                ))}
              </div>

              <div className="quiz-action-bar">
                <button
                  className="btn-check-answer"
                  disabled={selectedOption === null}
                  onClick={handleVerifyQuiz}
                >
                  Submit Answer & Earn 25 XP
                </button>
              </div>

              {quizResult && (
                <div className={`quiz-feedback-banner ${quizResult.passed ? 'passed' : 'failed'}`}>
                  <strong>{quizResult.passed ? '🎉 Excellent! Correct Answer!' : '❌ Not quite right.'}</strong>
                  <p>{quizResult.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LmsView;
