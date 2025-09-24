#!/usr/bin/env python
"""
Script pour peupler la base de données avec des données de test
pour Nell'Faa Groupe Majunga
"""
import os
import sys
import django
from datetime import date, datetime

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nellfaa_backend.settings')
django.setup()

from sectors.models import Sector, Service, Project, SectorStatistic
from core.models import CompanyInfo, Testimonial
from contacts.models import ContactMessage

def create_company_info():
    """Créer les informations de l'entreprise"""
    company, created = CompanyInfo.objects.get_or_create(
        defaults={
            'name': "Nell'Faa Groupe Majunga",
            'description': "Nell'Faa Groupe est un conglomérat leader à Madagascar, présent dans 7 secteurs d'activité stratégiques. Depuis notre création, nous nous engageons à offrir des solutions innovantes et de qualité pour accompagner le développement économique de Madagascar.",
            'address': "Antananarivo, Madagascar\nMajunga, Madagascar",
            'phone': "+261 34 12 345 67",
            'email': "contact@nellfaa-groupe.mg",
            'website': "https://www.nellfaa-groupe.mg",
            'facebook_url': "https://facebook.com/nellfaagroupe",
            'linkedin_url': "https://linkedin.com/company/nellfaa-groupe",
            'business_hours': "Lundi - Vendredi: 8h00 - 17h00\nSamedi: 8h00 - 12h00\nDimanche: Fermé"
        }
    )
    print(f"✅ Informations entreprise {'créées' if created else 'mises à jour'}")

def create_sectors():
    """Créer les 7 secteurs d'activité"""
    sectors_data = [
        {
            'name': 'btp',
            'display_name': 'BTP & Construction',
            'description': 'Nell\'Faa BTP est spécialisée dans la construction de bâtiments résidentiels, commerciaux et industriels. Nous offrons des services complets depuis la conception jusqu\'à la livraison, en passant par la gestion de projet.',
            'short_description': 'Construction, rénovation et gestion de projets BTP',
            'icon': '🏗️',
            'order': 1,
            'meta_title': 'BTP & Construction - Nell\'Faa Groupe',
            'meta_description': 'Services de construction et BTP à Madagascar. Bâtiments résidentiels, commerciaux et industriels.'
        },
        {
            'name': 'transport',
            'display_name': 'Transport & Logistique',
            'description': 'Notre division transport propose des solutions logistiques complètes : transport de marchandises, location de véhicules, et services de livraison. Nous couvrons tout Madagascar avec une flotte moderne et fiable.',
            'short_description': 'Solutions de transport et logistique sur tout Madagascar',
            'icon': '🚛',
            'order': 2,
            'meta_title': 'Transport & Logistique - Nell\'Faa Groupe',
            'meta_description': 'Services de transport et logistique à Madagascar. Livraison, location de véhicules.'
        },
        {
            'name': 'immobilier',
            'display_name': 'Immobilier',
            'description': 'Nell\'Faa Immobilier accompagne vos projets immobiliers : vente, location, gestion de patrimoine et promotion immobilière. Nous proposons des biens résidentiels et commerciaux de qualité.',
            'short_description': 'Vente, location et gestion immobilière',
            'icon': '🏠',
            'order': 3,
            'meta_title': 'Immobilier - Nell\'Faa Groupe',
            'meta_description': 'Agence immobilière à Madagascar. Vente, location, gestion de patrimoine.'
        },
        {
            'name': 'communication',
            'display_name': 'Communication & Marketing',
            'description': 'Notre agence de communication offre des services complets : stratégie de communication, création graphique, marketing digital, événementiel et relations publiques pour développer votre image de marque.',
            'short_description': 'Agence de communication et marketing digital',
            'icon': '📢',
            'order': 4,
            'meta_title': 'Communication & Marketing - Nell\'Faa Groupe',
            'meta_description': 'Agence de communication à Madagascar. Marketing digital, création graphique, événementiel.'
        },
        {
            'name': 'services',
            'display_name': 'Services aux Entreprises',
            'description': 'Nous proposons une gamme complète de services aux entreprises : conseil en gestion, comptabilité, ressources humaines, formation professionnelle et assistance administrative.',
            'short_description': 'Conseil, comptabilité et services aux entreprises',
            'icon': '💼',
            'order': 5,
            'meta_title': 'Services aux Entreprises - Nell\'Faa Groupe',
            'meta_description': 'Services aux entreprises à Madagascar. Conseil, comptabilité, RH, formation.'
        },
        {
            'name': 'security',
            'display_name': 'Sécurité & Surveillance',
            'description': 'Nell\'Faa Security assure la protection de vos biens et personnes avec des services de gardiennage, surveillance électronique, et conseil en sécurité. Équipe formée et équipements modernes.',
            'short_description': 'Services de sécurité et surveillance professionnelle',
            'icon': '🛡️',
            'order': 6,
            'meta_title': 'Sécurité & Surveillance - Nell\'Faa Groupe',
            'meta_description': 'Services de sécurité à Madagascar. Gardiennage, surveillance, conseil sécurité.'
        },
        {
            'name': 'import_export',
            'display_name': 'Import/Export',
            'description': 'Notre division import/export facilite vos échanges commerciaux internationaux : sourcing, négociation, transport international, dédouanement et distribution. Expertise sur les marchés africains et internationaux.',
            'short_description': 'Commerce international et négoce',
            'icon': '🌍',
            'order': 7,
            'meta_title': 'Import/Export - Nell\'Faa Groupe',
            'meta_description': 'Services import/export à Madagascar. Commerce international, sourcing, dédouanement.'
        }
    ]
    
    for sector_data in sectors_data:
        sector, created = Sector.objects.get_or_create(
            name=sector_data['name'],
            defaults=sector_data
        )
        print(f"✅ Secteur {sector.display_name} {'créé' if created else 'mis à jour'}")
    
    return Sector.objects.all()

