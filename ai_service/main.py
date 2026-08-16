"""
TeenPreneur Hub - AI & Content Moderation Microservice
FastAPI Application serving NLP moderation, Pitch Evaluation, and Mentor Matching.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from moderator import ContentModerator
from idea_scorer import IdeaEvaluator

app = FastAPI(
    title="TeenPreneur Hub AI & Moderation Service",
    description="Microservice providing supervised child-safety moderation and startup evaluation.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

moderator = ContentModerator()
evaluator = IdeaEvaluator()

class ModerationRequest(BaseModel):
    text: str = Field(..., description="Message text to inspect")
    sender_role: Optional[str] = Field("student", description="Role of message sender")

class IdeaEvaluationRequest(BaseModel):
    title: str = Field(..., description="Startup idea name")
    problem: str = Field(..., description="Problem description")
    solution: str = Field(..., description="Proposed solution")
    target_market: Optional[str] = Field("", description="Target demographics")

class MentorMatchRequest(BaseModel):
    industry: str
    stage: str
    mentors: List[Dict[str, Any]]

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "TeenPreneur Hub AI Microservice",
        "version": "1.0.0"
    }

@app.post("/moderate")
def moderate_text(payload: ModerationRequest):
    try:
        result = moderator.analyze_message(payload.text)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate-idea")
def evaluate_idea(payload: IdeaEvaluationRequest):
    try:
        result = evaluator.evaluate(
            title=payload.title,
            problem=payload.problem,
            solution=payload.solution,
            target_market=payload.target_market
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/match-mentors")
def match_mentors(payload: MentorMatchRequest):
    try:
        ranked = []
        target_industry = payload.industry.lower()
        for mentor in payload.mentors:
            expertise = (mentor.get("expertise_areas") or "").lower()
            score = 50
            if target_industry in expertise:
                score += 40
            score += min(10, int(mentor.get("years_experience", 0)))
            ranked.append({
                "mentor_id": mentor.get("id"),
                "name": mentor.get("name"),
                "match_score": min(100, score),
                "rationale": f"Matches industry '{payload.industry}' with {mentor.get('years_experience', 0)} years experience."
            })
        ranked.sort(key=lambda x: x["match_score"], reverse=True)
        return {"success": True, "data": ranked}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
