import React from 'react';
import SectorTemplate from './SectorTemplate';

const ImportExport = () => {
  return (
    <SectorTemplate 
      sectorName="import_export"
      theme="import-export"
      sectorIcon="🌍"
      displayName="Nell'Faa Import/Export"
      tagline="Commerce International & Négoce"
      metaTitle="Nell'Faa Import/Export - Commerce International et Négoce à Majunga"
      metaDescription="Nell'Faa Import/Export, votre partenaire commerce international à Majunga. Sourcing, négociation, transport international et dédouanement."
      heroDescription="Nous facilitons vos échanges commerciaux internationaux avec expertise et réseau mondial. De la prospection à la livraison, nous optimisons votre chaîne d'approvisionnement."
      
      servicesTitle="Nos Services Import/Export"
      servicesSubtitle="Solutions complètes pour vos échanges commerciaux internationaux"
      defaultServices={[
        'Sourcing international et prospection fournisseurs',
        'Négociation commerciale et contrats',
        'Transport international multimodal',
        'Dédouanement et procédures administratives',
        'Financement et assurance du commerce',
        'Distribution et logistique locale'
      ]}
      
      propertiesTitle="Nos Marchés"
      propertiesSubtitle="Réseaux commerciaux établis sur les marchés porteurs"
      defaultProperties={[
        {
          type: 'Afrique de l\'Est',
          description: 'Partenariats commerciaux solides avec les pays de l\'Océan Indien et l\'Afrique de l\'Est',
          range: 'Multi-pays'
        },
        {
          type: 'Asie-Pacifique',
          description: 'Réseau de fournisseurs et distributeurs en Chine, Inde et pays d\'Asie du Sud-Est',
          range: 'Industriel'
        },
        {
          type: 'Europe',
          description: 'Importation de technologies, équipements et produits manufacturés européens',
          range: 'Spécialisé'
        }
      ]}
      
      expertiseTitle="Notre Réseau"
      defaultExpertise={[
        {
          title: '🌐 Réseau International',
          description: 'Partenaires de confiance dans plus de 20 pays pour sécuriser vos approvisionnements.'
        },
        {
          title: '📦 Logistique Optimisée',
          description: 'Maîtrise complète de la chaîne logistique internationale et des incoterms.'
        },
        {
          title: '💼 Expertise Réglementaire',
          description: 'Connaissance approfondie des réglementations douanières et commerciales.'
        }
      ]}
      
      ctaTitle="Développez Votre Commerce International"
      ctaDescription="Accédez aux marchés mondiaux avec notre expertise et notre réseau de partenaires internationaux."
    />
  );
};

export default ImportExport;