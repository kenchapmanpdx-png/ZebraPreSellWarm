@echo off
REM Double-click to push the prepared commit to GitHub.
REM Calls PUSH.ps1 with execution policy bypass.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0PUSH.ps1"
pause
