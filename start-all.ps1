Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "    TEENPRENEUR HUB: SECURE INCUBATOR PLATFORM    " -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "Starting Python AI Microservice (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\ai_service'; python server.py"

Write-Host "Starting Express.js Backend API (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\server'; npm start"

Write-Host "Starting React Vite Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\client'; npm run dev"

Write-Host ""
Write-Host "All 3 services have been launched in separate processes!" -ForegroundColor Green
Write-Host "  - Frontend:    http://localhost:5173" -ForegroundColor White
Write-Host "  - Backend API: http://localhost:5000/api/v1" -ForegroundColor White
Write-Host "  - AI Service:  http://localhost:8000/health" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan
