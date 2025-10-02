@echo off
echo Démarrage de l'application React pour Nell'Faa Groupe...

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Node.js requis. Téléchargez depuis https://nodejs.org
    pause
    exit /b 1
)

REM Installer les dépendances si nécessaire
if not exist "node_modules" (
    echo Installation des dépendances...
    npm install
)

REM Démarrer l'application
echo.
echo Application: http://localhost:3000
echo Ctrl+C pour arrêter
echo.
npm start
