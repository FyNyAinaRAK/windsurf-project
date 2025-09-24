@echo off
title Nell'Faa Groupe - Démarrage du projet
color 0A

echo ========================================
echo    NELL'FAA GROUPE MAJUNGA
echo    Démarrage du projet complet
echo ========================================
echo.

echo Choisissez une option:
echo 1. Démarrer le backend Django uniquement
echo 2. Démarrer le frontend React uniquement  
echo 3. Démarrer les deux (recommandé)
echo 4. Configuration initiale du projet
echo 5. Quitter
echo.

set /p choice=Votre choix (1-5): 

if "%choice%"=="1" (
    echo Démarrage du backend Django...
    cd backend
    call start.bat
) else if "%choice%"=="2" (
    echo Démarrage du frontend React...
    cd frontend
    call start.bat
) else if "%choice%"=="3" (
    echo Démarrage du projet complet...
    echo.
    echo Démarrage du backend Django dans une nouvelle fenêtre...
    start "Django Backend" cmd /k "cd backend && start.bat"
    
    timeout /t 3 /nobreak >nul
    
    echo Démarrage du frontend React...
    cd frontend
    call start.bat
) else if "%choice%"=="4" (
    echo Configuration initiale du projet...
    echo.
    echo 1. Configuration du backend Django...
    cd backend
    if not exist ".env" (
        copy .env.example .env
        echo Fichier .env créé. Veuillez le configurer selon vos besoins.
    )
    
    echo 2. Installation des dépendances frontend...
    cd ..\frontend
    if not exist "node_modules" (
        npm install
    )
    
    echo.
    echo Configuration terminée!
    echo Vous pouvez maintenant démarrer le projet avec l'option 3.
    pause
) else if "%choice%"=="5" (
    echo Au revoir!
    exit
) else (
    echo Choix invalide. Veuillez réessayer.
    pause
    goto :start
)

pause
