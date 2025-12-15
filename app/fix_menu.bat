@echo off
:: ======================================
:: Next.js Menu Fix for Windows (1-click)
:: ======================================

:: Create About pages
mkdir "app\about\our-story" 2>nul
echo export default function Page() { return ^<h1^>Our Story^</h1^> } > "app\about\our-story\page.tsx"

mkdir "app\about\mission-vision" 2>nul
echo export default function Page() { return ^<h1^>Mission ^& Vision^</h1^> } > "app\about\mission-vision\page.tsx"

mkdir "app\about\contact" 2>nul
echo export default function Page() { return ^<h1^>Contact Us^</h1^> } > "app\about\contact\page.tsx"

:: Create Course pages
mkdir "app\courses\iics-combo" 2>nul
echo export default function Page() { return ^<h1^>IICS Combo Course^</h1^> } > "app\courses\iics-combo\page.tsx"

mkdir "app\courses\iics" 2>nul
echo export default function Page() { return ^<h1^>IICS Course^</h1^> } > "app\courses\iics\page.tsx"

mkdir "app\courses\powercenter" 2>nul
echo export default function Page() { return ^<h1^>PowerCenter Course^</h1^> } > "app\courses\powercenter\page.tsx"

mkdir "app\courses\sql" 2>nul
echo export default function Page() { return ^<h1^>SQL Training^</h1^> } > "app\courses\sql\page.tsx"

mkdir "app\courses\snowflake" 2>nul
echo export default function Page() { return ^<h1^>Snowflake Course^</h1^> } > "app\courses\snowflake\page.tsx"

:: Completion message
echo.
echo ✅ All menu pages created successfully!
echo Restart your dev server with: npm run dev
pause