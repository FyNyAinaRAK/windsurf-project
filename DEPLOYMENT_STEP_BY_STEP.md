# 🚀 Guide de Déploiement Complet - Nell'Faa Groupe

## 📋 Prérequis

- ✅ Code fonctionnel en local
- ✅ Compte GitHub
- ✅ Compte Render (gratuit)

**Temps estimé :** 30-45 minutes

---

## 🎯 PARTIE 1 : Préparation (5 min)

### Étape 1.1 : Créer un compte Render

1. Allez sur **https://render.com**
2. Cliquez sur **"Get Started for Free"**
3. Inscrivez-vous avec **GitHub** (recommandé) ou email
4. Vérifiez votre email si nécessaire

### Étape 1.2 : Pousser le code sur GitHub

**Si vous n'avez pas encore de repo GitHub :**

```bash
# 1. Allez sur https://github.com/new
# 2. Créez un nouveau repo "nellfaa-groupe" (public ou privé)
# 3. Ne cochez RIEN (pas de README, pas de .gitignore)
# 4. Cliquez sur "Create repository"

# Dans votre terminal, à la racine du projet :
cd "c:\Users\FY NY AINA\CascadeProjects\CascadeProjects\CascadeProjects\windsurf-project"

git init
git add .
git commit -m "Initial commit - Nell'Faa Groupe ready for deployment"

# Remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE-USERNAME/nellfaa-groupe.git
git branch -M main
git push -u origin main
```

**Si vous avez déjà un repo :**

```bash
git add .
git commit -m "Ready for deployment"
git push
```

---

## 🗄️ PARTIE 2 : Déployer la Base de Données PostgreSQL (5 min)

### Étape 2.1 : Créer une base PostgreSQL

1. Connectez-vous sur **https://dashboard.render.com**
2. Cliquez sur **"New +"** en haut à droite
3. Sélectionnez **"PostgreSQL"**

### Étape 2.2 : Configurer la base

Remplissez les champs :

| Champ | Valeur |
|-------|--------|
| **Name** | `nellfaa-db` |
| **Database** | `nellfaa_db` |
| **User** | `nellfaa_user` (ou laissez par défaut) |
| **Region** | Choisissez le plus proche (ex: Frankfurt) |
| **PostgreSQL Version** | 16 (dernière version) |
| **Instance Type** | **Free** |

4. Cliquez sur **"Create Database"**
5. ⏳ Attendez 2-3 minutes que la base soit créée

### Étape 2.3 : Copier l'URL de connexion

1. Une fois créée, allez dans l'onglet **"Info"**
2. Cherchez **"Internal Database URL"**
3. Cliquez sur **"Copy"** pour copier l'URL
4. **GARDEZ cette URL**, vous en aurez besoin !

Format de l'URL :
```
postgresql://user:password@host/database
```

---

## 🔧 PARTIE 3 : Déployer le Backend Django (10 min)

### Étape 3.1 : Créer le Web Service

1. Sur Render Dashboard, cliquez sur **"New +"**
2. Sélectionnez **"Web Service"**
3. Cliquez sur **"Connect a repository"**
4. Autorisez Render à accéder à GitHub si demandé
5. Sélectionnez votre repo **"nellfaa-groupe"**

### Étape 3.2 : Configurer le service

Remplissez les champs :

| Champ | Valeur |
|-------|--------|
| **Name** | `nellfaa-backend` |
| **Region** | Même région que la base de données |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | **Python 3** |
| **Build Command** | `./build.sh` |
| **Start Command** | `gunicorn nellfaa_backend.wsgi --log-file -` |
| **Instance Type** | **Free** |

### Étape 3.3 : Ajouter les Variables d'Environnement

Cliquez sur **"Advanced"** puis **"Add Environment Variable"**

Ajoutez ces variables **UNE PAR UNE** :

#### 1. SECRET_KEY
```
SECRET_KEY
```
**Valeur :** Générez une nouvelle clé :
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
Copiez le résultat (exemple : `django-insecure-abc123...`)

#### 2. DEBUG
```
DEBUG
False
```

#### 3. ALLOWED_HOSTS
```
ALLOWED_HOSTS
nellfaa-backend.onrender.com
```
⚠️ **Remplacez** `nellfaa-backend` par le nom que vous avez choisi à l'étape 3.2

#### 4. DATABASE_URL
```
DATABASE_URL
```
**Valeur :** Collez l'URL PostgreSQL copiée à l'étape 2.3

#### 5. DJANGO_LOG_LEVEL
```
DJANGO_LOG_LEVEL
WARNING
```

#### 6. CORS_ALLOWED_ORIGINS
```
CORS_ALLOWED_ORIGINS
https://nellfaa-groupe.onrender.com
```
⚠️ Nous mettrons à jour cette valeur après avoir déployé le frontend

#### 7. CSRF_TRUSTED_ORIGINS
```
CSRF_TRUSTED_ORIGINS
https://nellfaa-backend.onrender.com,https://nellfaa-groupe.onrender.com
```
⚠️ Adaptez avec vos vrais noms de services

#### 8. SECURE_SSL_REDIRECT
```
SECURE_SSL_REDIRECT
True
```

#### 9. SESSION_COOKIE_SECURE
```
SESSION_COOKIE_SECURE
True
```

#### 10. CSRF_COOKIE_SECURE
```
CSRF_COOKIE_SECURE
True
```

### Étape 3.4 : Déployer

1. Cliquez sur **"Create Web Service"**
2. ⏳ Attendez 5-10 minutes que le déploiement se termine
3. Vous verrez les logs en temps réel
4. Quand vous voyez **"Build successful"** et **"Live"**, c'est prêt ! 🎉

