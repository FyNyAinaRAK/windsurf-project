@echo off
echo ========================================
echo   Nell'Faa Groupe - Démarrage Complet
echo ========================================
echo.

REM Définir les variables d'environnement pour supprimer les warnings
set NODE_OPTIONS=--no-deprecation --max_old_space_size=4096
set GENERATE_SOURCEMAP=false
set SKIP_PREFLIGHT_CHECK=true

echo [1/4] Préparation du backend Django...
cd backend

REM Vérifier si l'environnement virtuel existe
if not exist "venv" (
    echo Création de l'environnement virtuel...
    python -m venv venv
)

REM Activer l'environnement virtuel
call venv\Scripts\activate

REM Installer les dépendances
echo Installation des dépendances Django...
pip install -r requirements.txt

REM Créer le fichier .env s'il n'existe pas
if not exist ".env" (
    echo Création du fichier .env...
    copy .env.example .env
)

REM Effectuer les migrations
echo Application des migrations...
python manage.py makemigrations
python manage.py migrate

echo [2/4] Démarrage du serveur Django...
start "Django Backend" cmd /k "cd /d %CD% && call venv\Scripts\activate && python manage.py runserver 8001"

echo [3/4] Préparation du frontend React...
cd ..\frontend

echo Installation des dépendances React...
call npm install

echo [4/4] Démarrage du serveur React...
start "React Frontend" cmd /k "cd /d %CD% && set NODE_OPTIONS=--no-deprecation --max_old_space_size=4096 && npm start"

echo.
echo ========================================
echo   Serveurs démarrés avec succès!
echo ========================================
echo   Backend:  http://localhost:8001
echo   Frontend: http://localhost:3000
echo   Admin:    http://localhost:8001/admin
echo   API:      http://localhost:8001/api
echo ========================================
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause > nul
