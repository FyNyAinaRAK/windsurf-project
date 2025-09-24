#!/usr/bin/env python
import os
import sys
import django
from datetime import datetime, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nellfaa_backend.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
django.setup()

from core.models import NewsArticle
from django.utils.text import slugify

def create_sample_articles():
    """Create sample news articles for Nell'Faa Groupe"""
    
    articles = [
        {
            'title': "Nell'Faa BTP inaugure un nouveau complexe résidentiel à Majunga",
            'content': """
Nell'Faa BTP vient d'achever la construction d'un complexe résidentiel moderne de 50 logements dans le quartier d'Amborovy à Majunga. Ce projet, d'une valeur de 2,5 milliards d'Ariary, représente un nouveau standard de qualité dans l'habitat malgache.

Le complexe "Les Jardins d'Amborovy" propose des appartements de 2 à 4 pièces, tous équipés de systèmes solaires et de récupération d'eau de pluie. Les espaces verts occupent 30% de la superficie totale, offrant un cadre de vie exceptionnel aux résidents.

"Ce projet illustre notre engagement envers un développement durable et une architecture respectueuse de l'environnement tropical de Madagascar", déclare le directeur de Nell'Faa BTP.

Les premières familles emménageront dès le mois prochain, marquant une nouvelle étape dans le développement urbain de Majunga.
            """,
            'excerpt': "Nell'Faa BTP inaugure un complexe résidentiel moderne de 50 logements à Majunga, alliant confort, durabilité et respect de l'environnement.",
            'is_featured': True,
            'published_date': datetime.now() - timedelta(days=2)
        },
        {
            'title': "Nell'Faa Transport étend sa flotte avec 15 nouveaux véhicules écologiques",
            'content': """
Dans le cadre de sa stratégie de modernisation et de respect de l'environnement, Nell'Faa Transport vient d'acquérir 15 nouveaux véhicules hybrides pour renforcer sa flotte de transport de marchandises et de passagers.

Ces véhicules de dernière génération permettront de réduire de 40% les émissions de CO2 tout en offrant un confort optimal aux passagers. L'investissement de 800 millions d'Ariary témoigne de l'engagement du groupe envers une mobilité durable.

La nouvelle flotte desservira principalement les liaisons Majunga-Antananarivo et Majunga-Mahajanga, avec des départs quotidiens. Un service de réservation en ligne sera également lancé prochainement.

"Cette modernisation s'inscrit dans notre vision d'un transport responsable et efficace pour Madagascar", explique la direction de Nell'Faa Transport.
            """,
            'excerpt': "Nell'Faa Transport investit dans 15 véhicules hybrides pour moderniser sa flotte et réduire son impact environnemental.",
            'is_featured': False,
            'published_date': datetime.now() - timedelta(days=5)
        },
        {
            'title': "Nell'Faa Security remporte le contrat de sécurisation du nouveau port de Majunga",
            'content': """
Nell'Faa Security a été sélectionnée pour assurer la sécurité du nouveau terminal portuaire de Majunga, un contrat de 3 ans représentant un chiffre d'affaires de 1,2 milliard d'Ariary.

Ce contrat prestigieux comprend la surveillance 24h/24 des installations, le contrôle d'accès, la sécurité incendie et la protection des marchandises. Une équipe de 45 agents spécialement formés sera déployée sur le site.

L'entreprise utilisera les technologies les plus avancées : caméras haute définition, systèmes de détection d'intrusion, contrôle biométrique et centre de supervision moderne.

"Cette reconnaissance de nos compétences par les autorités portuaires confirme notre position de leader dans la sécurité industrielle à Madagascar", se réjouit le directeur de Nell'Faa Security.

Le déploiement commencera dès la semaine prochaine avec une phase de formation intensive des équipes.
            """,
            'excerpt': "Nell'Faa Security décroche le contrat de sécurisation du nouveau port de Majunga, confirmant son expertise en sécurité industrielle.",
            'is_featured': True,
            'published_date': datetime.now() - timedelta(days=7)
        },
        {
            'title': "Nell'Faa Communication lance sa nouvelle agence digitale",
            'content': """
Nell'Faa Communication annonce l'ouverture de sa division digitale, spécialisée dans le marketing numérique et la transformation digitale des entreprises malgaches.

Cette nouvelle agence propose une gamme complète de services : création de sites web, gestion des réseaux sociaux, référencement SEO, publicité en ligne et stratégie digitale. Une équipe de 12 spécialistes, formés aux dernières technologies, accompagnera les clients dans leur transition numérique.

"Le marché malgache connaît une croissance exponentielle dans le digital. Nous voulons aider les entreprises locales à saisir ces opportunités", explique la directrice de Nell'Faa Communication.

L'agence a déjà signé ses premiers contrats avec des entreprises de Majunga et d'Antananarivo. Un programme de formation gratuite aux outils digitaux sera également proposé aux PME locales.
            """,
            'excerpt': "Nell'Faa Communication ouvre sa division digitale pour accompagner la transformation numérique des entreprises malgaches.",
            'is_featured': False,
            'published_date': datetime.now() - timedelta(days=10)
        },
        {
            'title': "Nell'Faa Immobilier développe le premier éco-quartier de Majunga",
            'content': """
Nell'Faa Immobilier lance un projet ambitieux : la création du premier éco-quartier de Majunga sur un terrain de 15 hectares. Ce projet innovant combinera habitat, commerces et espaces verts dans une approche durable.

L'éco-quartier "Majunga Green" accueillera 200 logements, un centre commercial, une école et un centre médical. Toutes les constructions respecteront les normes environnementales les plus strictes avec l'utilisation d'énergies renouvelables et de matériaux locaux.

Le projet prévoit également la création d'un parc de 3 hectares, d'un système de gestion des eaux pluviales et d'un réseau de pistes cyclables. Les travaux débuteront en 2024 pour une livraison prévue en 2026.

"Ce projet révolutionnaire transformera la façon dont nous concevons l'urbanisme à Madagascar", affirme l'équipe de Nell'Faa Immobilier.

Les premières réservations ouvriront dans les prochaines semaines.
            """,
            'excerpt': "Nell'Faa Immobilier lance le premier éco-quartier de Majunga, un projet innovant alliant habitat durable et espaces verts.",
            'is_featured': True,
            'published_date': datetime.now() - timedelta(days=14)
        }
    ]
    
    print("Création des articles de presse...")
    
    for article_data in articles:
        slug = slugify(article_data['title'])
        
        # Vérifier si l'article existe déjà
        if not NewsArticle.objects.filter(slug=slug).exists():
            article = NewsArticle.objects.create(
                title=article_data['title'],
                slug=slug,
                content=article_data['content'].strip(),
                excerpt=article_data['excerpt'],
                is_featured=article_data['is_featured'],
                published_date=article_data['published_date']
            )
            print(f"✅ Article créé: {article.title}")
        else:
            print(f"⚠️ Article existant: {article_data['title']}")
    
    print(f"\n🎉 Processus terminé! {NewsArticle.objects.count()} articles au total dans la base.")

if __name__ == '__main__':
    create_sample_articles()
