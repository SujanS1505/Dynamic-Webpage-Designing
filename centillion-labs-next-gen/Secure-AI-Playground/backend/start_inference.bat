@echo off
cd /d "%~dp0"
echo Starting Local Model Inference Server (Port 8083)...
python local_inference_server.py
pause
