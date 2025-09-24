@echo off
echo Démarrage de l'application React pour Nell'Faa Groupe...
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH
    echo Veuillez installer Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

REM Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo Installation des dépendances npm...
    npm install
)

REM Démarrer l'application React
echo.
echo Démarrage de l'application React sur http://localhost:3000
echo.
echo L'application s'ouvrira automatiquement dans votre navigateur
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.

npm start

pause
