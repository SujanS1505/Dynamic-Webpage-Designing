@echo off
cd /d "%~dp0"
echo Starting Zeus Orchestrator (Python Backend on Port 8096)...
python zeus_server.py
pause
