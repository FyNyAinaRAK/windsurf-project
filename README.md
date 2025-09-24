# Nell'Faa Groupe Majunga - Site Web

Site web professionnel pour Nell'Faa Groupe Majunga, un conglomérat actif dans 7 secteurs d'activité.

## 🏗️ Architecture

- **Frontend**: React.js (responsive, moderne)
- **Backend**: Django + Django REST Framework
- **Base de données**: SQLite (dev) / PostgreSQL (prod)
- **Déploiement**: React sur Vercel, Django sur Render

## 🏢 Secteurs d'activité

1. **Nell'Faa BTP** - Construction et travaux publics
2. **Nell'Faa Transport** - Solutions de transport et logistique
3. **Nell'Faa Immobilier** - Vente, location et gestion immobilière
4. **Nell'Faa Communication** - Marketing digital et communication
5. **Nell'Faa Services** - Services aux entreprises et particuliers
6. **Nell'Faa Security** - Sécurité et surveillance professionnelle
7. **Nell'Faa Import/Export** - Commerce international et négoce

## 📁 Structure du projet

```
nellfaa-website/
├── frontend/                    # Application React.js
│   ├── public/                 # Fichiers publics
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   │   └── sectors/       # Pages des secteurs
│   │   ├── App.js             # Composant principal
│   │   └── index.js           # Point d'entrée
│   ├── package.json           # Dépendances npm
│   └── start.bat             # Script de démarrage Windows
├── backend/                    # API Django
│   ├── nellfaa_backend/       # Configuration Django
│   ├── core/                  # App principale
│   ├── contacts/              # Gestion des contacts
│   ├── sectors/               # Gestion des secteurs
│   ├── requirements.txt       # Dépendances Python
│   ├── .env.example          # Variables d'environnement
│   └── start.bat             # Script de démarrage Windows
├── start-project.bat          # Démarrage complet du projet
└── README.md                  # Documentation
```

## 🚀 Démarrage rapide

### Option 1: Démarrage automatique (Windows)
Double-cliquez sur `start-project.bat` et choisissez l'option 3 pour démarrer le projet complet.

### Option 2: Démarrage manuel

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```
L'application sera disponible sur http://localhost:3000

#### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```
L'API sera disponible sur http://localhost:8000

## 🔧 Configuration

### Variables d'environnement (Backend)
Copiez `.env.example` vers `.env` et configurez:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Première utilisation
1. Créer un superutilisateur Django:
   ```bash
   python manage.py createsuperuser
   ```
2. Accéder à l'admin: http://localhost:8000/admin
3. Ajouter les données des secteurs et services

## 📱 Fonctionnalités

### Frontend
- ✅ Design responsive (PC, tablette, mobile)
- ✅ Navigation intuitive avec menu déroulant
- ✅ Page d'accueil moderne avec hero section
- ✅ 7 pages secteurs détaillées
- ✅ Page À propos avec timeline
- ✅ Formulaire de contact/devis
- ✅ Animations et transitions fluides
- ✅ SEO optimisé

### Backend
- ✅ API REST complète
- ✅ Gestion des secteurs et services
- ✅ Système de contact avec email
- ✅ Administration Django
- ✅ Gestion des projets et témoignages
- ✅ Support multilingue (français)

## 🌐 API Endpoints

- `GET /api/` - Vue d'ensemble de l'API
- `GET /api/company-info/` - Informations de l'entreprise
- `GET /api/sectors/` - Liste des secteurs
- `GET /api/sectors/{name}/` - Détails d'un secteur
- `POST /api/contacts/submit/` - Envoi de message de contact
- `GET /api/testimonials/` - Témoignages clients
- `GET /api/news/` - Articles de presse

## 🎨 Design System

### Couleurs
- **Primaire**: #1a365d (Bleu foncé)
- **Secondaire**: #2d3748 (Gris foncé)
- **Accent**: #3182ce (Bleu)
- **Texte**: #718096 (Gris clair)
- **Fond**: #f7fafc (Gris très clair)

### Typographie
- **Police**: Inter (Google Fonts)
- **Tailles**: 1rem à 3.5rem selon les éléments

## 📋 Administration

### Accès admin Django
- URL: http://localhost:8000/admin
- Gérer les secteurs, services, projets
- Consulter les messages de contact
- Modérer les témoignages

### Contenu à ajouter
1. **Secteurs**: Descriptions détaillées de chaque secteur
2. **Services**: Liste des services par secteur
3. **Projets**: Projets réalisés avec images
4. **Témoignages**: Avis clients
5. **Informations entreprise**: Coordonnées, horaires

## 🚀 Déploiement

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Déployer le dossier build/ sur Vercel
```

### Backend (Render/Railway)
1. Configurer les variables d'environnement
2. Utiliser PostgreSQL en production
3. Configurer les fichiers statiques avec WhiteNoise

## 📞 Support

Pour toute question ou assistance:
- **Email**: contact@nellfaa-groupe.mg
- **Téléphone**: +261 XX XX XXX XX

## 📄 Licence

Projet propriétaire - Nell'Faa Groupe Majunga © 2024
