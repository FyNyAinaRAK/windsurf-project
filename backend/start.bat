@echo off
echo Démarrage du serveur Django pour Nell'Faa Groupe...
echo.

REM Vérifier si l'environnement virtuel existe
if not exist "venv" (
    echo Création de l'environnement virtuel...
    python -m venv venv
)

REM Activer l'environnement virtuel
call venv\Scripts\activate

REM Installer les dépendances
echo Installation des dépendances...
pip install -r requirements.txt

REM Créer le fichier .env s'il n'existe pas
if not exist ".env" (
    echo Création du fichier .env...
    copy .env.example .env
    echo ATTENTION: Veuillez configurer votre fichier .env avant de continuer
    pause
)

REM Effectuer les migrations
echo Application des migrations...
python manage.py makemigrations
python manage.py migrate

REM Créer un superutilisateur si nécessaire
echo.
echo Voulez-vous créer un superutilisateur? (o/n)
set /p create_super=
if /i "%create_super%"=="o" (
    python manage.py createsuperuser
)

REM Démarrer le serveur
echo.
echo Démarrage du serveur Django sur http://localhost:8001
echo Administration disponible sur http://localhost:8001/admin
echo API disponible sur http://localhost:8001/api
echo.
python manage.py runserver 8001

pause

REM Supprimer les messages d'erreur liés aux deprecated
set NODE_OPTIONS=--no-deprecation
