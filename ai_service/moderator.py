"""
TeenPreneur Hub - AI Content Moderation Engine
Provides real-time text analysis, PII masking, contact leak prevention, and toxicity scoring.
"""

import re
from typing import List, Dict, Any

class ContentModerator:
    def __init__(self):
        # Regular expressions for PII & off-platform communication leaks
        self.phone_regex = re.compile(
            r'(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,12}',
            re.IGNORECASE
        )
        self.email_regex = re.compile(
            r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+',
            re.IGNORECASE
        )
        self.social_regex = re.compile(
            r'(wa\.me|t\.me|discord\.gg|instagram\.com|snapchat\.com|tiktok\.com|@[\w.]+)',
            re.IGNORECASE
        )
        
        # Prohibited terms & harassment lexicons
        self.profanity_list = {
            'abuse', 'idiot', 'stupid', 'dumb', 'hate', 'kill', 'shut up', 
            'scam', 'fraud', 'cheat', 'bitch', 'asshole', 'fuck', 'shit',
            'porn', 'nude', 'sex', 'drugs', 'weed', 'gamble'
        }
        
        self.high_risk_words = {
            'meet privately', 'don\'t tell parents', 'secret chat', 'send pics',
            'alone', 'hotel', 'cash only', 'wire money', 'crypto transfer'
        }

    def analyze_message(self, text: str) -> Dict[str, Any]:
        """
        Analyzes incoming text for safety violations and computes risk score.
        """
        if not text:
            return {"is_safe": True, "risk_score": 0.0, "violations": [], "sanitized_text": ""}

        violations = []
        sanitized = text
        risk_score = 0.0

        # Check for phone numbers
        phone_matches = self.phone_regex.findall(text)
        if phone_matches and len(re.sub(r'\D', '', text)) >= 10:
            violations.append("CONTACT_PHONE_LEAK")
            risk_score += 0.4
            sanitized = self.phone_regex.sub("[REDACTED PHONE NUMBER]", sanitized)

        # Check for external email addresses
        if self.email_regex.search(text):
            violations.append("CONTACT_EMAIL_LEAK")
            risk_score += 0.35
            sanitized = self.email_regex.sub("[REDACTED EMAIL]", sanitized)

        # Check for social media handles or chat invitation links
        if self.social_regex.search(text):
            violations.append("OFF_PLATFORM_LINK")
            risk_score += 0.4
            sanitized = self.social_regex.sub("[REDACTED SOCIAL LINK]", sanitized)

        # Check for profanity and predatory phrases
        lower_text = text.lower()
        found_profanity = [word for word in self.profanity_list if word in lower_text]
        if found_profanity:
            violations.append("PROFANITY_OR_TOXIC_LANGUAGE")
            risk_score += min(0.5, len(found_profanity) * 0.2)
            for word in found_profanity:
                pattern = re.compile(re.escape(word), re.IGNORECASE)
                sanitized = pattern.sub("*" * len(word), sanitized)

        found_high_risk = [phrase for phrase in self.high_risk_words if phrase in lower_text]
        if found_high_risk:
            violations.append("CHILD_SAFETY_PREDATORY_INDICATOR")
            risk_score += 0.7
            sanitized = "[REDACTED - CRITICAL SAFETY VIOLATION]"

        # Cap score at 1.0
        risk_score = min(1.0, risk_score)
        is_safe = risk_score < 0.5 and "CHILD_SAFETY_PREDATORY_INDICATOR" not in violations

        return {
            "is_safe": is_safe,
            "risk_score": round(risk_score, 2),
            "violations": violations,
            "sanitized_text": sanitized,
            "requires_admin_review": risk_score >= 0.35
        }
