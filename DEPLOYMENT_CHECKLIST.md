# ✅ Checklist de Déploiement - Nell'Faa Groupe

## 📋 Avant de Commencer

- [ ] Site fonctionne en local (backend + frontend)
- [ ] Compte GitHub créé
- [ ] Compte Render créé (https://render.com)
- [ ] Code poussé sur GitHub

---

## 🗄️ ÉTAPE 1 : Base de Données PostgreSQL

### Sur Render Dashboard

- [ ] Cliquer sur "New +" → "PostgreSQL"
- [ ] Name: `nellfaa-db`
- [ ] Database: `nellfaa_db`
- [ ] Region: Choisir le plus proche
- [ ] Instance Type: **Free**
- [ ] Cliquer sur "Create Database"
- [ ] ⏳ Attendre 2-3 minutes
- [ ] Copier "Internal Database URL" (garder précieusement !)

**URL copiée :** `_______________________________________`

---

## 🔧 ÉTAPE 2 : Backend Django

### Sur Render Dashboard

- [ ] Cliquer sur "New +" → "Web Service"
- [ ] Connecter le repo GitHub "nellfaa-groupe"
- [ ] Name: `nellfaa-backend`
- [ ] Root Directory: `backend`
- [ ] Build Command: `./build.sh`
- [ ] Start Command: `gunicorn nellfaa_backend.wsgi --log-file -`
- [ ] Instance Type: **Free**

### Variables d'Environnement (Cliquer "Advanced")

- [ ] **SECRET_KEY** = `[Générer avec la commande Python]`
- [ ] **DEBUG** = `False`
- [ ] **ALLOWED_HOSTS** = `nellfaa-backend.onrender.com`
- [ ] **DATABASE_URL** = `[URL PostgreSQL copiée]`
- [ ] **DJANGO_LOG_LEVEL** = `WARNING`
- [ ] **CORS_ALLOWED_ORIGINS** = `https://nellfaa-groupe.onrender.com`
- [ ] **CSRF_TRUSTED_ORIGINS** = `https://nellfaa-backend.onrender.com,https://nellfaa-groupe.onrender.com`
- [ ] **SECURE_SSL_REDIRECT** = `True`
- [ ] **SESSION_COOKIE_SECURE** = `True`
- [ ] **CSRF_COOKIE_SECURE** = `True`

### Déploiement

- [ ] Cliquer sur "Create Web Service"
- [ ] ⏳ Attendre 5-10 minutes
- [ ] Voir "Build successful" et "Live"
- [ ] Tester : `https://nellfaa-backend.onrender.com/api/`

**URL Backend :** `_______________________________________`

---

## 🎨 ÉTAPE 3 : Frontend React

### Mise à jour du code

- [ ] Modifier `frontend/.env.production`
- [ ] Mettre `REACT_APP_BACKEND_URL=https://nellfaa-backend.onrender.com`
- [ ] Commit et push :
  ```bash
  git add frontend/.env.production
  git commit -m "Update backend URL"
  git push
  ```

### Sur Render Dashboard

- [ ] Cliquer sur "New +" → "Static Site"
- [ ] Sélectionner le repo "nellfaa-groupe"
- [ ] Name: `nellfaa-groupe`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build`
- [ ] Cliquer sur "Create Static Site"
- [ ] ⏳ Attendre 5-10 minutes
- [ ] Voir "Live"

**URL Frontend :** `_______________________________________`

---

## 🔄 ÉTAPE 4 : Configuration Finale

### Mettre à jour CORS

- [ ] Aller dans le service "nellfaa-backend"
- [ ] Onglet "Environment"
- [ ] Modifier **CORS_ALLOWED_ORIGINS** avec la vraie URL frontend
- [ ] Sauvegarder (le service redémarre automatiquement)

### Créer un Superutilisateur

- [ ] Service backend → Onglet "Shell"
- [ ] Cliquer "Connect"
- [ ] Exécuter : `python manage.py createsuperuser`
- [ ] Suivre les instructions

**Username admin :** `_______________________________________`

### Charger les Données

- [ ] Dans le Shell : `python populate_data.py`
- [ ] Dans le Shell : `python create_news_articles.py`

---

## ✅ ÉTAPE 5 : Tests Finaux

### Tests Backend

- [ ] `https://votre-backend.onrender.com/` → Page d'accueil
- [ ] `https://votre-backend.onrender.com/api/` → API overview
- [ ] `https://votre-backend.onrender.com/admin/` → Login admin
- [ ] `https://votre-backend.onrender.com/api/sectors/` → Liste secteurs
- [ ] `https://votre-backend.onrender.com/api/news/` → Liste articles

### Tests Frontend

- [ ] Page d'accueil charge
- [ ] Menu de navigation fonctionne
- [ ] Page "Nos Secteurs" → Tous les secteurs
- [ ] Page "Actualités" → Articles visibles
- [ ] Clic sur "Lire la suite" → Article complet
- [ ] Page "Contact" → Formulaire visible
- [ ] Page "À Propos" → Contenu affiché
- [ ] Test sur mobile (responsive)

### Tests d'Intégration

- [ ] Frontend charge les données du backend
- [ ] Formulaire de contact envoie des messages
- [ ] Articles s'affichent avec images
- [ ] Navigation entre articles fonctionne
- [ ] Pas d'erreurs dans la console (F12)

---

## 🎉 DÉPLOIEMENT TERMINÉ !

### Vos URLs

- **Site Public :** `https://nellfaa-groupe.onrender.com`
- **API Backend :** `https://nellfaa-backend.onrender.com/api/`
- **Admin Django :** `https://nellfaa-backend.onrender.com/admin/`

### Prochaines Étapes

- [ ] Configurer un nom de domaine personnalisé (optionnel)
- [ ] Configurer Email SMTP pour les notifications
- [ ] Ajouter Google Analytics (optionnel)
- [ ] Configurer les sauvegardes automatiques
- [ ] Monitorer les performances

---

## 📝 Notes Importantes

### Limitations du Plan Gratuit Render

- ⏰ Services s'endorment après 15 min d'inactivité
- 🔄 Premier chargement peut prendre 30-60 secondes
- 💾 750 heures/mois de temps d'exécution
- 📊 100 GB de bande passante/mois

### Pour Éviter l'Endormissement

Utilisez un service de ping gratuit :
- UptimeRobot (https://uptimerobot.com)
- Cron-job.org (https://cron-job.org)

Pingez votre site toutes les 14 minutes.

---

## 🆘 En Cas de Problème

### Erreur 500

1. Vérifier les logs Render
2. Vérifier DATABASE_URL
3. Vérifier ALLOWED_HOSTS

### Frontend ne charge pas

1. Vérifier REACT_APP_BACKEND_URL
2. Vérifier CORS_ALLOWED_ORIGINS
3. Ouvrir console navigateur (F12)

### Base de données vide

```bash
# Dans Shell Render
python populate_data.py
python create_news_articles.py
```

---

**Félicitations ! Votre site est en ligne ! 🚀**
