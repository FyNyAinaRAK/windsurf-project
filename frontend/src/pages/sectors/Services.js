import React from 'react';
import SectorTemplate from './SectorTemplate';

const Services = () => {
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
      administrativeServices={[
        'Gestion administrative et comptable',
        'Déclarations fiscales et sociales',
        'Rédaction de contrats et documents légaux',
        'Conseil juridique et réglementaire',
        'Domiciliation d\'entreprise',
        'Secrétariat et accueil téléphonique'
      ]}
      
      // Services non-administratifs (techniques)
      defaultServices={[
        'Maintenance et réparation d\'équipements',
        'Installation de systèmes techniques',
        'Conseil et expertise technique',
        'Services de dépannage et intervention',
        'Formation technique et accompagnement',
        'Audit et optimisation de procédés'
      ]}
      
      propertiesTitle="Nos Domaines d'Expertise"
      propertiesSubtitle="Secteurs couverts par nos services techniques spécialisés"
      defaultProperties={[
        {
          type: 'Maintenance Industrielle',
          description: 'Services de maintenance préventive et curative pour équipements industriels',
          range: 'Planifié'
        },
        {
          type: 'Installation Technique',
          description: 'Mise en place et configuration de systèmes techniques complexes',
          range: 'Sur mesure'
        },
        {
          type: 'Dépannage Urgent',
          description: 'Interventions rapides pour résoudre vos pannes et dysfonctionnements',
          range: '24h/24'
        }
      ]}
      
      expertiseTitle="Notre Savoir-Faire"
      defaultExpertise={[
        {
          title: '🔧 Expertise Technique',
          description: 'Équipe de techniciens qualifiés maîtrisant les technologies les plus récentes.'
        },
        {
          title: '⚡ Réactivité',
          description: 'Interventions rapides et efficaces pour minimiser vos temps d\'arrêt.'
        },
        {
          title: '📊 Solutions Optimisées',
          description: 'Approche analytique pour optimiser vos processus et réduire vos coûts.'
        }
      ]}
      
      ctaTitle="Optimisez Vos Opérations"
      ctaDescription="Bénéficiez de notre expertise technique pour améliorer l'efficacité de vos installations et processus."
    />
  );
};

export default Services;