def create_services(sectors):
    """Créer des services pour chaque secteur"""
    services_data = {
        'btp': [
            {'name': 'Construction résidentielle', 'description': 'Maisons individuelles, villas, résidences', 'icon': '🏘️'},
            {'name': 'Construction commerciale', 'description': 'Bureaux, magasins, centres commerciaux', 'icon': '🏢'},
            {'name': 'Travaux publics', 'description': 'Routes, ponts, infrastructures publiques', 'icon': '🛣️'},
            {'name': 'Rénovation', 'description': 'Réhabilitation et modernisation de bâtiments', 'icon': '🔨'},
        ],
        'transport': [
            {'name': 'Transport de marchandises', 'description': 'Livraison locale et nationale', 'icon': '📦'},
            {'name': 'Location de véhicules', 'description': 'Voitures, camions, véhicules spécialisés', 'icon': '🚗'},
            {'name': 'Logistique', 'description': 'Entreposage et gestion des stocks', 'icon': '📋'},
            {'name': 'Transport de personnes', 'description': 'Navettes et transport collectif', 'icon': '🚌'},
        ],
        'immobilier': [
            {'name': 'Vente immobilière', 'description': 'Maisons, appartements, terrains', 'icon': '🏡'},
            {'name': 'Location immobilière', 'description': 'Gestion locative et administration', 'icon': '🔑'},
            {'name': 'Promotion immobilière', 'description': 'Développement de projets immobiliers', 'icon': '🏗️'},
            {'name': 'Conseil immobilier', 'description': 'Expertise et évaluation immobilière', 'icon': '📊'},
        ],
        'communication': [
            {'name': 'Stratégie de communication', 'description': 'Conseil et planification stratégique', 'icon': '🎯'},
            {'name': 'Création graphique', 'description': 'Design, logos, supports visuels', 'icon': '🎨'},
            {'name': 'Marketing digital', 'description': 'Réseaux sociaux, SEO, publicité en ligne', 'icon': '💻'},
            {'name': 'Événementiel', 'description': 'Organisation d\'événements et salons', 'icon': '🎪'},
        ],
        'services': [
            {'name': 'Conseil en gestion', 'description': 'Stratégie d\'entreprise et organisation', 'icon': '📈'},
            {'name': 'Comptabilité', 'description': 'Tenue de comptes et fiscalité', 'icon': '🧮'},
            {'name': 'Ressources humaines', 'description': 'Recrutement et gestion du personnel', 'icon': '👥'},
            {'name': 'Formation professionnelle', 'description': 'Développement des compétences', 'icon': '🎓'},
        ],
        'security': [
            {'name': 'Gardiennage', 'description': 'Surveillance physique 24h/24', 'icon': '👮'},
            {'name': 'Surveillance électronique', 'description': 'Caméras, alarmes, contrôle d\'accès', 'icon': '📹'},
            {'name': 'Transport de fonds', 'description': 'Convoyage sécurisé', 'icon': '💰'},
            {'name': 'Conseil en sécurité', 'description': 'Audit et recommandations sécuritaires', 'icon': '🔍'},
        ],
        'import_export': [
            {'name': 'Sourcing international', 'description': 'Recherche de fournisseurs et produits', 'icon': '🔍'},
            {'name': 'Négociation commerciale', 'description': 'Contrats et accords commerciaux', 'icon': '🤝'},
            {'name': 'Transport international', 'description': 'Fret maritime, aérien et terrestre', 'icon': '🚢'},
            {'name': 'Dédouanement', 'description': 'Procédures douanières et administratives', 'icon': '📋'},
        ]
    }
    
    for sector in sectors:
        if sector.name in services_data:
            for i, service_data in enumerate(services_data[sector.name]):
                service, created = Service.objects.get_or_create(
                    sector=sector,
                    name=service_data['name'],
                    defaults={
                        'description': service_data['description'],
                        'icon': service_data['icon'],
                        'order': i + 1
                    }
                )
                if created:
                    print(f"  ✅ Service {service.name} créé pour {sector.display_name}")

