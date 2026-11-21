@echo off
cd /d "%~dp0"
where py >nul 2>&1 && py -3 create_banner.py && goto :done
where python >nul 2>&1 && python create_banner.py && goto :done
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0create_banner.ps1"
:done
echo.
dir "youtube-banner*.png"
pause
