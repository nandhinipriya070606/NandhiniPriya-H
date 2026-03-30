@echo off
REM Start E-Commerce Website Application
REM This script will start both backend and frontend servers

echo ==========================================
echo E-Commerce Website - Startup Script
echo ==========================================
echo.
echo Starting backend server...
start cmd /k "cd backend && npm install && npm start"

timeout /t 5 /nobreak

echo.
echo Starting frontend server...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo ==========================================
echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin: http://localhost:3000/admin
echo ==========================================
echo.
echo Please wait a few moments for the servers to fully start...
