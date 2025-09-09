@echo off
echo ================================================
echo     Restaurant Website Portfolio Deployment
echo ================================================
echo.

echo Checking project structure...
if not exist "sample1-modern-cafe" (
    echo ERROR: sample1-modern-cafe directory not found!
    pause
    exit /b 1
)
if not exist "sample2-vibrant-diner" (
    echo ERROR: sample2-vibrant-diner directory not found!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi" (
    echo ERROR: sample3-premium-sushi directory not found!
    pause
    exit /b 1
)

echo ✓ All sample directories found

echo.
echo Checking required files...

REM Check Sample 1 files
if not exist "sample1-modern-cafe\index.html" (
    echo ERROR: sample1-modern-cafe\index.html missing!
    pause
    exit /b 1
)
if not exist "sample1-modern-cafe\style.css" (
    echo ERROR: sample1-modern-cafe\style.css missing!
    pause
    exit /b 1
)
if not exist "sample1-modern-cafe\script.js" (
    echo ERROR: sample1-modern-cafe\script.js missing!
    pause
    exit /b 1
)
echo ✓ Sample 1 files OK

REM Check Sample 2 files
if not exist "sample2-vibrant-diner\index.html" (
    echo ERROR: sample2-vibrant-diner\index.html missing!
    pause
    exit /b 1
)
if not exist "sample2-vibrant-diner\menu.html" (
    echo ERROR: sample2-vibrant-diner\menu.html missing!
    pause
    exit /b 1
)
if not exist "sample2-vibrant-diner\style.css" (
    echo ERROR: sample2-vibrant-diner\style.css missing!
    pause
    exit /b 1
)
if not exist "sample2-vibrant-diner\script.js" (
    echo ERROR: sample2-vibrant-diner\script.js missing!
    pause
    exit /b 1
)
echo ✓ Sample 2 files OK

REM Check Sample 3 files
if not exist "sample3-premium-sushi\index.html" (
    echo ERROR: sample3-premium-sushi\index.html missing!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi\menu.html" (
    echo ERROR: sample3-premium-sushi\menu.html missing!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi\contact.html" (
    echo ERROR: sample3-premium-sushi\contact.html missing!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi\gallery.html" (
    echo ERROR: sample3-premium-sushi\gallery.html missing!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi\style.css" (
    echo ERROR: sample3-premium-sushi\style.css missing!
    pause
    exit /b 1
)
if not exist "sample3-premium-sushi\script.js" (
    echo ERROR: sample3-premium-sushi\script.js missing!
    pause
    exit /b 1
)
echo ✓ Sample 3 files OK

echo.
echo ================================================
echo     ✅ DEPLOYMENT READY!
echo ================================================
echo.
echo All files verified successfully.
echo Your restaurant portfolio is ready for deployment.
echo.
echo Next steps:
echo 1. Upload all files to your web server
echo 2. Ensure CDN resources can load (internet connection required)
echo 3. Test all three samples in a web browser
echo 4. Access any sample via its index.html file
echo.
echo Sample URLs will be:
echo - yourserver.com/sample1-modern-cafe/
echo - yourserver.com/sample2-vibrant-diner/  
echo - yourserver.com/sample3-premium-sushi/
echo.
pause
