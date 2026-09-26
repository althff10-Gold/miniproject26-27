@echo off
title TeenPreneur Hub - Launcher
echo ===================================================
echo     TEENPRENEUR HUB: SECURE INCUBATOR PLATFORM
echo ===================================================
echo Starting Python AI Microservice (Port 8000)...
start "TeenPreneur AI Service" cmd /k "cd ai_service && python server.py"

echo Starting Express.js Backend API (Port 5000)...
start "TeenPreneur Backend API" cmd /k "cd server && npm start"

echo Starting React Vite Frontend (Port 5173)...
start "TeenPreneur Frontend" cmd /k "cd client && npm run dev"

echo.
echo All services launched!
echo - Frontend:    http://localhost:5173
echo - Backend API: http://localhost:5000/api/v1
echo - AI Service:  http://localhost:8000/health
echo ===================================================
pause
