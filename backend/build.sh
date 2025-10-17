#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Créer le superutilisateur
python create_superuser.py

# Charger les données initiales
python populate_data.py
python create_news_articles.py
