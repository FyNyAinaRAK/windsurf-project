@echo off
title Nell'Faa Groupe - Démarrage du projet
color 0A

echo ========================================
echo    NELL'FAA GROUPE MAJUNGA
echo    Démarrage du backend et du frontend
echo ========================================
echo.

:: Vérifier si Python est installé
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Erreur: Python n'est pas installé ou n'est pas dans le PATH.
    pause
    exit /b 1
)

:: Vérifier si Node.js est installé
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Erreur: Node.js n'est pas installé ou n'est pas dans le PATH.
    pause
    exit /b 1
)

:: Vérifier et configurer l'environnement backend
echo Configuration du backend Django...
cd backend

:: Vérifier si le fichier .env existe, sinon le créer
if not exist ".env" (
    echo Création du fichier .env...
    @"
    DATABASE_URL=sqlite:///db.sqlite3
    DEBUG=True
    SECRET_KEY=change-this-to-a-secure-key-in-production
    ALLOWED_HOSTS=localhost,127.0.0.1
    "@ > .env
    echo Fichier .env créé avec la configuration par défaut.
)

:: Installer les dépendances Python
echo Installation des dépendances Python...
python -m pip install --upgrade pip
if exist "requirements.txt" (
    pip install -r requirements.txt
)

:: Appliquer les migrations
echo Application des migrations...
python manage.py migrate

:: Démarrer le serveur backend dans une nouvelle fenêtre
echo Démarrage du backend Django...
start "Django Backend" cmd /k "cd /d %~dp0backend && python manage.py runserver"

:: Donner un peu de temps au backend pour démarrer
timeout /t 5 /nobreak >nul

:: Configurer et démarrer le frontend
echo Configuration du frontend...
cd ..\frontend

:: Installer les dépendances Node.js si nécessaire
if not exist "node_modules" (
    echo Installation des dépendances Node.js...
    npm install
)

:: Démarrer le serveur de développement React
echo Démarrage du frontend React...
start "React Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo    Les serveurs sont en cours de démarrage...
echo    - Backend: http://localhost:8000
echo    - Admin:   http://localhost:8000/admin
echo    - Frontend: http://localhost:3000
echo ========================================
echo.
pause

pause
