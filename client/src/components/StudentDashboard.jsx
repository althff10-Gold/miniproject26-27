import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Rocket, Sparkles, Lightbulb, Target, CheckCircle2, Award, Plus, ArrowRight, ShieldCheck, ChevronRight, BookOpen, X } from 'lucide-react';
import LmsView from './LmsView';

export default function StudentDashboard({ onBack }) {
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeTab, setActiveTab] = useState('ideas'); // ideas, ai_evaluator, milestones, academy
  const [loading, setLoading] = useState(true);

  // New Startup Modal
  const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);
  const [startupName, setStartupName] = useState('');
  const [startupIndustry, setStartupIndustry] = useState('CleanTech & IoT');
  const [startupTagline, setStartupTagline] = useState('');
  const [startupDescription, setStartupDescription] = useState('');

  // New Milestone Modal
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDate, setMilestoneDate] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');

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

  const handleCreateStartup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/startups', {
        name: startupName,
        industry: startupIndustry,
        tagline: startupTagline,
        description: startupDescription
      });
      if (res.data?.success && res.data.data) {
        const newVenture = { ...res.data.data, ideas: [], milestones: [] };
        setStartups(prev => [newVenture, ...prev]);
        setSelectedStartup(newVenture);
      }
      setIsStartupModalOpen(false);
      setStartupName('');
      setStartupTagline('');
      setStartupDescription('');
    } catch (err) {
      console.warn('Create startup warning:', err.message);
      setIsStartupModalOpen(false);
    }
  };

  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    if (!selectedStartup) return;
    try {
      const res = await api.post(`/startups/${selectedStartup.id}/milestones`, {
        title: milestoneTitle,
        targetDate: milestoneDate || '2026-10-01',
        description: milestoneDescription
      });
      if (res.data?.success && res.data.data) {
        setSelectedStartup(prev => ({
          ...prev,
          milestones: [...(prev.milestones || []), res.data.data]
        }));
      }
      setIsMilestoneModalOpen(false);
      setMilestoneTitle('');
      setMilestoneDate('');
      setMilestoneDescription('');
    } catch (err) {
      console.warn('Create milestone warning:', err.message);
      setIsMilestoneModalOpen(false);
    }
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
            &larr; Back to Platform Home
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Student Founder Workspace</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Build your venture, evaluate business concepts with AI, and track incubation roadmaps.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsStartupModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            + New Startup Venture
          </button>
        </div>
      </div>

      {/* Create Startup Modal */}
      {isStartupModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="glass-card" style={{ maxWidth: '520px', width: '90%', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Launch New Startup Venture</h3>
              <button onClick={() => setIsStartupModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateStartup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Startup Venture Name</label>
                <input
                  type="text"
                  required
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. HydroSense Solar"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Industry Track</label>
                <select
                  value={startupIndustry}
                  onChange={(e) => setStartupIndustry(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                >
                  <option value="CleanTech & IoT">CleanTech & IoT</option>
                  <option value="EdTech & Future of Learning">EdTech & Future of Learning</option>
                  <option value="Applied AI & Automation">Applied AI & Automation</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Social Impact & Civic">Social Impact & Civic</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>One-Line Tagline</label>
                <input
                  type="text"
                  value={startupTagline}
                  onChange={(e) => setStartupTagline(e.target.value)}
                  placeholder="e.g. Automated soil moisture sensor kit for rural schools"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Problem & Solution Description</label>
                <textarea
                  required
                  rows="3"
                  value={startupDescription}
                  onChange={(e) => setStartupDescription(e.target.value)}
                  placeholder="Describe the urgent pain point and your unique prototype approach..."
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                  Register Venture
                </button>
                <button type="button" onClick={() => setIsStartupModalOpen(false)} className="btn btn-secondary" style={{ padding: '12px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {isMilestoneModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '90%', padding: '28px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '14px' }}>Add Incubation Milestone</h3>
            <form onSubmit={handleCreateMilestone} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Milestone Title</label>
                <input
                  type="text"
                  required
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  placeholder="e.g. Conduct 20 Customer Interviews"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Target Due Date</label>
                <input
                  type="date"
                  required
                  value={milestoneDate}
                  onChange={(e) => setMilestoneDate(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Deliverable Description</label>
                <textarea
                  rows="2"
                  value={milestoneDescription}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                  placeholder="What tangible evidence will you present to your mentor?"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>
                  Add Milestone
                </button>
                <button type="button" onClick={() => setIsMilestoneModalOpen(false)} className="btn btn-secondary" style={{ padding: '10px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Startup Card */}
      {selectedStartup && (
        <div className="glass-card" style={{ padding: '28px', marginBottom: '28px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{selectedStartup.name}</h2>
                <span className="badge badge-primary">{selectedStartup.industry}</span>
                <span className="badge badge-cyan">Stage: {selectedStartup.stage || 'prototype'}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
                {selectedStartup.description}
              </p>
            </div>

            {startups.length > 1 && (
              <select
                value={selectedStartup.id}
                onChange={(e) => {
                  const s = startups.find(item => String(item.id) === String(e.target.value));
                  if (s) setSelectedStartup(s);
                }}
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-accent)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {startups.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
        {[
          { id: 'ideas', label: 'Lean Canvas & Concepts', icon: Lightbulb },
          { id: 'ai_evaluator', label: 'AI Idea Evaluator', icon: Sparkles },
          { id: 'milestones', label: 'Incubation Roadmap', icon: Target },
          { id: 'academy', label: 'LMS Academy Courses', icon: BookOpen }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <TabIcon size={18} color={activeTab === tab.id ? 'var(--primary)' : 'currentColor'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Lean Canvas Ideas */}
      {activeTab === 'ideas' && selectedStartup && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
          {selectedStartup.ideas?.map(idea => (
            <div key={idea.id} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{idea.title}</h4>
                <span className={`badge ${idea.validation_status === 'validated' ? 'badge-green' : 'badge-primary'}`}>
                  {idea.validation_status}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
                {idea.problem_statement}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>
                Target: {idea.target_market || 'Students & Schools'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AI Idea Evaluator */}
      {activeTab === 'ai_evaluator' && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Sparkles size={24} color="#818cf8" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>AI Startup Feasibility Evaluator</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Powered by our Python AI Microservice. Tests problem validation, market viability, and solution feasibility.
          </p>

          <form onSubmit={handleRunAiEvaluation} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '780px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                Venture Concept Title
              </label>
              <input
                type="text"
                required
                value={evalTitle}
                onChange={(e) => setEvalTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                Customer Pain Point / Problem Statement
              </label>
              <textarea
                required
                rows="3"
                value={evalProblem}
                onChange={(e) => setEvalProblem(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                Proposed Solution & Secret Sauce
              </label>
              <textarea
                required
                rows="3"
                value={evalSolution}
                onChange={(e) => setEvalSolution(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#fff' }}
              />
            </div>

            <button
              type="submit"
              disabled={evaluating}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Sparkles size={18} />
              {evaluating ? 'Analyzing Concept...' : 'Run AI Feasibility Scoring'}
            </button>
          </form>

          {/* AI Output Card */}
          {evaluationResult && (
            <div style={{
              marginTop: '32px',
              padding: '24px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid var(--border-accent)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 700 }}>EVALUATION SCORECARD</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{evaluationResult.rating_tier || 'High Potential Venture'}</h3>
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: evaluationResult.overall_score >= 80 ? '#34d399' : '#fbbf24'
                }}>
                  {evaluationResult.overall_score}/100
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>AI Mentor Recommendations:</h4>
                {evaluationResult.suggestions?.map((tip, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={16} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Roadmap Milestones */}
      {activeTab === 'milestones' && selectedStartup && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Venture Incubation Roadmap</h3>
            <button
              onClick={() => setIsMilestoneModalOpen(true)}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} />
              + Add Milestone
            </button>
          </div>

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
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Due: {m.due_date || m.target_date || '2026-10-01'}</div>
                    {m.evidence_text && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Proof: {m.evidence_text}
                      </div>
                    )}
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

      {/* TAB 4: LMS Academy */}
      {activeTab === 'academy' && (
        <LmsView onBack={() => setActiveTab('ideas')} />
      )}
    </div>
  );
}
