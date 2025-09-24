// Constants for Nell'Faa Groupe application

export const COMPANY_INFO = {
  name: "Nell'Faa Groupe Majunga",
  tagline: "Votre partenaire de confiance à Madagascar",
  description: "Conglomérat leader offrant des solutions complètes et professionnelles pour répondre à tous vos besoins d'entreprise et personnels.",
  email: "contact@nellfaa-groupe.mg",
  phone: "+261 XX XX XXX XX",
  address: "Majunga, Madagascar\nBP XXX Majunga 401",
  businessHours: "Lundi - Vendredi: 8h00 - 17h00\nSamedi: 8h00 - 12h00"
};

export const SECTORS = [
  {
    key: 'btp',
    name: 'BTP',
    displayName: "Nell'Faa BTP",
    path: '/btp',
    icon: '🏗️',
    color: '#e74c3c',
    description: 'Construction et travaux publics'
  },
  {
    key: 'transport',
    name: 'Transport',
    displayName: "Nell'Faa Transport",
    path: '/transport',
    icon: '🚛',
    color: '#3498db',
    description: 'Transport de marchandises et passagers'
  },
  {
    key: 'immobilier',
    name: 'Immobilier',
    displayName: "Nell'Faa Immobilier",
    path: '/immobilier',
    icon: '🏢',
    color: '#2ecc71',
    description: 'Développement immobilier et gestion'
  },
  {
    key: 'communication',
    name: 'Communication',
    displayName: "Nell'Faa Communication",
    path: '/communication',
    icon: '📱',
    color: '#9b59b6',
    description: 'Marketing et communication digitale'
  },
  {
    key: 'services',
    name: 'Services',
    displayName: "Nell'Faa Services",
    path: '/services',
    icon: '⚙️',
    color: '#f39c12',
    description: 'Services aux entreprises'
  },
  {
    key: 'security',
    name: 'Security',
    displayName: "Nell'Faa Security",
    path: '/security',
    icon: '🛡️',
    color: '#34495e',
    description: 'Sécurité et surveillance'
  },
  {
    key: 'import_export',
    name: 'Import/Export',
    displayName: "Nell'Faa Import/Export",
    path: '/import-export',
    icon: '🌍',
    color: '#16a085',
    description: 'Commerce international'
  }
];

export const NAVIGATION_ITEMS = [
  { label: 'Accueil', path: '/' },
  { label: 'Nos Secteurs', path: '/secteurs', dropdown: true },
  { label: 'Actualités', path: '/actualites' },
  { label: 'À Propos', path: '/a-propos' },
  { label: 'Contact', path: '/contact' }
];

export const SOCIAL_LINKS = {
  facebook: '#',
  linkedin: '#',
  twitter: '#',
  instagram: '#'
};

export const SEO_DEFAULTS = {
  title: "Nell'Faa Groupe Majunga - Conglomérat Leader à Madagascar",
  description: "Nell'Faa Groupe Majunga, conglomérat leader à Madagascar dans les secteurs BTP, Transport, Immobilier, Communication, Services, Security et Import/Export",
  keywords: "Nell'Faa, Majunga, Madagascar, BTP, Transport, Immobilier, Communication, Services, Security, Import Export, conglomérat",
  author: "Nell'Faa Groupe Majunga",
  image: "/og-image.jpg"
};

export const ANIMATION_DELAYS = {
  stagger: 0.1, // seconds between each item animation
  fadeIn: 0.3,
  slideIn: 0.5
};

export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px'
};

export const API_ENDPOINTS = {
  companyInfo: '/api/company-info/',
  sectors: '/api/sectors/',
  testimonials: '/api/testimonials/',
  news: '/api/news/',
  contact: '/api/contacts/submit/',
  newsletter: '/api/contacts/newsletter/'
};
