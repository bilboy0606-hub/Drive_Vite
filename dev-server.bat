@echo off
REM Windows batch file for local testing

echo Starting local development environment...
echo.

REM Start PHP server on port 8000
echo Starting PHP server on http://localhost:8000/api ...
start "PHP Server" cmd /k "cd api && php -S localhost:8000"

REM Give PHP server time to start
timeout /t 2 /nobreak

REM Start Vite dev server
echo Starting Vite dev server on http://localhost:5173 ...
npm run dev

pause
