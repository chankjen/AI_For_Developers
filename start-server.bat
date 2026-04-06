@echo off
REM AI FOR DEVELOPERS - Quick Start Script for Windows
REM Starts a local web server to view the interactive website

echo.
echo ╔═════════════════════════════════════════════════════════════╗
echo ║  AI FOR DEVELOPERS: Interactive Learning Website           ║
echo ║  Supercharging Your Development Workflow                   ║
echo ╚═════════════════════════════════════════════════════════════╝
echo.
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [✓] Starting web server with Python...
    echo.
    echo [🌐] Opening at: http://localhost:8000
    echo.
    echo [!] Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    exit /b 0
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [✓] Starting web server with Node.js...
    echo.
    echo [🌐] Opening at: http://localhost:8080
    echo.
    echo [!] Press Ctrl+C to stop the server
    echo.
    
    REM Check if http-server is installed
    npx http-server
    exit /b 0
)

REM If neither is available, show error
echo [✗] Error: No suitable web server found.
echo.
echo Please install one of the following:
echo   • Python 3: https://www.python.org/
echo   • Node.js: https://nodejs.org/
echo.
echo After installation, run this script again.
echo.
pause
exit /b 1
