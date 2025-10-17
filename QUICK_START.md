# 🚀 Guide de Démarrage Rapide

## 📝 Configuration Actuelle

Votre SECRET_KEY a été générée avec succès :
```
nwpy%_#p3#gkov9n0-#@*$d(02b!nrly^dql^+(#z9dx2@g+kx
```

## 🔧 Configuration Locale (Développement)

### 1. Copier le fichier d'environnement

```bash
# Dans le dossier backend
cd backend
copy .env.development .env
```

**OU** créez manuellement le fichier `backend\.env` avec ce contenu :

```env
SECRET_KEY=nwpy%_#p3#gkov9n0-#@*$d(02b!nrly^dql^+(#z9dx2@g+kx
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_LOG_LEVEL=INFO
DATABASE_URL=sqlite:///db.sqlite3
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=contact@nellfaa-groupe.mg
```

### 2. Installer les dépendances

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 3. Préparer la base de données

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

### 4. Charger les données de test (optionnel)

```bash
python populate_data.py
```

### 5. Lancer le projet

**Terminal 1 - Backend :**
```bash
cd backend
python manage.py runserver 8000
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm start
```

**Accès :**
- Frontend : http://localhost:3000
- Backend API : http://localhost:8000/api/
- Admin : http://localhost:8000/admin/

---

## 🌐 Configuration Production

### 1. Créer le fichier .env de production

Sur votre plateforme d'hébergement (Render, Railway, etc.), configurez ces variables d'environnement :

```env
# Django Configuration
SECRET_KEY=<générez-une-nouvelle-clé-pour-production>
DEBUG=False
ALLOWED_HOSTS=votre-backend.onrender.com
DJANGO_LOG_LEVEL=WARNING

# Database (fourni par Render/Railway)
DATABASE_URL=<url-postgresql-fournie-par-hebergeur>

# CORS
CORS_ALLOWED_ORIGINS=https://nellfaa-groupe.onrender.com
CSRF_TRUSTED_ORIGINS=https://nellfaa-groupe.onrender.com,https://votre-backend.onrender.com

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# Email (configurez Gmail App Password)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-app-password
DEFAULT_FROM_EMAIL=contact@nellfaa-groupe.mg
```

### 2. Frontend - Mettre à jour .env.production

```env
REACT_APP_BACKEND_URL=https://votre-backend.onrender.com
```

### 3. Déployer

**Backend (Render/Railway) :**
- Build Command : `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- Start Command : `gunicorn nellfaa_backend.wsgi --log-file -`

**Frontend (Render/Netlify) :**
- Build Command : `npm install && npm run build`
- Publish Directory : `build`

---

## ✅ Vérification

Avant de déployer, exécutez :

```bash
cd backend
python check_production.py
```

Ce script vérifiera automatiquement votre configuration.

---

## 🆘 Problèmes Courants

### Erreur : ModuleNotFoundError

```bash
pip install -r requirements.txt
```

### Erreur : No such table

```bash
python manage.py migrate
```

### Erreur CORS en production

Vérifiez que `CORS_ALLOWED_ORIGINS` contient l'URL exacte de votre frontend (avec https://)

### Emails non envoyés

En développement, les emails s'affichent dans la console. En production, configurez Gmail App Password.

---

## 📚 Documentation Complète

- **DEPLOYMENT_GUIDE.md** : Guide détaillé de déploiement
- **PRODUCTION_READINESS.md** : Analyse et checklist complète
- **TROUBLESHOOTING.md** : Guide de dépannage

---

## 🎯 Prochaines Étapes

1. ✅ SECRET_KEY générée
2. ⏳ Copier `.env.development` vers `.env`
3. ⏳ Installer les dépendances
4. ⏳ Migrer la base de données
5. ⏳ Tester en local
6. ⏳ Configurer PostgreSQL pour production
7. ⏳ Déployer

**Bon développement ! 🚀**
