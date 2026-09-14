import React, { useState } from 'react';
import './SupervisedChatView.css';

const SupervisedChatView = () => {
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
    },
    {
      id: 3,
      sender_name: 'Dr. Sarah Chen (Verified Mentor)',
      role: 'mentor',
      text: 'Smart iteration. Make sure to capture that in your Slide 6 traction diagram for Demo Day.',
      time: '10:24 AM',
      flagged: false
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState(null);

  const handleSend = (e) => {
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
    const newMsg = {
      id: Date.now(),
      sender_name: 'Aarav Patel (Founder)',
      role: 'student',
      text: inputMsg,
      time: 'Just now',
      flagged: false
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="supervised-chat-container glassmorphism">
      <div className="chat-header">
        <div className="chat-header-info">
          <h3>💬 Supervised Venture Mentorship Channel</h3>
          <span className="chat-safety-tag">🛡️ COPPA Monitored • Guardian Read-Access Enabled</span>
        </div>
        <div className="mentor-badge">
          <span>Mentor: Dr. Sarah Chen</span>
        </div>
      </div>

      <div className="chat-messages-area">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble-row ${m.role === 'student' ? 'student-row' : 'mentor-row'}`}>
            <div className={`chat-bubble ${m.role === 'student' ? 'student-bubble' : 'mentor-bubble'}`}>
              <div className="bubble-meta">
                <span className="sender">{m.sender_name}</span>
                <span className="time">{m.time}</span>
              </div>
              <p className="bubble-text">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      {warningMsg && (
        <div className="chat-warning-banner">
          {warningMsg}
        </div>
      )}

      <form onSubmit={handleSend} className="chat-input-bar">
        <input
          type="text"
          placeholder="Type a message to your mentor regarding startup milestones..."
          value={inputMsg}
          onChange={e => setInputMsg(e.target.value)}
        />
        <button type="submit" className="btn-chat-send">Send Message</button>
      </form>
    </div>
  );
};

export default SupervisedChatView;
