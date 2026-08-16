"""
TeenPreneur Hub - AI Microservice Server
Standalone HTTP Server with zero external dependency requirement (pure Python 3 standard library).
Can be run via: python server.py
Supports POST /moderate, POST /evaluate-idea, POST /match-mentors, and GET /health
"""

import json
import http.server
import socketserver
from urllib.parse import urlparse
from moderator import ContentModerator
from idea_scorer import IdeaEvaluator

PORT = 8000
moderator = ContentModerator()
evaluator = IdeaEvaluator()

class AIServiceHandler(http.server.BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code: int, data: dict):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ["/health", "/"]:
            self._send_json(200, {
                "status": "healthy",
                "service": "TeenPreneur Hub AI Microservice",
                "version": "1.0.0",
                "runtime": "Python 3.12 (Standard Library)"
            })
        else:
            self._send_json(404, {"error": "Not Found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            payload = json.loads(body) if body else {}
        except Exception:
            self._send_json(400, {"error": "Invalid JSON payload"})
            return

        if parsed.path == "/moderate":
            text = payload.get("text", "")
            result = moderator.analyze_message(text)
            self._send_json(200, {"success": True, "data": result})

        elif parsed.path == "/evaluate-idea":
            title = payload.get("title", "")
            problem = payload.get("problem", "")
            solution = payload.get("solution", "")
            target_market = payload.get("target_market", "")
            result = evaluator.evaluate(title, problem, solution, target_market)
            self._send_json(200, {"success": True, "data": result})

        elif parsed.path == "/match-mentors":
            industry = payload.get("industry", "").lower()
            mentors = payload.get("mentors", [])
            ranked = []
            for m in mentors:
                expertise = (m.get("expertise_areas") or "").lower()
                score = 50
                if industry in expertise:
                    score += 40
                score += min(10, int(m.get("years_experience", 0)))
                ranked.append({
                    "mentor_id": m.get("id"),
                    "name": m.get("name"),
                    "match_score": min(100, score),
                    "rationale": f"Matches industry '{industry}' with {m.get('years_experience', 0)} years experience."
                })
            ranked.sort(key=lambda x: x["match_score"], reverse=True)
            self._send_json(200, {"success": True, "data": ranked})

        else:
            self._send_json(404, {"error": "Not Found"})

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AIServiceHandler) as httpd:
        print(f"[AI Service] TeenPreneur Hub AI Microservice running on http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
