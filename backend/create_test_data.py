import os
import django

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nellfaa_backend.settings')
django.setup()

from sectors.models import Sector, Service, Project, SectorStatistic

def create_test_data():
    # Create a test sector
    sector, created = Sector.objects.get_or_create(
        name='btp',
        defaults={
            'display_name': 'BTP',
            'description': 'Secteur du Bâtiment et Travaux Publics',
            'short_description': 'Construction et rénovation de bâtiments',
            'icon': '🏗️',
            'is_active': True,
            'meta_title': 'Nell\'Faa BTP - Construction et Rénovation',
            'meta_description': 'Services de construction et rénovation de qualité supérieure',
        }
    )
    
    if created:
        print(f"Created sector: {sector.display_name}")
        
        # Add some services
        services = [
            {
                'name': 'Construction neuve',
                'description': 'Construction de bâtiments neufs sur mesure',
                'icon': '🏢',
                'is_administrative': False,
                'order': 1
            },
            {
                'name': 'Rénovation',
                'description': 'Rénovation complète de bâtiments existants',
                'icon': '🔨',
                'is_administrative': False,
                'order': 2
            },
            {
                'name': 'Devis personnalisé',
                'description': 'Étude et réalisation de devis sur mesure',
                'icon': '📝',
                'is_administrative': True,
                'order': 1
            }
        ]
        
        for service_data in services:
            service = Service.objects.create(sector=sector, **service_data)
            print(f"  - Added service: {service.name}")
        
        # Add a test project
        project = Project.objects.create(
            sector=sector,
            title='Résidence Les Palmiers',
            description='Construction d\'une résidence de luxe de 20 appartements',
            client='Promoteur Immobilier Majunga',
            location='Majunga',
            is_active=True,
            is_featured=True,
            budget_range='1 500 000 000 Ar',
            duration='18 mois'
        )
        print(f"  - Added project: {project.title}")
        
        # Add some statistics
        stats = [
            {'label': 'Projets réalisés', 'value': '150+', 'unit': '', 'order': 1},
            {'label': 'Années d\'expérience', 'value': '10+', 'unit': 'ans', 'order': 2},
            {'label': 'Taux de satisfaction', 'value': '98', 'unit': '%', 'order': 3},
        ]
        
        for stat_data in stats:
            stat = SectorStatistic.objects.create(sector=sector, **stat_data)
            print(f"  - Added stat: {stat.label}")
    else:
        print(f"Sector {sector.display_name} already exists")

if __name__ == '__main__':
    create_test_data()
