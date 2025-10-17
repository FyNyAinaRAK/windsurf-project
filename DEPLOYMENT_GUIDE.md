# 🚀 Guide de Déploiement en Production - Nell'Faa Groupe

## ✅ Checklist Pré-Déploiement

### Backend Django

#### 1. Variables d'Environnement (.env)
Créez un fichier `.env` en production avec :

```bash
# Django Configuration
SECRET_KEY=votre-cle-secrete-tres-longue-et-aleatoire-ici
DEBUG=False
ALLOWED_HOSTS=votre-backend.onrender.com,www.nellfaa-groupe.mg
DJANGO_LOG_LEVEL=WARNING

# Database Configuration
DATABASE_URL=postgresql://user:password@host:5432/nellfaa_db

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://nellfaa-groupe.onrender.com,https://www.nellfaa-groupe.mg
CSRF_TRUSTED_ORIGINS=https://nellfaa-groupe.onrender.com,https://www.nellfaa-groupe.mg

# Security Settings
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-mot-de-passe-app
DEFAULT_FROM_EMAIL=contact@nellfaa-groupe.mg
```

#### 2. Commandes de Déploiement

```bash
# 1. Collecter les fichiers statiques
python manage.py collectstatic --noinput

# 2. Appliquer les migrations
python manage.py migrate

# 3. Créer un superutilisateur
python manage.py createsuperuser

# 4. Charger les données initiales (optionnel)
python manage.py loaddata initial_data.json
```

#### 3. Configuration Render/Railway

**Build Command:**
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

**Start Command:**
```bash
gunicorn nellfaa_backend.wsgi --log-file -
```

### Frontend React

#### 1. Variables d'Environnement (.env.production)

```bash
REACT_APP_BACKEND_URL=https://votre-backend.onrender.com
REACT_APP_GOOGLE_MAPS_API_KEY=votre-cle-google-maps
```

#### 2. Build et Déploiement

```bash
# Build de production
npm run build

# Le dossier build/ contient les fichiers à déployer
```

#### 3. Configuration Render/Netlify

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
build
```

## 🔒 Sécurité

### Actions Requises

1. **Générer une nouvelle SECRET_KEY** :
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

2. **Configurer HTTPS** : Assurez-vous que SSL est activé sur votre hébergeur

3. **Configurer les CORS** : Limitez les origines autorisées aux domaines de production

4. **Activer les cookies sécurisés** : SESSION_COOKIE_SECURE et CSRF_COOKIE_SECURE à True

5. **Configurer un email SMTP réel** : Remplacer console backend par SMTP

## 📊 Monitoring

### Logs à Surveiller

1. **Erreurs Django** : Vérifier les logs d'application
2. **Erreurs 500** : Configurer un système d'alertes
3. **Performance** : Monitorer les temps de réponse API
4. **Base de données** : Surveiller les connexions et requêtes lentes

### Outils Recommandés

- **Sentry** : Pour le tracking des erreurs
- **New Relic** : Pour le monitoring de performance
- **Papertrail** : Pour l'agrégation des logs

## 🗄️ Base de Données

### PostgreSQL (Recommandé pour Production)

1. **Créer une base PostgreSQL** sur Render/Railway
2. **Copier l'URL de connexion** dans DATABASE_URL
3. **Appliquer les migrations** : `python manage.py migrate`

### Backup

```bash
# Backup manuel
pg_dump $DATABASE_URL > backup.sql

# Restauration
psql $DATABASE_URL < backup.sql
```

## 🎯 Performance

### Optimisations Appliquées

✅ Pagination activée sur toutes les listes
✅ Select_related pour les requêtes avec relations
✅ WhiteNoise pour servir les fichiers statiques
✅ Compression des fichiers statiques
✅ Logging structuré

### Optimisations Recommandées

- [ ] Activer le cache Redis pour les sessions
- [ ] Configurer un CDN pour les médias (Cloudinary/AWS S3)
- [ ] Activer la compression Gzip
- [ ] Optimiser les images (WebP, lazy loading)
- [ ] Mettre en place un système de cache API

## 🧪 Tests Avant Déploiement

```bash
# Backend
python manage.py test

# Frontend
npm test

# Vérifier les variables d'environnement
python manage.py check --deploy
```

## 📝 Post-Déploiement

### Vérifications

1. ✅ Tester tous les endpoints API
2. ✅ Vérifier le formulaire de contact
3. ✅ Tester la navigation sur toutes les pages
4. ✅ Vérifier les images et médias
5. ✅ Tester sur mobile et desktop
6. ✅ Vérifier les performances (Google PageSpeed)
7. ✅ Tester les emails de contact

### URLs à Tester

- Frontend : https://nellfaa-groupe.onrender.com
- Backend API : https://votre-backend.onrender.com/api/
- Admin : https://votre-backend.onrender.com/admin/

## 🆘 Dépannage

### Erreur 500

1. Vérifier DEBUG=False
2. Vérifier ALLOWED_HOSTS
3. Consulter les logs : `heroku logs --tail` ou équivalent

### CORS Errors

1. Vérifier CORS_ALLOWED_ORIGINS
2. Vérifier que l'URL frontend est correcte
3. Vérifier CSRF_TRUSTED_ORIGINS

### Database Connection Error

1. Vérifier DATABASE_URL
2. Vérifier que PostgreSQL est actif
3. Vérifier les migrations : `python manage.py showmigrations`

## 📞 Support

Pour toute question, consultez :
- Documentation Django : https://docs.djangoproject.com/
- Documentation React : https://react.dev/
- Documentation Render : https://render.com/docs
