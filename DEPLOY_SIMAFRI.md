# Déploiement sur Simafri

Ce guide explique comment déployer l'application Nell'Faa Groupe sur Simafri.

## Prérequis

- Compte Simafri
- Outil en ligne de commande Simafri installé
- Git installé localement

## Configuration du backend

1. **Variables d'environnement**

   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```
   DEBUG=False
   SECRET_KEY=votre_clé_secrète
   ALLOWED_HOSTS=.simafri.com,.nellfaa-groupe.com
   DATABASE_URL=postgres://user:password@simafri-db-url:port/dbname
   CORS_ALLOWED_ORIGINS=https://nellfaa-groupe.com,https://www.nellfaa-groupe.com
   ```

2. **Base de données**

   - Créez une base de données PostgreSQL sur Simafri
   - Mettez à jour la variable `DATABASE_URL` avec les informations de connexion

## Déploiement

1. **Installez l'outil en ligne de commande Simafri**
   ```bash
   npm install -g simafri-cli
   ```

2. **Connectez-vous à votre compte Simafri**
   ```bash
   simafri login
   ```

3. **Déployez l'application**
   ```bash
   # Dans le répertoire racine du projet
   git add .
   git commit -m "Préparation pour le déploiement sur Simafri"
   git push simafri main
   ```

4. **Configuration du domaine**
   - Allez dans le tableau de bord Simafri
   - Configurez le domaine personnalisé `nellfaa-groupe.com`
   - Mettez à jour vos enregistrements DNS selon les instructions fournies

## Mise à jour de l'application

Pour déployer des mises à jour :

```bash
git add .
git commit -m "Description des modifications"
git push simafri main
```

## Variables d'environnement importantes

- `DEBUG`: Définir sur `False` en production
- `SECRET_KEY`: Clé secrète pour Django
- `ALLOWED_HOSTS`: Domaines autorisés
- `DATABASE_URL`: URL de connexion à la base de données
- `CORS_ALLOWED_ORIGINS`: Origines autorisées pour les requêtes CORS
