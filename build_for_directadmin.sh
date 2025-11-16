#!/bin/bash
# Ce script automatise la préparation des fichiers pour le déploiement sur DirectAdmin.

set -e # Arrête le script si une commande échoue

echo "----------------------------------------------------"
echo "--- Lancement du script de déploiement pour DirectAdmin ---"
echo "----------------------------------------------------"

# 1. Construire le frontend
echo ">>> Étape 1/4 : Construction du frontend..."
cd frontend
npm install
npm run build
cd ..
echo ">>> Frontend construit avec succès."

# 2. Préparer le dossier de déploiement
echo ">>> Étape 2/4 : Préparation du dossier de déploiement..."
# Supprimer les anciens artefacts de build du dossier de déploiement pour éviter les conflits
rm -rf deploy/static deploy/asset-manifest.json deploy/index.html deploy/manifest.json deploy/robots.txt deploy/sitemap.xml
# Copier les nouveaux fichiers du frontend
cp -r frontend/build/* deploy/
echo ">>> Dossier de déploiement mis à jour."

# 3. Collecter les fichiers statiques de Django
echo ">>> Étape 3/4 : Collecte des fichiers statiques de Django..."
cd backend
# Assurez-vous que les dépendances sont installées pour exécuter manage.py
# pip install -r requirements.txt
python manage.py collectstatic --noinput
cd ..
echo ">>> Fichiers statiques collectés."

# 4. Créer une archive ZIP pour le déploiement
echo ">>> Étape 4/4 : Création de l'archive de déploiement..."
if [ -f nellfaa-groupe-deployment.zip ]; then
    rm nellfaa-groupe-deployment.zip
fi
zip -r nellfaa-groupe-deployment.zip backend deploy
echo ">>> Archive 'nellfaa-groupe-deployment.zip' créée avec succès."

echo "----------------------------------------------------"
echo "--- Déploiement prêt ! ---"
echo "Le fichier nellfaa-groupe-deployment.zip peut maintenant être téléversé sur DirectAdmin."
echo "----------------------------------------------------"
