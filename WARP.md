# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Nell'Faa Groupe Majunga** - Corporate website for a 7-sector business conglomerate in Madagascar.

- **Frontend**: React.js application with responsive design
- **Backend**: Django REST API with SQLite (dev) / PostgreSQL (production)
- **Architecture**: Decoupled frontend/backend with REST API communication
- **Language**: French (Madagascar market)
- **Deployment**: Frontend on Vercel, Backend on Render

## Development Commands

### Quick Start
```bash
# Complete project startup (Windows)
start-project.bat

# Or choose option 3 for both frontend and backend
```

### Frontend (React)
```bash
cd frontend
npm install                    # Install dependencies
npm start                      # Start development server (localhost:3000)
npm run build                  # Build for production
npm test                       # Run tests
```

### Backend (Django)
```bash
cd backend
python -m venv venv            # Create virtual environment
venv\Scripts\activate          # Activate virtual environment (Windows)
pip install -r requirements.txt # Install dependencies
python manage.py migrate       # Apply database migrations
python manage.py runserver 8001 # Start server (localhost:8001)
```

### Database Management
```bash
# Backend directory
python manage.py makemigrations # Create migration files
python manage.py migrate        # Apply migrations
python manage.py createsuperuser # Create admin user
python manage.py collectstatic   # Collect static files (production)
python populate_data.py          # Populate with sample data
```

### Testing Commands
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && python manage.py test

# Run specific test file
python manage.py test sectors.tests
```

## Architecture Overview

### Backend Structure (Django)
```
backend/
├── nellfaa_backend/          # Main Django project
│   ├── settings.py          # Django configuration
│   └── urls.py              # Main URL routing
├── core/                    # Core app (company info, testimonials, news)
├── contacts/                # Contact form and newsletter
├── sectors/                 # Business sectors (BTP, Transport, etc.)
└── manage.py               # Django management commands
```

### Frontend Structure (React)
```
frontend/
├── src/
│   ├── components/          # Reusable components (Header, Footer, etc.)
│   ├── pages/              # Page components
│   │   └── sectors/        # Individual sector pages
│   ├── App.js              # Main application component
│   └── index.js            # Entry point
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

### Key Models (Django)
- **Sector**: 7 business sectors with services and projects
- **CompanyInfo**: Company details and contact information  
- **ContactMessage**: Contact form submissions with status tracking
- **Project**: Portfolio projects for each sector
- **Testimonial**: Client testimonials by sector

### API Endpoints
```
GET  /api/                          # API overview
GET  /api/company-info/             # Company information
GET  /api/sectors/                  # List all sectors
GET  /api/sectors/{name}/           # Sector details with services/projects
POST /api/contacts/submit/          # Submit contact form
GET  /api/testimonials/             # Client testimonials
GET  /api/news/                     # News articles
```

### Environment Configuration

**Backend (.env file required):**
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

**Frontend (.env optional):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_GOOGLE_MAPS_API_KEY=your-maps-key
```

## Development Workflow

### Port Configuration
- **Frontend**: localhost:3000 (configurable via PORT env var)
- **Backend**: localhost:8001 (configured in start scripts)
- **Backend Proxy**: Frontend proxies `/api` requests to backend:8001

### Common Development Tasks

**Adding a new sector page:**
1. Add color variables in `frontend/src/pages/sectors/UnifiedSectorPage.css`
2. Create new page using `SectorTemplate` component
3. Add route in `App.js`
4. Update Django models if needed

**Sector page architecture:**
All sector pages now use a unified template (`SectorTemplate.js`) with:
- Same structure and layout
- Theme-specific colors via CSS variables
- Consistent responsive behavior
- Reusable components for services, expertise, and CTA sections

**Database changes:**
1. Modify models in Django apps
2. Run `makemigrations` and `migrate`
3. Update `populate_data.py` if sample data needs changes

**Styling updates:**
- CSS files are co-located with components
- Global styles in `App.css`
- Uses AOS library for animations
- Bootstrap and React Bootstrap for UI components

### Key Dependencies

**Frontend:**
- React 18.2 with React Router v6
- Axios for API calls
- Framer Motion for animations
- React Helmet for SEO
- AOS (Animate On Scroll)
- React Icons for UI icons

**Backend:**
- Django 4.2.7 with DRF
- django-cors-headers for CORS
- django-filter for API filtering
- python-decouple for environment variables
- Pillow for image handling

## Deployment Notes

### Production Environment
- **Frontend**: Built with `npm run build`, deployed on Vercel
- **Backend**: Uses PostgreSQL, deployed on Render with Gunicorn
- **Static Files**: Served via WhiteNoise in production

### Environment Variables (Production)
```env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=production-secret-key
```

## Project-Specific Context

### Business Sectors (7 total)
1. **BTP & Construction** - Buildings, public works, renovation
2. **Transport & Logistics** - Freight, vehicle rental, delivery
3. **Immobilier** - Real estate sales, rental, property management
4. **Communication & Marketing** - Digital marketing, graphic design, events
5. **Services aux Entreprises** - Business consulting, accounting, HR
6. **Sécurité & Surveillance** - Security services, electronic surveillance
7. **Import/Export** - International trade, customs, sourcing

### Content Management
- Admin interface at `/admin` for content management
- Sectors and services are database-driven
- Contact forms are stored and manageable via admin
- Testimonials and news articles managed through Django admin

### Localization
- All content in French for Madagascar market
- Date formats use French locale
- Currency and contact information specific to Madagascar

## Troubleshooting

### Common Issues

**Port conflicts:**
- Change Django port: `python manage.py runserver 8002`
- Change React port: `set PORT=3001 && npm start`

**CORS issues:**
- Backend CORS configured for localhost:3000
- Check `CORS_ALLOWED_ORIGINS` in Django settings

**Database issues:**
- Delete `db.sqlite3` and run migrations again
- Use `populate_data.py` to restore sample data

**Frontend build issues:**
- Clear `node_modules`: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version (requires >=14.0.0)

## Code Quality & Optimization

### Recent Optimizations
- **Removed unused dependencies**: bootstrap, react-bootstrap, styled-components
- **Cleaned debug code**: Removed console.log and console.error statements
- **Simplified components**: Removed unused functions and variables
- **Optimized scripts**: Streamlined start.bat files for faster startup
- **Unified sector pages**: All sector pages now use the same CSS structure with theme-specific colors
- **Created reusable template**: SectorTemplate.js for consistent sector page architecture

### Performance Considerations
- Images should be optimized before upload
- API responses are cached where appropriate
- Lazy loading implemented for route components
- Database queries are optimized with select_related/prefetch_related
