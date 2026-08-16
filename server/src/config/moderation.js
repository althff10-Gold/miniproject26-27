/**
 * Content Moderation Configuration
 * Rule-based filtering system for message moderation
 */
const moderationConfig = {
  // Prohibited words/phrases (case-insensitive)
  prohibitedWords: [
    // Profanity
    'damn', 'hell', 'crap', 'stupid', 'idiot', 'dumb', 'moron',
    'shut up', 'loser', 'hate you', 'kill',
    // Personal info patterns
    'my phone number', 'my address', 'where i live',
    // Inappropriate content for minors
    'drugs', 'alcohol', 'gambling', 'betting',
    // Spam indicators
    'click here', 'free money', 'earn cash fast', 'limited offer'
  ],

  // Regex patterns for detecting sensitive information
  patterns: [
    {
      name: 'phone_number',
      regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
      severity: 'medium',
      reason: 'Potential phone number detected'
    },
    {
      name: 'email_address',
      regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      severity: 'low',
      reason: 'Email address detected in message'
    },
    {
      name: 'url',
      regex: /https?:\/\/[^\s]+/g,
      severity: 'low',
      reason: 'URL detected in message'
    },
    {
      name: 'excessive_caps',
      regex: /[A-Z\s]{15,}/g,
      severity: 'low',
      reason: 'Excessive capitalization detected'
    }
  ],

  // Severity weights for scoring
  severityWeights: {
    low: 1,
    medium: 3,
    high: 5,
    critical: 10
  },

  // Auto-flag threshold (total severity score)
  autoFlagThreshold: 3,

  // Maximum message length
  maxMessageLength: 2000
};

module.exports = moderationConfig;
