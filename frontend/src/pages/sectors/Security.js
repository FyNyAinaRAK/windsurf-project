import React from 'react';
import SectorTemplate from './SectorTemplate';

const Security = () => {
  return (
    <SectorTemplate 
      sectorName="security"
      theme="security"
      sectorIcon="🛡️"
      displayName="Nell'Faa Sécurité"
      tagline="Sécurité & Surveillance Professionnelle"
      metaTitle="Nell'Faa Sécurité - Services de Sécurité et Surveillance à Majunga"
      metaDescription="Nell'Faa Sécurité, votre partenaire sécurité à Majunga. Gardiennage, surveillance, sécurité événementielle et conseils en sûreté."
      heroDescription="Nous protégeons vos biens, vos personnes et vos activités avec des solutions de sécurité adaptées. Notre expertise couvre la surveillance, le gardiennage et le conseil en sûreté."
      
      servicesTitle="Nos Services Sécurité"
      servicesSubtitle="Protection intégrée pour tous vos besoins de sécurité"
      defaultServices={[
        'Gardiennage et surveillance de sites',
        'Sécurité événementielle et manifestations',
        'Rondes de surveillance et patrouilles',
        'Installation de systèmes de sécurité',
        'Conseil et audit de sûreté',
        'Formation du personnel sécurité'
      ]}
      
      propertiesTitle="Nos Domaines d'Intervention"
      propertiesSubtitle="Secteurs couverts par nos services de sécurité professionnelle"
      defaultProperties={[
        {
          type: 'Sites Industriels',
          description: 'Surveillance et protection des installations industrielles avec personnel qualifié',
          range: '24h/24'
        },
        {
          type: 'Centres Commerciaux',
          description: 'Sécurisation des espaces commerciaux et protection des biens et personnes',
          range: 'Sur mesure'
        },
        {
          type: 'Événements',
          description: 'Sécurité événementielle pour manifestations, concerts et rassemblements',
          range: 'Temporaire'
        }
      ]}
      
      expertiseTitle="Notre Expertise"
      defaultExpertise={[
        {
          title: '👮 Personnel Qualifié',
          description: 'Équipe de professionnels formés et certifiés pour tous types de missions de sécurité.'
        },
        {
          title: '📹 Technologies Modernes',
          description: 'Équipements de surveillance high-tech et systèmes de sécurité dernière génération.'
        },
        {
          title: '🚨 Réactivité 24/7',
          description: 'Service d\'intervention rapide disponible 24h/24 et 7j/7 pour vos urgences.'
        }
      ]}
      
      ctaTitle="Sécurisez Votre Environnement"
      ctaDescription="Protégez efficacement vos biens et activités avec nos solutions de sécurité professionnelles."
    />
  );
};

export default Security;