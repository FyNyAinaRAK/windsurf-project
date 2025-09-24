# Guide d'Installation - Nell'Faa Groupe Majunga

## Prérequis

### Logiciels nécessaires
- **Python 3.8+** : [Télécharger Python](https://www.python.org/downloads/)
- **Node.js 16+** : [Télécharger Node.js](https://nodejs.org/)
- **Git** : [Télécharger Git](https://git-scm.com/)

### Vérification des installations
```bash
python --version
node --version
npm --version
git --version
```

## Installation pas à pas

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd windsurf-project
```

### 2. Configuration du Backend Django

#### a) Créer l'environnement virtuel
```bash
cd backend
python -m venv venv
```

#### b) Activer l'environnement virtuel
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

#### c) Installer les dépendances
```bash
pip install -r requirements.txt
```

#### d) Configuration des variables d'environnement
```bash
cp .env.example .env
```
Éditez le fichier `.env` avec vos paramètres.

#### e) Migrations de base de données
```bash
python manage.py makemigrations
python manage.py migrate
```

#### f) Créer un superutilisateur
```bash
python manage.py createsuperuser
```

### 3. Configuration du Frontend React

#### a) Installer les dépendances
```bash
cd ../frontend
npm install
```

## Démarrage du projet

### Option 1: Démarrage automatique (Windows)
Double-cliquez sur `start-project.bat`

### Option 2: Démarrage manuel

#### Terminal 1 - Backend
```bash
cd backend
python manage.py runserver
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

## URLs importantes

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin

## Résolution des problèmes courants

### Erreur de port occupé
```bash
# Changer le port Django
python manage.py runserver 8001

# Changer le port React
set PORT=3001 && npm start
```

### Erreur de dépendances Python
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### Erreur de dépendances Node.js
```bash
rm -rf node_modules package-lock.json
npm install
```

## Configuration pour la production

### Variables d'environnement production
```env
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Build de production React
```bash
cd frontend
npm run build
```

## Support

En cas de problème, contactez l'équipe de développement.
