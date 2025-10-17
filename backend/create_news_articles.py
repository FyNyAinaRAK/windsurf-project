#!/usr/bin/env python
"""
Script pour créer des articles de presse pour Nell'Faa Groupe
"""
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

def create_articles():
    """Créer des articles de presse pour Nell'Faa Groupe"""
    
    articles_data = [
        {
            'title': "Premier éco-quartier de Majunga",
            'content': """
<p>Nell'Faa Immobilier vient d'annoncer le lancement d'un projet ambitieux : le premier éco-quartier de Majunga. Ce complexe résidentiel innovant de 120 logements intégrera les dernières technologies en matière de développement durable.</p>

<h3>Un projet écologique et moderne</h3>
<p>Le projet "Les Jardins Verts de Majunga" s'étend sur 5 hectares et proposera des appartements de standing avec des équipements écologiques de pointe :</p>
<ul>
    <li>Panneaux solaires sur tous les toits</li>
    <li>Système de récupération d'eau de pluie</li>
    <li>Espaces verts représentant 40% de la surface totale</li>
    <li>Pistes cyclables et zones piétonnes</li>
    <li>Station de compostage communautaire</li>
</ul>

<h3>Un engagement pour l'environnement</h3>
<p>"Ce projet illustre notre vision d'un développement immobilier responsable", déclare le directeur de Nell'Faa Immobilier. "Nous voulons prouver qu'il est possible de construire des logements modernes et confortables tout en respectant l'environnement."</p>

<p>Les travaux débuteront en janvier 2026 et les premières livraisons sont prévues pour fin 2027. Les prix démarrent à partir de 45 millions d'Ariary pour un T2.</p>
            """,
            'excerpt': "Nell'Faa Immobilier lance le premier éco-quartier de Majunga avec 120 logements écologiques et modernes.",
            'is_featured': True,
            'published_date': datetime.now() - timedelta(days=2)
        },
        {
            'title': "20 nouveaux véhicules hybrides",
            'content': """
<p>Dans le cadre de sa stratégie de transition écologique, Nell'Faa Transport vient d'acquérir 20 nouveaux véhicules hybrides pour renforcer sa flotte de transport de marchandises et de passagers.</p>

<h3>Une flotte moderne et écologique</h3>
<p>Ces véhicules de dernière génération permettront de réduire de 45% les émissions de CO2 tout en offrant un confort optimal. L'investissement total s'élève à 1,2 milliard d'Ariary.</p>

<h3>Nouvelles liaisons</h3>
<p>La nouvelle flotte desservira :</p>
<ul>
    <li>Majunga - Antananarivo (départs quotidiens)</li>
    <li>Majunga - Antsohihy (3 fois par semaine)</li>
    <li>Majunga - Mahajanga Port (navettes régulières)</li>
</ul>

<p>Un service de réservation en ligne sera lancé prochainement pour faciliter les réservations.</p>
            """,
            'excerpt': "Nell'Faa Transport investit 1,2 milliard d'Ariary dans 20 véhicules hybrides pour moderniser sa flotte.",
            'is_featured': True,
            'published_date': datetime.now() - timedelta(days=5)
        },
        {
            'title': "Construction du centre commercial Majunga Plaza",
            'content': """
<p>Nell'Faa BTP a été sélectionné pour construire le nouveau centre commercial "Majunga Plaza", un projet de 8 milliards d'Ariary qui transformera le paysage commercial de la ville.</p>

<h3>Un projet d'envergure</h3>
<p>Le centre commercial s'étendra sur 15 000 m² et comprendra :</p>
<ul>
    <li>80 boutiques et commerces</li>
    <li>Un hypermarché de 3 000 m²</li>
    <li>Un food court avec 15 restaurants</li>
    <li>Un cinéma multiplex de 6 salles</li>
    <li>Un parking de 500 places</li>
</ul>

<h3>Création d'emplois</h3>
<p>Le projet créera plus de 300 emplois directs pendant la construction et 800 emplois permanents une fois opérationnel.</p>

<p>L'ouverture est prévue pour décembre 2026.</p>
            """,
            'excerpt': "Nell'Faa BTP construira le nouveau centre commercial Majunga Plaza, un projet de 8 milliards d'Ariary.",
            'is_featured': False,
            'published_date': datetime.now() - timedelta(days=8)
        },
        {
            'title': "Sécurisation du nouveau port de Majunga",
            'content': """
<p>Nell'Faa Security a remporté le contrat de sécurisation du nouveau port de Majunga, un projet stratégique pour le développement économique de la région.</p>

<h3>Un dispositif de sécurité moderne</h3>
<p>Le système de sécurité comprendra :</p>
<ul>
    <li>150 caméras de surveillance HD</li>
    <li>Contrôle d'accès biométrique</li>
    <li>Patrouilles 24h/24 et 7j/7</li>
    <li>Centre de contrôle centralisé</li>
    <li>Système d'alarme intelligent</li>
</ul>

<p>Ce contrat de 3 ans représente un investissement de 2,5 milliards d'Ariary et créera 80 emplois.</p>
            """,
            'excerpt': "Nell'Faa Security remporte le contrat de sécurisation du nouveau port de Majunga.",
            'is_featured': False,
            'published_date': datetime.now() - timedelta(days=12)
        },
        {
            'title': "Nouvelle agence digitale à Majunga",
            'content': """
<p>Nell'Faa Communication annonce l'ouverture de sa nouvelle agence spécialisée dans le marketing digital et les réseaux sociaux.</p>

<h3>Services proposés</h3>
<ul>
    <li>Gestion de réseaux sociaux</li>
    <li>Création de sites web</li>
    <li>Référencement SEO/SEA</li>
    <li>Production de contenu vidéo</li>
    <li>Stratégie digitale</li>
</ul>

<p>L'agence emploiera 15 spécialistes du digital et vise à accompagner les entreprises malgaches dans leur transformation numérique.</p>
            """,
            'excerpt': "Nell'Faa Communication ouvre une agence digitale pour accompagner les entreprises dans leur transformation numérique.",
            'is_featured': False,
            'published_date': datetime.now() - timedelta(days=15)
        }
    ]
    
    print("🚀 Création des articles de presse...")
    created_count = 0
    updated_count = 0
    
    for article_data in articles_data:
        slug = slugify(article_data['title'])
        article, created = NewsArticle.objects.update_or_create(
            slug=slug,
            defaults={
                'title': article_data['title'],
                'content': article_data['content'],
                'excerpt': article_data['excerpt'],
                'is_featured': article_data['is_featured'],
                'published_date': article_data['published_date'],
                'is_active': True
            }
        )
        
        if created:
            created_count += 1
            print(f"✅ Article créé : {article.title}")
        else:
            updated_count += 1
            print(f"🔄 Article mis à jour : {article.title}")
    
    print(f"\n🎉 Terminé !")
    print(f"📝 {created_count} articles créés")
    print(f"🔄 {updated_count} articles mis à jour")
    print(f"📊 Total : {NewsArticle.objects.count()} articles dans la base")

if __name__ == '__main__':
    create_articles()
