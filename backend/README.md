# Déploiement de l'API Nell'Faa Groupe

Ce guide explique comment déployer l'API Django sur Render.

## Prérequis

- Compte Render
- PostgreSQL (géré par Render)
- Git installé en local

## Configuration requise

- Python 3.10
- PostgreSQL
- Les dépendances listées dans `requirements.txt`

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
# Django
SECRET_KEY=votre_secret_key_ici
DEBUG=False
ALLOWED_HOSTS=*

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Email (optionnel)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=votre_email@gmail.com
EMAIL_HOST_PASSWORD=votre_mot_de_passe
DEFAULT_FROM_EMAIL=contact@nellfaa-groupe.mg
```

## Déploiement sur Render

1. **Créer un nouveau service Web** sur Render
2. Connectez votre dépôt GitHub
3. Configurez les paramètres suivants :
   - **Build Command**: `chmod a+x build.sh && ./build.sh`
   - **Start Command**: `gunicorn nellfaa_backend.wsgi:application`
   - **Environment Variables**: Ajoutez toutes les variables du fichier `.env`

4. **Base de données PostgreSQL** :
   - Créez une base de données PostgreSQL sur Render
   - Mettez à jour la variable `DATABASE_URL` avec les informations de connexion

5. **Démarrez le déploiement**

## Développement local

1. Créez un environnement virtuel :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows: .\venv\Scripts\activate
   ```

2. Installez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

3. Appliquez les migrations :
   ```bash
   python manage.py migrate
   ```

4. Créez un superutilisateur :
   ```bash
   python manage.py createsuperuser
   ```

5. Lancez le serveur de développement :
   ```bash
   python manage.py runserver
   ```

## Structure du projet

- `nellfaa_backend/` : Configuration principale du projet Django
- `core/` : Application principale
- `contacts/` : Gestion des contacts
- `sectors/` : Gestion des secteurs d'activité

## Licence

Propriétaire - Nell'Faa Groupe
