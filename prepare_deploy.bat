@echo off
echo Préparation du déploiement...

cd frontend
call npm run build
cd ..

if not exist "deploy" mkdir deploy
xcopy /E /I /Y "frontend\build\*" "deploy\"
copy "frontend\public\.htaccess" "deploy\"

powershell Compress-Archive -Path "deploy\*" -DestinationPath "windsurf-site.zip" -Force

echo.
echo Terminé ! Le fichier 'windsurf-site.zip' est prêt à être téléversé.
pause