def create_testimonials():
    """Créer des témoignages clients"""
    testimonials_data = [
        {
            'client_name': 'Jean Rakoto',
            'client_company': 'Entreprise Rakoto SARL',
            'content': 'Nell\'Faa Groupe a réalisé la construction de nos nouveaux bureaux. Travail de qualité, respect des délais et équipe très professionnelle. Je recommande vivement !',
            'rating': 5,
            'sector': 'btp'
        },
        {
            'client_name': 'Marie Razafy',
            'client_company': 'Commerce Razafy',
            'content': 'Excellent service de transport pour nos marchandises. Livraisons toujours à l\'heure et produits en parfait état. Partenaire de confiance depuis 3 ans.',
            'rating': 5,
            'sector': 'transport'
        },
        {
            'client_name': 'Paul Andry',
            'client_company': 'Hotel Andry',
            'content': 'Grâce à Nell\'Faa Communication, notre visibilité a considérablement augmenté. Stratégie digitale efficace et créations graphiques de qualité.',
            'rating': 4,
            'sector': 'communication'
        }
    ]
    
    for testimonial_data in testimonials_data:
        testimonial, created = Testimonial.objects.get_or_create(
            client_name=testimonial_data['client_name'],
            defaults=testimonial_data
        )
        if created:
            print(f"✅ Témoignage de {testimonial.client_name} créé")

def main():
    """Fonction principale"""
    print("🚀 Début du peuplement de la base de données...")
    
    try:
        create_company_info()
        sectors = create_sectors()
        create_services(sectors)
        create_testimonials()
        
        print("\n🎉 Base de données peuplée avec succès !")
        print(f"📊 {Sector.objects.count()} secteurs créés")
        print(f"🔧 {Service.objects.count()} services créés")
        print(f"💬 {Testimonial.objects.count()} témoignages créés")
        
    except Exception as e:
        print(f"❌ Erreur lors du peuplement : {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
