# Déploiement sur DirectAdmin

Ce guide explique comment déployer l'application Nell'Faa Groupe sur un hébergement utilisant le panneau DirectAdmin.

## Prérequis

- Un compte d'hébergement web avec DirectAdmin.
- Les identifiants FTP ou un accès au gestionnaire de fichiers de DirectAdmin.
- Une base de données MySQL ou MariaDB créée sur l'hébergement.

## Étapes de déploiement

### 1. Préparation des fichiers en local

Avant de téléverser les fichiers, vous devez vous assurer que le projet est prêt pour la production.

- **Frontend** : Compilez les fichiers du frontend en exécutant `npm run build` (ou la commande équivalente) dans le dossier `frontend`.
- **Backend** : Assurez-vous que toutes les dépendances Python sont listées dans un fichier `requirements.txt`.

### 2. Téléversement des fichiers

Vous pouvez téléverser les fichiers de deux manières :

#### a) Via le gestionnaire de fichiers (recommandé)

1.  Compressez tous les fichiers du projet dans une archive `.zip`.
2.  Connectez-vous à votre panneau DirectAdmin.
3.  Allez dans le "Gestionnaire de fichiers" ("File Manager").
4.  Naviguez jusqu'au dossier racine de votre site (généralement `public_html`).
5.  Cliquez sur "Téléverser des fichiers" ("Upload files") et sélectionnez votre archive `.zip`.
6.  Une fois le téléversement terminé, sélectionnez l'archive et cliquez sur "Extraire" ("Extract").

#### b) Via FTP

1.  Utilisez un client FTP comme FileZilla ou Cyberduck.
2.  Connectez-vous à votre serveur avec vos identifiants FTP.
3.  Naviguez jusqu'au dossier `public_html`.
4.  Transférez tous les fichiers du projet (sauf les fichiers de développement comme `.git`, `node_modules`, etc.).

### 3. Configuration du backend

Une fois les fichiers sur le serveur, vous devez configurer l'application Python.

1.  **Créer une application Python** : Dans DirectAdmin, cherchez une option comme "Setup Python App" ou "Passenger". Cela vous permettra de configurer l'interpréteur Python pour votre projet.
2.  **Installer les dépendances** : Via l'interface de l'application Python, installez les dépendances en utilisant le fichier `requirements.txt`.
3.  **Configurer les variables d'environnement** : Dans la même interface, configurez les variables d'environnement nécessaires :
    -   `SECRET_KEY` : une clé secrète robuste.
    -   `DATABASE_URL` : l'URL de connexion à votre base de données.
    -   `DEBUG` : doit être `False`.

### 4. Lancement de l'application

- Une fois l'application configurée, redémarrez-la depuis l'interface DirectAdmin.
- Vérifiez les journaux ("logs") pour vous assurer qu'il n'y a pas d'erreurs.
- Votre site devrait maintenant être en ligne !
