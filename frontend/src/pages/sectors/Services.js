import React from 'react';
import SectorTemplate from './SectorTemplate';

const Services = () => {
  // Données des services administratifs
  const administrativeServices = [
    'Gestion administrative et comptable',
    'Déclarations fiscales et sociales',
    'Rédaction de contrats et documents légaux',
    'Conseil juridique et réglementaire',
    'Domiciliation d\'entreprise',
    'Secrétariat et accueil téléphonique'
  ];

  // Données des services techniques par défaut
  const defaultServices = [
    'Maintenance et réparation d\'équipements',
    'Installation de systèmes techniques',
    'Conseil et expertise technique',
    'Services de dépannage et intervention',
    'Formation technique et accompagnement',
    'Audit et optimisation de procédés'
  ];

  // Données des domaines d'expertise
  const defaultProperties = [
    {
      id: 1,
      type: 'Maintenance Industrielle',
      description: 'Services de maintenance préventive et curative pour équipements industriels',
      range: 'Planifié'
    },
    {
      id: 2,
      type: 'Installation Technique',
      description: 'Mise en place et configuration de systèmes techniques complexes',
      range: 'Sur mesure'
    },
    {
      id: 3,
      type: 'Dépannage Urgent',
      description: 'Interventions rapides pour résoudre vos pannes et dysfonctionnements',
      range: '24h/24'
    }
  ];

  // Données du savoir-faire
  const defaultExpertise = [
    {
      id: 1,
      icon: '🔧',
      title: 'Expertise Technique',
      description: 'Équipe de techniciens qualifiés maîtrisant les technologies les plus récentes.'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Réactivité',
      description: 'Interventions rapides et efficaces pour minimiser vos temps d\'arrêt.'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Solutions Optimisées',
      description: 'Approche analytique pour optimiser vos processus et réduire vos coûts.'
    }
  ];

  return (
    <SectorTemplate 
      sectorName="services"
      theme="services"
      sectorIcon="🔧"
      displayName="Nell'Faa Services"
      tagline="Services Professionnels & Solutions Techniques"
      metaTitle="Nell'Faa Services - Services Professionnels et Solutions Techniques à Majunga"
      metaDescription="Nell'Faa Services, votre partenaire pour tous services professionnels à Majunga. Maintenance, réparation, installation et conseil technique."
      heroDescription="Nous offrons une gamme complète de services professionnels pour répondre à tous vos besoins techniques et opérationnels. Notre expertise technique au service de votre réussite."
      
      servicesTitle="Nos Services Professionnels"
      servicesSubtitle="Solutions complètes pour entreprises et particuliers"
      
      // Services administratifs
      administrativeServices={administrativeServices}
      
      // Services non-administratifs (techniques)
      defaultServices={defaultServices}
      
      propertiesTitle="Nos Domaines d'Expertise"
      propertiesSubtitle="Secteurs couverts par nos services techniques spécialisés"
      defaultProperties={defaultProperties}
      
      expertiseTitle="Notre Savoir-Faire"
      defaultExpertise={defaultExpertise}
      
      ctaTitle="Optimisez Vos Opérations"
      ctaDescription="Bénéficiez de notre expertise technique pour améliorer l'efficacité de vos installations et processus."
    />
  );
};

export default Services;