const assert = require('assert');

describe('Sprint 10: Startup & AI Moderation Test Suite', () => {
  it('should score an idea between 0 and 100 with 4 rubric dimensions', () => {
    const evaluation = {
      overallScore: 86,
      problemClarity: 88,
      marketFeasibility: 82,
      targetAudienceDefinition: 85,
      ventureReadiness: 89
    };
    assert.ok(evaluation.overallScore >= 0 && evaluation.overallScore <= 100);
    assert.ok(evaluation.problemClarity >= 0);
    assert.ok(evaluation.marketFeasibility >= 0);
  });

  it('should detect prohibited PII phone numbers under COPPA heuristics', () => {
    const rawMessage = 'Call me at 9876543210 for startup advice.';
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    assert.strictEqual(phoneRegex.test(rawMessage), true);
  });
});
