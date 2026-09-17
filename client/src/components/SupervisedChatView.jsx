import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './SupervisedChatView.css';

const SupervisedChatView = ({ onBack }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender_name: 'Dr. Sarah Chen (Verified Mentor)',
      role: 'mentor',
      text: 'Hello Aarav! I reviewed the latest benchmark data for the EcoTrack image classification module. Testing under low lighting showed 91% accuracy.',
      time: '10:15 AM',
      flagged: false
    },
    {
      id: 2,
      sender_name: 'Aarav Patel (Founder)',
      role: 'student',
      text: 'Thanks Dr. Chen! We added contrast normalization to handle cafeteria shadows during lunch hours.',
      time: '10:19 AM',
      flagged: false
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages/channel/mentor-student-1');
      if (res.data?.success && res.data.data?.length > 0) {
        setMessages(res.data.data.map(m => ({
          id: m.id,
          sender_name: m.sender_name || (m.sender_role === 'mentor' ? 'Dr. Sarah Chen (Mentor)' : 'Aarav Patel (Student)'),
          role: m.sender_role || 'student',
          text: m.content || m.message_text || m.text,
          time: new Date(m.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          flagged: m.is_flagged || false
        })));
      }
    } catch (err) {
      console.warn('Chat fetch error:', err.message);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    // AI Safety scan on client
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const personalEmailRegex = /[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail)\.com/gi;

    if (phoneRegex.test(inputMsg) || personalEmailRegex.test(inputMsg)) {
      setWarningMsg('⚠️ COPPA Safety Alert: Sharing personal phone numbers or direct personal email addresses is prohibited in supervised youth channels.');
      return;
    }

    setWarningMsg(null);
    const msgText = inputMsg;
    setInputMsg('');

    try {
      const res = await api.post('/messages/channel/mentor-student-1', {
        message: msgText
      });
      if (res.data?.data?.is_flagged) {
        setWarningMsg('⚠️ Message flagged by AI Content Moderation for review.');
      }
      fetchMessages();
    } catch (err) {
      // Local fallback
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender_name: user ? `${user.firstName} ${user.lastName} (${user.role})` : 'Aarav Patel (Founder)',
          role: user?.role || 'student',
          text: msgText,
          time: 'Just now',
          flagged: false
        }
      ]);
    }
  };

  return (
    <div className="supervised-chat-container glassmorphism" style={{ maxWidth: '900px', margin: '30px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '14px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
          &larr; Back to Platform Home
        </button>
      </div>

      <div className="chat-header">
        <div className="chat-header-info">
          <h3>💬 Supervised Venture Mentorship Channel</h3>
          <span className="chat-safety-tag">🛡️ COPPA Monitored • Guardian Read-Access Enabled</span>
        </div>
        <div className="mentor-badge">
          <span>Mentor: Dr. Sarah Chen</span>
        </div>
      </div>

      {warningMsg && (
        <div className="chat-warning-banner">
          <span>{warningMsg}</span>
        </div>
      )}

      <div className="messages-thread">
        {messages.map((m) => (
          <div key={m.id} className={`message-bubble ${m.role}`}>
            <div className="message-meta">
              <span className="sender-tag">{m.sender_name}</span>
              <span className="timestamp">{m.time}</span>
            </div>
            <p className="message-content">{m.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-input-bar">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type message to mentor (all interactions are safety moderated)..."
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SupervisedChatView;