### Étape 3.5 : Tester le Backend

1. Copiez l'URL de votre backend (ex: `https://nellfaa-backend.onrender.com`)
2. Testez dans votre navigateur :
   - `https://nellfaa-backend.onrender.com/` → Page d'accueil
   - `https://nellfaa-backend.onrender.com/api/` → API overview
   - `https://nellfaa-backend.onrender.com/admin/` → Interface admin

---

## 🎨 PARTIE 4 : Déployer le Frontend React (10 min)

### Étape 4.1 : Mettre à jour .env.production

Avant de déployer, mettez à jour l'URL du backend :

```bash
# Dans frontend/.env.production
REACT_APP_BACKEND_URL=https://nellfaa-backend.onrender.com
```

⚠️ **Remplacez** par votre vraie URL backend

**Commitez ce changement :**
```bash
git add frontend/.env.production
git commit -m "Update backend URL for production"
git push
```

### Étape 4.2 : Créer le Static Site

1. Sur Render Dashboard, cliquez sur **"New +"**
2. Sélectionnez **"Static Site"**
3. Sélectionnez votre repo **"nellfaa-groupe"**

### Étape 4.3 : Configurer le site

| Champ | Valeur |
|-------|--------|
| **Name** | `nellfaa-groupe` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### Étape 4.4 : Déployer

1. Cliquez sur **"Create Static Site"**
2. ⏳ Attendez 5-10 minutes
3. Quand vous voyez **"Live"**, c'est prêt ! 🎉

### Étape 4.5 : Tester le Frontend

Ouvrez l'URL de votre site (ex: `https://nellfaa-groupe.onrender.com`)

Testez :
- ✅ Page d'accueil
- ✅ Navigation entre les pages
- ✅ Page Actualités
- ✅ Formulaire de contact
- ✅ Pages secteurs

---

## 🔄 PARTIE 5 : Configuration Finale (5 min)

### Étape 5.1 : Mettre à jour CORS

Maintenant que vous connaissez l'URL exacte du frontend :

1. Allez dans **Render Dashboard**
2. Cliquez sur votre service **"nellfaa-backend"**
3. Allez dans **"Environment"**
4. Modifiez **CORS_ALLOWED_ORIGINS** :
   ```
   https://nellfaa-groupe.onrender.com
   ```
   (Remplacez par votre vraie URL frontend)

5. Cliquez sur **"Save Changes"**
6. Le service redémarrera automatiquement

### Étape 5.2 : Créer un Superutilisateur

Pour accéder à l'admin Django en production :

1. Dans votre service backend sur Render
2. Allez dans l'onglet **"Shell"**
3. Cliquez sur **"Connect"**
4. Exécutez :
   ```bash
   python manage.py createsuperuser
   ```
5. Suivez les instructions

### Étape 5.3 : Charger les Données

Dans le Shell Render :

```bash
python create_news_articles.py
python populate_data.py
```

---

## ✅ PARTIE 6 : Vérification Finale (5 min)

### Checklist Complète

- [ ] **Backend déployé** : `https://votre-backend.onrender.com/api/` fonctionne
- [ ] **Base de données** : PostgreSQL active et connectée
- [ ] **Frontend déployé** : `https://votre-site.onrender.com` fonctionne
- [ ] **API connectée** : Le frontend charge les données du backend
- [ ] **Admin accessible** : `/admin/` fonctionne avec votre superutilisateur
- [ ] **Formulaire contact** : Envoie des messages
- [ ] **Actualités** : Articles visibles et cliquables
- [ ] **Secteurs** : Toutes les pages secteurs fonctionnent

### Tests Importants

1. **Test de navigation** : Cliquez sur tous les menus
2. **Test formulaire** : Envoyez un message de contact
3. **Test actualités** : Cliquez sur "Lire la suite"
4. **Test mobile** : Ouvrez sur votre téléphone
5. **Test vitesse** : Utilisez Google PageSpeed Insights

---

## 🎉 FÉLICITATIONS !

Votre site est maintenant **EN LIGNE** ! 🚀

### URLs de votre site :

- **Site public** : `https://nellfaa-groupe.onrender.com`
- **API Backend** : `https://nellfaa-backend.onrender.com/api/`
- **Admin Django** : `https://nellfaa-backend.onrender.com/admin/`

---

## 📊 Après le Déploiement

### Monitoring

Render vous envoie des emails si :
- ❌ Le service plante
- ⚠️ Erreurs 500
- 📊 Utilisation élevée

### Logs

Pour voir les logs :
1. Render Dashboard → Votre service
2. Onglet **"Logs"**
3. Logs en temps réel

### Mises à Jour

Pour déployer des changements :

```bash
# Faites vos modifications
git add .
git commit -m "Description des changements"
git push
```

Render redéploiera automatiquement ! 🔄

---

## 🆘 Problèmes Courants

### Erreur 500 Backend

**Solution :**
1. Vérifiez les logs dans Render
2. Vérifiez DATABASE_URL
3. Vérifiez ALLOWED_HOSTS

### Frontend ne charge pas les données

**Solution :**
1. Vérifiez REACT_APP_BACKEND_URL dans .env.production
2. Vérifiez CORS_ALLOWED_ORIGINS dans le backend
3. Ouvrez la console du navigateur (F12)

### Base de données vide

**Solution :**
```bash
# Dans le Shell Render
python populate_data.py
python create_news_articles.py
```

---

## 📞 Support

- **Documentation Render** : https://render.com/docs
- **Django Deployment** : https://docs.djangoproject.com/en/4.2/howto/deployment/
- **React Deployment** : https://create-react-app.dev/docs/deployment/

---

**Bon déploiement ! 🚀**
