import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Rocket, Sparkles, Lightbulb, Target, CheckCircle2, Award, Plus, ArrowRight, ShieldCheck, ChevronRight, BookOpen } from 'lucide-react';
import LmsView from './LmsView';

export default function StudentDashboard({ onBack }) {
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeTab, setActiveTab] = useState('ideas'); // ideas, ai_evaluator, milestones
  const [loading, setLoading] = useState(true);

  // AI Idea Evaluator state
  const [evalTitle, setEvalTitle] = useState('Smart Solar Backpack');
  const [evalProblem, setEvalProblem] = useState('Students walk long distances to school under extreme sun without portable device charging for their school laptops and study tablets.');
  const [evalSolution, setEvalSolution] = useState('A lightweight ergonomic backpack with integrated flexible solar cells, battery pack, and USB-C output built from recycled ocean plastic.');
  const [evalMarket, setEvalMarket] = useState('High school and university students commuting in sunny regions.');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const res = await api.get('/startups');
      if (res.data?.success && res.data.data.length > 0) {
        setStartups(res.data.data);
        setSelectedStartup(res.data.data[0]);
      } else {
        loadMockStartup();
      }
    } catch (err) {
      loadMockStartup();
    } finally {
      setLoading(false);
    }
  };

  const loadMockStartup = () => {
    const mock = {
      id: 1,
      name: 'EcoTrack Smart Campus',
      tagline: 'Automated energy auditing and recycling rewards for schools.',
      industry: 'CleanTech & IoT',
      stage: 'prototype',
      description: 'An integrated IoT sensor kit and student mobile app that helps middle and high schools reduce electricity waste by 30% while rewarding student eco-actions.',
      ideas: [
        { id: 1, title: 'Smart Classroom Light Sensor', problem_statement: 'Empty classrooms keep lights on during sports period.', validation_status: 'validated' },
        { id: 2, title: 'Cafeteria Composting Gamification', problem_statement: 'Excess organic food waste thrown into landfill bins.', validation_status: 'testing' }
      ],
      milestones: [
        { id: 1, title: 'Interview 20 School Teachers & Principals', status: 'completed', target_date: '2026-08-20' },
        { id: 2, title: 'Build Arduino Microcontroller Prototype', status: 'in_progress', target_date: '2026-09-05' },
        { id: 3, title: 'Submit Entry to Q3 Virtual Pitch Demo Day', status: 'pending', target_date: '2026-09-26' }
      ]
    };
    setStartups([mock]);
    setSelectedStartup(mock);
  };

  const handleRunAiEvaluation = async (e) => {
    e.preventDefault();
    setEvaluating(true);
    try {
      const res = await api.post('/startups/evaluate-idea', {
        title: evalTitle,
        problem: evalProblem,
        solution: evalSolution,
        targetMarket: evalMarket
      });
      setEvaluationResult(res.data?.data || null);
    } catch (err) {
      // Offline fallback evaluator
      setEvaluationResult({
        overall_score: 84,
        rating_tier: 'High Potential Pitch',
        sub_scores: {
          problem_clarity: 22,
          solution_feasibility: 20,
          market_definition: 19,
          readiness: 23
        },
        suggestions: [
          'Specify your target bill-of-materials cost so it remains affordable for students.',
          'Interview 10 commuting students to test if they find the solar panel weight comfortable.'
        ]
      });
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 24px' }}>
      {/* Header */}
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
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Student Founder Workspace</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Build your venture, evaluate business concepts with AI, and track incubation roadmaps.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Rocket size={16} />
            Young Founder Mode
          </span>
        </div>
      </div>

      {/* Selected Startup Card */}
      {selectedStartup && (
        <div className="glass-card" style={{
          padding: '32px',
          marginBottom: '32px',
          borderLeft: '4px solid var(--primary)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>{selectedStartup.industry}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{selectedStartup.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>
                {selectedStartup.tagline}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-green" style={{ textTransform: 'capitalize' }}>
                Stage: {selectedStartup.stage}
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '900px' }}>
            {selectedStartup.description}
          </p>
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '28px' }}>
        {[
          { id: 'ideas', label: 'Business Ideas Board', icon: Lightbulb },
          { id: 'ai_evaluator', label: 'AI Pitch & Idea Scorer', icon: Sparkles },
          { id: 'milestones', label: 'Incubation Roadmap', icon: Target },
          { id: 'academy', label: 'Startup Learning Academy', icon: BookOpen }
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
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              <TabIcon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Business Ideas Board */}
      {activeTab === 'ideas' && selectedStartup && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {selectedStartup.ideas?.map(idea => (
            <div key={idea.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{idea.title}</h3>
                  <span className={`badge ${idea.validation_status === 'validated' ? 'badge-green' : 'badge-amber'}`}>
                    {idea.validation_status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {idea.problem_statement}
                </p>
              </div>
              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Customer Validation Track</span>
                <span style={{ color: 'var(--secondary)', fontSize: '0.82rem', fontWeight: 600 }}>Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AI Idea Evaluator */}
      {activeTab === 'ai_evaluator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
          {/* Input Form */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Sparkles size={22} color="#fbbf24" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>AI Business Concept Evaluator</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Powered by the Python NLP engine. Enter your idea parameters to receive an instant feasibility score and constructive mentor tips.
            </p>

            <form onSubmit={handleRunAiEvaluation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Venture Title
                </label>
                <input
                  type="text"
                  value={evalTitle}
                  onChange={(e) => setEvalTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Target Market / Early Adopters
                </label>
                <input
                  type="text"
                  value={evalMarket}
                  onChange={(e) => setEvalMarket(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Problem Statement
                </label>
                <textarea
                  rows={3}
                  value={evalProblem}
                  onChange={(e) => setEvalProblem(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  Proposed Solution & Prototype
                </label>
                <textarea
                  rows={3}
                  value={evalSolution}
                  onChange={(e) => setEvalSolution(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={evaluating}
                className="btn btn-primary"
                style={{ padding: '12px', marginTop: '10px' }}
              >
                <Sparkles size={18} />
                {evaluating ? 'Analyzing Concept...' : 'Score with AI Engine'}
              </button>
            </form>
          </div>

          {/* Result Card */}
          {evaluationResult && (
            <div className="glass-card" style={{ padding: '32px', border: '1px solid var(--border-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
                    {evaluationResult.rating_tier}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Evaluation Scorecard</h3>
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: evaluationResult.overall_score >= 80 ? '#34d399' : '#fbbf24'
                }}>
                  {evaluationResult.overall_score}/100
                </div>
              </div>

              {/* Sub-Scores */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Problem Clarity</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {evaluationResult.sub_scores.problem_clarity}/25
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Solution Feasibility</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {evaluationResult.sub_scores.solution_feasibility}/25
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Market Definition</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {evaluationResult.sub_scores.market_definition}/25
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Readiness</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    {evaluationResult.sub_scores.readiness}/25
                  </div>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
                  AI Mentor Recommendations:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {evaluationResult.suggestions?.map((tip, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={16} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Roadmap Milestones */}
      {activeTab === 'milestones' && selectedStartup && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>
            Venture Incubation Roadmap
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {selectedStartup.milestones?.map((m, idx) => (
              <div key={m.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: m.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                    color: m.status === 'completed' ? '#34d399' : '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{m.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Due: {m.target_date}</div>
                  </div>
                </div>

                <span className={`badge ${m.status === 'completed' ? 'badge-green' : m.status === 'in_progress' ? 'badge-cyan' : 'badge-primary'}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: LMS Academy */}
      {activeTab === 'academy' && (
        <LmsView />
      )}
    </div>
  );
}
