# Guide de Déploiement sur DirectAdmin

Ce guide vous expliquera comment déployer l'application **Nell'Faa Groupe** sur un hébergement web utilisant DirectAdmin. Suivez attentivement ces étapes pour une mise en production réussie.

## Étape 1 : Préparation des Fichiers en Local

La première étape consiste à préparer une archive `.zip` contenant tous les fichiers nécessaires pour la production. Pour simplifier ce processus, un script a été créé.

1.  **Assurez-vous d'avoir les permissions d'exécution sur le script** :
    ```bash
    chmod +x build_for_directadmin.sh
    ```

2.  **Exécutez le script de construction** :
    ```bash
    ./build_for_directadmin.sh
    ```

Ce script effectuera les actions suivantes :
- Il construira l'application frontend (React).
- Il collectera les fichiers statiques de Django.
- Il créera une archive nommée `nellfaa-groupe-deployment.zip` prête à être téléversée.

## Étape 2 : Téléversement de l'Archive sur DirectAdmin

1.  **Connectez-vous à votre panneau DirectAdmin**.
2.  Accédez au **Gestionnaire de fichiers** (`File Manager`).
3.  Naviguez jusqu'au dossier racine de votre site (généralement `public_html`).
4.  **Supprimez les anciens fichiers** s'il y en a, pour éviter les conflits.
5.  Cliquez sur **Téléverser des fichiers** (`Upload files`) et sélectionnez l'archive `nellfaa-groupe-deployment.zip` que vous venez de créer.
6.  Une fois le téléversement terminé, sélectionnez l'archive et cliquez sur **Extraire** (`Extract`).

## Étape 3 : Configuration de l'Application Python

DirectAdmin vous permet de lancer des applications Python via une interface dédiée.

1.  Dans le menu principal de DirectAdmin, cherchez l'option **Setup Python App**.
2.  Cliquez sur **Créer une application** (`Create App`).
3.  **Configurez les champs suivants** :
    - **Version de Python** : Choisissez une version compatible (ex: 3.8, 3.9).
    - **App Root** : Le chemin vers le dossier `backend` de votre projet (ex: `/home/user/domains/yourdomain.com/public_html/backend`).
    - **App Startup File** : Laissez ce champ vide ou spécifiez `passenger_wsgi.py` si demandé.
    - **App Entry Point** : `passenger_wsgi.py`.
4.  Cliquez sur **Créer** (`Create`).

## Étape 4 : Installation des Dépendances

Une fois l'application créée, vous devez installer les dépendances Python.

1.  Dans l'interface de votre application Python, une commande d'installation sera affichée. Copiez-la.
2.  Ouvrez le **Terminal** (`Terminal`) dans DirectAdmin.
3.  Collez la commande pour installer les dépendances à partir de `requirements.txt` :
    ```bash
    /home/user/virtualenv/yourdomain.com/nellfaa_backend/3.8/bin/pip install -r /home/user/domains/yourdomain.com/public_html/backend/requirements.txt
    ```
    *Assurez-vous que le chemin correspond bien à votre configuration.*

## Étape 5 : Configuration des Variables d'Environnement

C'est l'étape la plus importante pour que votre application fonctionne correctement.

1.  Retournez à la page de configuration de votre application Python.
2.  Dans la section **Environment Variables**, ajoutez les variables suivantes :

| Variable              | Description                                                                                             | Exemple de Valeur                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `SECRET_KEY`          | Une clé secrète forte pour Django. Vous pouvez en générer une [ici](https://djecrety.ir/).                 | `votre_super_secret_key_ici`                        |
| `DATABASE_URL`        | L'URL de connexion à votre base de données MySQL/MariaDB.                                               | `mysql://user:password@localhost:3306/dbname`       |
| `DEBUG`               | Doit être `False` en production.                                                                        | `False`                                             |
| `ALLOWED_HOSTS`       | Le nom de domaine de votre site.                                                                        | `www.votredomaine.com,votredomaine.com`             |
| `CORS_ALLOWED_ORIGINS`| Les domaines autorisés à faire des requêtes (votre frontend).                                           | `https://www.votredomaine.com,https://votredomaine.com` |
| `CSRF_TRUSTED_ORIGINS`| Les domaines de confiance pour les requêtes CSRF.                                                       | `https://www.votredomaine.com,https://votredomaine.com` |
| `SECURE_SSL_REDIRECT` | Mettez `True` si votre site utilise HTTPS (recommandé).                                                 | `True`                                              |

3.  **Sauvegardez** les variables.

## Étape 6 : Redémarrage et Vérification

1.  Une fois la configuration terminée, cliquez sur **Redémarrer** (`Restart`) en haut de la page de l'application Python.
2.  Consultez les **journaux** (`Logs`) pour vérifier qu'il n'y a pas d'erreurs au démarrage.
3.  Visitez votre site web. Il devrait maintenant être en ligne et fonctionner correctement.

---

Si vous rencontrez des problèmes, la section des logs est votre meilleur allié pour diagnostiquer la cause de l'erreur.
