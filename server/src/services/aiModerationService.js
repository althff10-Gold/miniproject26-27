const logger = require('../config/logger');

class AIModerationService {
  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  }

  /**
   * Evaluate a business idea using the Python microservice or fallback heuristic
   */
  async evaluateIdea(title, problem, solution, targetMarket = '') {
    try {
      const response = await fetch(`${this.aiServiceUrl}/evaluate-idea`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          problem,
          solution,
          target_market: targetMarket
        }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.success) return data.data;
      }
    } catch (err) {
      logger.warn(`Python AI service unreachable (${err.message}). Using native heuristic evaluation fallback.`);
    }

    // Native Node.js fallback evaluation engine
    const probLen = (problem || '').split(' ').length;
    const solLen = (solution || '').split(' ').length;
    const mktLen = (targetMarket || '').split(' ').length;

    let problemScore = Math.min(25, 12 + Math.floor(probLen / 5));
    let solutionScore = Math.min(25, 10 + Math.floor(solLen / 5));
    let marketScore = Math.min(25, 10 + Math.floor(mktLen / 5));
    let readinessScore = 20;

    const total = problemScore + solutionScore + marketScore + readinessScore;

    return {
      overall_score: total,
      rating_tier: total >= 80 ? 'High Potential Pitch' : total >= 60 ? 'Promising Idea' : 'Emerging Concept',
      sub_scores: {
        problem_clarity: problemScore,
        solution_feasibility: solutionScore,
        market_definition: marketScore,
        readiness: readinessScore
      },
      suggestions: [
        'Validate with at least 5 potential student or teacher users this week.',
        'Define a clear metric for your first prototype test.'
      ]
    };
  }

  /**
   * Moderate incoming text using Python microservice or local fallback
   */
  async moderateText(text) {
    try {
      const response = await fetch(`${this.aiServiceUrl}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.success) return data.data;
      }
    } catch (err) {
      logger.warn(`Python AI moderation service unreachable (${err.message}). Using native regex filter.`);
    }

    // Native fallback moderation
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,12}/gi;
    const emailRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/gi;
    
    let sanitized = text;
    let isFlagged = false;

    if (phoneRegex.test(text)) {
      sanitized = sanitized.replace(phoneRegex, '[REDACTED PHONE]');
      isFlagged = true;
    }
    if (emailRegex.test(text)) {
      sanitized = sanitized.replace(emailRegex, '[REDACTED EMAIL]');
      isFlagged = true;
    }

    return {
      is_safe: !isFlagged,
      risk_score: isFlagged ? 0.7 : 0.0,
      violations: isFlagged ? ['CONTACT_INFO_LEAK'] : [],
      sanitized_text: sanitized,
      requires_admin_review: isFlagged
    };
  }
}

module.exports = new AIModerationService();
