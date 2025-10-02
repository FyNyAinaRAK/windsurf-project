@echo off
echo Démarrage du serveur Django pour Nell'Faa Groupe...

REM Activer l'environnement virtuel ou le créer s'il n'existe pas
if not exist "venv" (
    echo Création de l'environnement virtuel...
    python -m venv venv
)
call venv\Scripts\activate

REM Installer/mettre à jour les dépendances
echo Installation des dépendances...
pip install -q -r requirements.txt

REM Créer le fichier .env s'il n'existe pas
if not exist ".env" (
    copy .env.example .env
    echo ATTENTION: Configurez le fichier .env avant de continuer
    pause
)

REM Appliquer les migrations
echo Application des migrations...
python manage.py migrate --verbosity=1

REM Démarrer le serveur
echo.
echo Serveur: http://localhost:8001
echo Admin: http://localhost:8001/admin
echo API: http://localhost:8001/api
echo.
python manage.py runserver 8001
