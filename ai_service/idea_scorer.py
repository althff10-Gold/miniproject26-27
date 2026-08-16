"""
TeenPreneur Hub - AI Business Idea & Pitch Scorer
Provides structured algorithmic scoring and constructive feedback for adolescent founders.
"""

from typing import Dict, Any, List

class IdeaEvaluator:
    def __init__(self):
        self.feasibility_keywords = {
            'prototype', 'tested', 'customers', 'feedback', 'app', 'website',
            'survey', 'users', 'pilot', 'model', 'budget', 'revenue', 'cost'
        }
        self.problem_keywords = {
            'problem', 'pain point', 'struggle', 'difficulty', 'expensive',
            'inefficient', 'lack of', 'need', 'frustration', 'waste'
        }

    def evaluate(self, title: str, problem: str, solution: str, target_market: str = "") -> Dict[str, Any]:
        """
        Evaluates a startup concept on Clarity, Feasibility, Market Definition, and Innovation.
        Returns composite score (0-100) with tailored recommendations.
        """
        title_text = (title or "").lower()
        problem_text = (problem or "").lower()
        solution_text = (solution or "").lower()
        market_text = (target_market or "").lower()

        # 1. Problem Clarity Score (0 - 25)
        problem_score = 10
        if len(problem_text.split()) >= 15:
            problem_score += 5
        if any(w in problem_text for w in self.problem_keywords):
            problem_score += 10
        problem_score = min(25, problem_score)

        # 2. Solution Feasibility Score (0 - 25)
        solution_score = 10
        if len(solution_text.split()) >= 20:
            solution_score += 5
        matches = sum(1 for w in self.feasibility_keywords if w in solution_text)
        solution_score += min(10, matches * 3)
        solution_score = min(25, solution_score)

        # 3. Market Understanding Score (0 - 25)
        market_score = 8
        if market_text and len(market_text.split()) >= 10:
            market_score += 12
        if any(demographic in market_text for demographic in ['students', 'teens', 'schools', 'parents', 'seniors', 'local', 'businesses']):
            market_score += 5
        market_score = min(25, market_score)

        # 4. Innovation & Readiness Score (0 - 25)
        innovation_score = 15
        if len(title_text) > 3 and not title_text.isnumeric():
            innovation_score += 5
        if len(problem_text) > 50 and len(solution_text) > 50:
            innovation_score += 5
        innovation_score = min(25, innovation_score)

        total_score = problem_score + solution_score + market_score + innovation_score

        # Actionable feedback for adolescent entrepreneurs
        suggestions: List[str] = []
        if problem_score < 18:
            suggestions.append("Clarify the specific pain point your target users experience daily.")
        if solution_score < 18:
            suggestions.append("Specify what minimal prototype or test you can build in the next 7 days.")
        if market_score < 18:
            suggestions.append("Narrow down your first 20 ideal customers (e.g., classmates, local shops).")
        if not suggestions:
            suggestions.append("Great foundation! Next step: talk to 5 potential customers for direct feedback.")

        rating_tier = "Emerging Concept"
        if total_score >= 80:
            rating_tier = "High Potential Pitch"
        elif total_score >= 60:
            rating_tier = "Promising Idea"

        return {
            "overall_score": total_score,
            "rating_tier": rating_tier,
            "sub_scores": {
                "problem_clarity": problem_score,
                "solution_feasibility": solution_score,
                "market_definition": market_score,
                "readiness": innovation_score
            },
            "suggestions": suggestions
        }
