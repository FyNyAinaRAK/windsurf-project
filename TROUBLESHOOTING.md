# Guide de Résolution des Problèmes - Nell'Faa Groupe

## Problèmes Résolus

### 1. Avertissements de Dépréciation Node.js

**Problème :** Messages d'avertissement lors du démarrage du serveur React
```
(node:12496) [DEP0176] DeprecationWarning: fs.F_OK is deprecated
(node:12496) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning
(node:12496) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated
```

**Solution :** 
- Ajout de CRACO pour personnaliser la configuration Webpack
- Configuration des variables d'environnement pour supprimer les warnings
- Mise à jour du fichier `.env` avec `NODE_OPTIONS=--no-deprecation`

### 2. Erreur de Proxy Backend

**Problème :** 
```
Proxy error: Could not proxy request /favicon.ico from localhost:3000 to http://localhost:8000/
```

**Solution :**
- Configuration CORS dans Django (`corsheaders`)
- Ajout de `setupProxy.js` pour une gestion avancée du proxy
- Configuration REST Framework dans `settings.py`

### 3. Configuration Backend Django

**Ajouts effectués :**
- CORS Headers pour permettre les requêtes cross-origin
- Django REST Framework pour l'API
- URLs API configurées (`/api/`, `/api/contacts/`, `/api/sectors/`, `/api/core/`)
- Point de santé API (`/api/` retourne le statut du serveur)

## Fichiers Modifiés

### Backend
- `nellfaa_backend/settings.py` : CORS, REST Framework
- `nellfaa_backend/urls.py` : Routes API
- `requirements.txt` : Dépendances déjà présentes

### Frontend
- `package.json` : CRACO, http-proxy-middleware
- `.env` : Variables d'environnement
- `craco.config.js` : Configuration Webpack personnalisée
- `setupProxy.js` : Configuration proxy avancée

## Scripts de Démarrage

### Démarrage Automatique
Utilisez le script `start-servers.bat` pour démarrer les deux serveurs automatiquement :
```bash
./start-servers.bat
```

### Démarrage Manuel

**Backend :**
```bash
cd backend
call venv\Scripts\activate
python manage.py runserver
```

**Frontend :**
```bash
cd frontend
set NODE_OPTIONS=--no-deprecation
npm start
```

## URLs Disponibles

- **Frontend :** http://localhost:3000
- **Backend API :** http://localhost:8000/api/
- **Admin Django :** http://localhost:8000/admin/
- **Santé API :** http://localhost:8000/api/ (retourne JSON status)

## Vérification du Fonctionnement

1. Backend actif : Accéder à http://localhost:8000/api/
2. Frontend actif : Accéder à http://localhost:3000
3. Proxy fonctionnel : Pas d'erreurs dans la console du navigateur
4. CORS configuré : Requêtes API réussies depuis le frontend

## Variables d'Environnement

### Frontend (.env)
```
GENERATE_SOURCEMAP=false
SKIP_PREFLIGHT_CHECK=true
NODE_OPTIONS=--max_old_space_size=4096
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Backend (.env)
Utiliser `.env.example` comme modèle pour la configuration Django.
