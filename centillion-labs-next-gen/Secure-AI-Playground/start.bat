@echo off
setlocal EnableDelayedExpansion
title Secure AI Playground — Launcher

echo.
echo  =====================================================
echo    SECURE AI PLAYGROUND  --  Full Stack Launcher
echo  =====================================================
echo.
echo  This script starts all three required services:
echo    [1]  Local Inference Server    (port 8083)
echo    [2]  Zeus Orchestrator Backend (port 8096)
echo    [3]  Playground Frontend UI    (port 5174)
echo.

:: ── Check Python is available ───────────────────────────────────────────────
where python >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found on PATH.
    echo  Activate your virtualenv first, then re-run this script.
    echo  Example:  ..\..\.venv\Scripts\activate.bat
    pause
    exit /b 1
)

:: ── Check Node / npm is available ───────────────────────────────────────────
where npm >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] npm not found on PATH.  Please install Node.js.
    pause
    exit /b 1
)

echo  [1/3] Launching Local Inference Server on port 8083 ...
start "Secure-AI :: Inference  (8083)" cmd /k "cd /d "%~dp0backend" && echo. && echo  [Inference Server] Starting... && python local_inference_server.py"
timeout /t 3 /nobreak >nul

echo  [2/3] Launching Zeus Orchestrator Backend on port 8096 ...
start "Secure-AI :: Backend    (8096)" cmd /k "cd /d "%~dp0backend" && echo. && echo  [Zeus Backend] Starting... && python zeus_server.py"
timeout /t 3 /nobreak >nul

echo  [3/3] Launching Playground Frontend on port 5174 ...
start "Secure-AI :: Frontend   (5174)" cmd /k "cd /d "%~dp0frontend" && echo. && echo  [Frontend] Installing deps if needed... && npm install && npm run dev"

echo.
echo  =====================================================
echo   All services launched in separate windows.
echo.
echo   Inference Server  -^>  http://localhost:8083
echo   Zeus Backend      -^>  http://localhost:8096
echo   Playground UI     -^>  http://localhost:5174
echo.
echo   Access from Centillion: open the sidebar and click
echo   "Secure AI" (item 11) while viewing localhost:5173
echo  =====================================================
echo.
echo  This launcher window can be closed safely.
echo  To stop all services, close their individual windows.
echo.
pause
