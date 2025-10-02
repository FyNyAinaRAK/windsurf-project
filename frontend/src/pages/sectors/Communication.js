import React from 'react';
import SectorTemplate from './SectorTemplate';

const Communication = () => {
  return (
    <SectorTemplate 
      sectorName="communication"
      theme="communication"
      sectorIcon="📢"
      displayName="Nell'Faa Communication"
      tagline="Marketing Digital & Communication"
      metaTitle="Nell'Faa Communication - Marketing Digital et Communication à Majunga"
      metaDescription="Nell'Faa Communication, votre agence de communication et marketing digital à Majunga. Stratégie, création graphique, événementiel et relations publiques."
      heroDescription="Nous transformons vos idées en messages percutants. Notre agence créative vous accompagne dans toutes vos stratégies de communication pour développer votre notoriété et votre image de marque."
      
      servicesTitle="Nos Services Communication"
      servicesSubtitle="Solutions créatives pour renforcer votre présence et votre impact"
      defaultServices={[
        'Stratégie de communication et conseil',
        'Création graphique et identité visuelle',
        'Marketing digital et réseaux sociaux',
        'Conception et impression de supports',
        'Organisation d\'événements corporatifs',
        'Relations presse et relations publiques'
      ]}
      
      propertiesTitle="Nos Réalisations"
      propertiesSubtitle="Campagnes et projets créatifs qui font la différence"
      defaultProperties={[
        {
          type: 'Campagnes Digitales',
          description: 'Stratégies social media et campagnes publicitaires en ligne pour maximiser votre visibilité',
          range: 'Multi-plateforme'
        },
        {
          type: 'Identité Visuelle',
          description: 'Création de logos, chartes graphiques et supports de communication personnalisés',
          range: 'Sur mesure'
        },
        {
          type: 'Événementiel',
          description: 'Organisation complète d\'événements d\'entreprise, lancements produits et séminaires',
          range: '20-500 pers.'
        }
      ]}
      
      expertiseTitle="Notre Créativité"
      defaultExpertise={[
        {
          title: '🎨 Créativité & Innovation',
          description: 'Équipe créative passionnée qui transforme vos idées en concepts visuels impactants.'
        },
        {
          title: '📱 Digital Native',
          description: 'Expertise complète du marketing digital et des nouveaux médias pour une présence optimale.'
        },
        {
          title: '🎯 Stratégie Sur Mesure',
          description: 'Approche personnalisée pour chaque client avec des solutions adaptées à vos objectifs.'
        }
      ]}
      
      ctaTitle="Prêt à Booster Votre Communication ?"
      ctaDescription="Découvrez comment notre créativité peut transformer votre image de marque et développer votre notoriété."
    />
  );
};

export default Communication;