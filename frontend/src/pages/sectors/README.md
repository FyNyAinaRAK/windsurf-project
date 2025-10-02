# Pages Secteurs - Système Unifié

## Vue d'ensemble

Toutes les pages secteurs utilisent maintenant le **même design et la même structure**, avec uniquement **les couleurs qui changent** selon le secteur.

## Architecture

### Fichiers principaux

- **`UnifiedSectorPage.css`** - CSS unifié avec variables de couleurs par secteur
- **`SectorTemplate.js`** - Template React réutilisable pour tous les secteurs
- **Pages secteurs** - Chaque page utilise le template avec ses données spécifiques

### Structure uniforme

Toutes les pages secteurs suivent la même structure :

1. **Hero Section** - Bannière avec icône, titre et description
2. **Services Section** - Grille de services avec numérotation
3. **Properties/Projects Section** - Section spécialisée par secteur
4. **Expertise Section** - Points forts avec image
5. **CTA Section** - Appel à l'action avec boutons

## Couleurs par secteur

### 🏗️ BTP (Orange/Terre cuite)
```css
--primary-color: #ed8936;
--primary-dark: #dd6b20;
--primary-light: #f6ad55;
```

### 🚛 Transport (Bleu)
```css
--primary-color: #4299e1;
--primary-dark: #3182ce;
--primary-light: #63b3ed;
```

### 🏠 Immobilier (Doré)
```css
--primary-color: #d69e2e;
--primary-dark: #b7791f;
--primary-light: #f6ad55;
```

### 📢 Communication (Vert)
```css
--primary-color: #48bb78;
--primary-dark: #38a169;
--primary-light: #68d391;
```

### 💼 Services (Violet)
```css
--primary-color: #805ad5;
--primary-dark: #6b46c1;
--primary-light: #9f7aea;
```

### 🛡️ Security (Rouge)
```css
--primary-color: #f56565;
--primary-dark: #e53e3e;
--primary-light: #fc8181;
```

### 🌍 Import/Export (Teal)
```css
--primary-color: #38b2ac;
--primary-dark: #319795;
--primary-light: #4fd1c7;
```

## Comment utiliser le template

### Exemple d'utilisation

```jsx
import React from 'react';
import SectorTemplate from './SectorTemplate';

const MonSecteur = () => {
  return (
    <SectorTemplate 
      sectorName="nom_du_secteur"
      theme="nom-du-theme"
      sectorIcon="🎯"
      displayName="Nom Affiché"
      tagline="Slogan du secteur"
      metaTitle="Titre SEO"
      metaDescription="Description SEO"
      heroDescription="Description du hero"
      
      servicesTitle="Nos Services"
      servicesSubtitle="Sous-titre des services"
      defaultServices={[
        'Service 1',
        'Service 2',
        // ...
      ]}
      
      // Section optionnelle
      propertiesTitle="Nos Réalisations"
      propertiesSubtitle="Sous-titre"
      defaultProperties={[
        {
          type: 'Type',
          description: 'Description',
          range: 'Gamme'
        }
      ]}
      
      expertiseTitle="Notre Expertise"
      defaultExpertise={[
        {
          title: '🎯 Point Fort',
          description: 'Description du point fort'
        }
      ]}
      
      ctaTitle="Titre CTA"
      ctaDescription="Description CTA"
    />
  );
};
```

### Paramètres obligatoires

- `sectorName` - Nom technique pour l'API (ex: "btp", "transport")
- `theme` - Classe CSS du thème (ex: "btp-theme", "transport-theme")
- `sectorIcon` - Emoji ou icône du secteur
- `displayName` - Nom affiché (ex: "Nell'Faa BTP")
- `tagline` - Slogan sous le titre
- `metaTitle` - Titre pour le SEO
- `metaDescription` - Description pour le SEO
- `heroDescription` - Description dans le hero
- `servicesTitle` - Titre de la section services
- `servicesSubtitle` - Sous-titre des services
- `defaultServices` - Array des services par défaut
- `expertiseTitle` - Titre de la section expertise
- `defaultExpertise` - Array des points d'expertise
- `ctaTitle` - Titre du call-to-action
- `ctaDescription` - Description du CTA

### Paramètres optionnels

- `propertiesTitle` - Titre de la section propriétés/projets
- `propertiesSubtitle` - Sous-titre de cette section
- `defaultProperties` - Array des propriétés/projets

## Avantages du système unifié

✅ **Cohérence visuelle** - Même design sur toutes les pages
✅ **Maintenance simplifiée** - Un seul CSS à maintenir
✅ **Couleurs personnalisées** - Chaque secteur garde son identité
✅ **Responsive** - Design adaptatif sur tous les écrans
✅ **Performance** - Code optimisé et réutilisable
✅ **Évolutivité** - Facile d'ajouter de nouveaux secteurs

## Responsive Design

Le système s'adapte automatiquement :

- **Desktop** (>768px) - Design complet en colonnes
- **Tablette** (≤768px) - Colonnes réduites
- **Mobile** (≤480px) - Design en une colonne

## Maintenance

Pour modifier le design global :
- Éditer `UnifiedSectorPage.css`

Pour ajouter un nouveau secteur :
1. Ajouter les variables de couleur dans `UnifiedSectorPage.css`
2. Créer la nouvelle page avec `SectorTemplate`
3. Ajouter la route dans `App.js`

Pour modifier les couleurs d'un secteur :
- Éditer les variables CSS du thème correspondant