import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import FeaturedNews from '../components/FeaturedNews';
import './Home.css';
import '../components/Sectors.css';
import { FaArrowRight, FaBuilding, FaTruck, FaHome, FaBullhorn, FaShieldAlt, FaGlobeAfrica, FaChartLine, FaUsers, FaHandshake, FaLightbulb, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const getSectorImage = (sector) => {
  if (!sector) {
    console.error('Aucun secteur fourni à getSectorImage');
    return process.env.PUBLIC_URL + '/images/placeholder.jpg';
  }
  
  console.log('=== getSectorImage appelé avec secteur ===', sector);
  
  // Images par défaut pour chaque secteur
  const defaultImages = {
    'btp': process.env.PUBLIC_URL + '/images/btp.jpg',
    'transport': process.env.PUBLIC_URL + '/images/transport.jpg',
    'immobilier': process.env.PUBLIC_URL + '/images/immobilier.jpg',
    'communication': process.env.PUBLIC_URL + '/images/communication.jpg',
    'services': process.env.PUBLIC_URL + '/images/services.jpg',
    'security': process.env.PUBLIC_URL + '/images/security.jpg',
    'import-export': process.env.PUBLIC_URL + '/images/import-export.jpg',
  };

  // Vérifier si le secteur a une image personnalisée
  if (sector.image) {
    console.log('Utilisation de l\'image personnalisée du secteur:', sector.image);
    return sector.image;
  }

  // Fonction utilitaire pour normaliser un texte en slug
  const toSlug = (text) => {
    if (!text) return '';
    return String(text)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/[\s_]+/g, '_')   // Remplacer espaces et tirets par des underscores
      .trim();
  };

  // Essayer différentes clés pour trouver un identifiant utilisable
  const possibleKeys = ['slug', 'name', 'title', 'id'];
  let foundSlug = '';
  
  for (const key of possibleKeys) {
    if (sector[key]) {
      const slug = toSlug(sector[key]);
      console.log(`Essai avec clé "${key}" (valeur: "${sector[key]}" -> slug: "${slug}")`);
      
      if (defaultImages[slug]) {
        console.log(`Correspondance trouvée pour le slug: ${slug}`);
        return defaultImages[slug];
      }
      
      // Stocker le premier slug valide trouvé pour un message d'erreur plus clair
      if (!foundSlug && slug) {
        foundSlug = slug;
      }
    }
  }

  // Si on arrive ici, aucune correspondance directe n'a été trouvée
  console.warn('Aucune correspondance exacte trouvée pour le secteur:', {
    secteur: sector,
    slugsEssayes: possibleKeys.map(key => ({
      key,
      value: sector[key],
      slug: sector[key] ? toSlug(sector[key]) : undefined
    })),
    clesDisponibles: Object.keys(sector)
  });

  // Essayer de trouver une correspondance partielle
  if (foundSlug) {
    const matchingKey = Object.keys(defaultImages).find(imgKey => 
      imgKey.includes(foundSlug) || foundSlug.includes(imgKey)
    );
    
    if (matchingKey) {
      console.log(`Correspondance partielle trouvée: ${foundSlug} -> ${matchingKey}`);
      return defaultImages[matchingKey];
    }
  }

  // En dernier recours, utiliser l'image par défaut
  console.warn('Utilisation de l\'image par défaut pour le secteur:', sector);
  return process.env.PUBLIC_URL + '/images/placeholder.jpg';
};

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mission');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const slidesToShow = 4; // Nombre de cartes à afficher à la fois

  // Filtrer les secteurs en fonction du terme de recherche
  const filteredSectors = sectors.filter(sector => 
    sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sector.description && sector.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Fonction pour passer au slide suivant
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= Math.ceil(filteredSectors.length / slidesToShow) - 1 ? 0 : prev + 1
    );
  };

  // Fonction pour revenir au slide précédent
  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.ceil(filteredSectors.length / slidesToShow) - 1 : prev - 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsRes, testimonialsRes, companyRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sectors/`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/testimonials/`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/company-info/`)
        ]);
        
        setSectors(sectorsRes.data);
        setTestimonials(testimonialsRes.data);
        setCompanyInfo(companyRes.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Sectors data:', JSON.stringify(sectors, null, 2));
  }, [sectors]);

  // Données des avantages
  const benefits = [
    {
      icon: <FaChartLine className="benefit-icon" />,
      title: "Croissance Continue",
      description: "Une croissance régulière et durable depuis notre création"
    },
    {
      icon: <FaUsers className="benefit-icon" />,
      title: "Équipe Expérimentée",
      description: "Des professionnels qualifiés dans chaque secteur d'activité"
    },
    {
      icon: <FaHandshake className="benefit-icon" />,
      title: "Partenariats Solides",
      description: "Un réseau de partenaires fiables et engagés"
    },
    {
      icon: <FaLightbulb className="benefit-icon" />,
      title: "Innovation Continue",
      description: "Une veille technologique constante pour des solutions d'avenir"
    }
  ];

  // Données des statistiques
  const stats = [
    { number: '10+', label: 'Années d\'expérience', icon: <FaChartLine className="stat-icon" /> },
    { number: '7', label: 'Secteurs d\'activité', icon: <FaBuilding className="stat-icon" /> },
    { number: '200+', label: 'Employés dévoués', icon: <FaUsers className="stat-icon" /> },
    { number: '1000+', label: 'Clients satisfaits', icon: <FaHandshake className="stat-icon" /> }
  ];

  if (loading) {
    return (
      <div className="home page-transition">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Helmet>
        <title>Accueil - {companyInfo?.name || "NELL'FAA GROUPE"}</title>
        <meta name="description" content={companyInfo?.description || "Découvrez les services de NELL'FAA GROUPE, leader dans les secteurs du BTP, Transport, Immobilier, Communication, Services, Sécurité et Import/Export à Madagascar."} />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right">
              <span className="section-subtitle">À propos de nous</span>
              <h2 className="section-title">Votre partenaire de confiance depuis 2010</h2>
              <p>
                Fondé en 2010, NELL'FAA GROUPE s'est imposé comme un acteur majeur 
                de l'économie malgache à travers ses sept pôles d'activité complémentaires. 
                Notre engagement envers l'excellence et l'innovation nous permet de proposer 
                des solutions intégrées répondant aux besoins les plus exigeants.
              </p>
              <div className="features-grid">
                {[
                  "Expertise multisectorielle",
                  "Approche client personnalisée",
                  "Innovation continue",
                  "Engagement qualité"
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/a-propos" className="btn btn-primary">
                En savoir plus sur nous <FaArrowRight style={{ marginLeft: '10px' }} />
              </Link>
            </div>
            <div className="about-image" data-aos="fade-left">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Équipe Nell'Faa Groupe" 
                className="about-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="stat-icon-container">
                  {stat.icon}
                </div>
                <h3 className="number" data-count={stat.number.replace('+', '')}>0</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-subtitle">Nos Services</span>
            <h2 className="section-title">Découvrez nos domaines d'expertise</h2>
            <p className="section-description">
              Une gamme complète de services pour répondre à tous vos besoins professionnels
            </p>
          </div>
          
          {filteredSectors.length === 0 ? (
            <div className="no-results" data-aos="fade-up">
              <p>Aucun secteur ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="services-carousel-container">
              <button 
                className="carousel-arrow left-arrow" 
                onClick={prevSlide}
                aria-label="Précédent"
                disabled={filteredSectors.length <= slidesToShow}
              >
                <FaChevronLeft />
              </button>
              
              <div className="services-carousel">
                <div 
                  className="services-track"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  {filteredSectors.map((sector, index) => (
                    <div 
                      className="service-card" 
                      key={sector.id} 
                      data-aos="fade-up" 
                      data-aos-delay={index * 100}
                    >
                      <div className="service-icon">
                        {sector.icon || <FaBuilding />}
                      </div>
                      <h3>{sector.name}</h3>
                      <div className="service-link-container">
                        <Link 
                          to={`/${sector.name === 'import_export' ? 'import-export' : sector.name}`}
                          className="service-link"
                          aria-label={`En savoir plus sur ${sector.display_name}`}
                        >
                          En savoir plus <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="carousel-arrow right-arrow" 
                onClick={nextSlide}
                aria-label="Suivant"
                disabled={filteredSectors.length <= slidesToShow}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-subtitle">Pourquoi nous choisir</span>
            <h2 className="section-title">Notre engagement envers l'excellence</h2>
          </div>
          
          <div className="tabs">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                Notre Mission
              </button>
              <button 
                className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                Notre Vision
              </button>
              <button 
                className={`tab-btn ${activeTab === 'values' ? 'active' : ''}`}
                onClick={() => setActiveTab('values')}
              >
                Nos Valeurs
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'mission' && (
                <div className="tab-pane" data-aos="fade-up">
                  <h3>Notre mission</h3>
                  <p>
                    Chez NELL'FAA GROUPE, nous nous engageons à fournir des solutions innovantes et sur mesure 
                    qui dépassent les attentes de nos clients. Notre mission est de contribuer au développement 
                    économique de Madagascar à travers nos différents secteurs d'activité, tout en maintenant 
                    les plus hauts standards de qualité et d'éthique professionnelle.
                  </p>
                  <ul className="mission-list">
                    <li>Fournir des services de qualité supérieure</li>
                    <li>Promouvoir l'innovation dans tous nos secteurs</li>
                    <li>Créer de la valeur pour nos clients et partenaires</li>
                    <li>Contribuer au développement durable</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'vision' && (
                <div className="tab-pane" data-aos="fade-up">
                  <h3>Notre vision</h3>
                  <p>
                    Notre vision est de devenir le leader incontesté des services intégrés à Madagascar, 
                    reconnu pour notre excellence opérationnelle, notre innovation constante et notre 
                    engagement envers le développement durable. Nous aspirons à être le partenaire 
                    privilégié de nos clients en leur offrant des solutions complètes et personnalisées.
                  </p>
                </div>
              )}
              
              {activeTab === 'values' && (
                <div className="tab-pane" data-aos="fade-up">
                  <h3>Nos valeurs fondamentales</h3>
                  <div className="values-grid">
                    {[
                      { title: 'Intégrité', description: 'Nous agissons avec honnêteté et transparence dans toutes nos relations.' },
                      { title: 'Innovation', description: 'Nous repoussons constamment les limites pour offrir des solutions novatrices.' },
                      { title: 'Excellence', description: 'Nous visons l\'excellence dans tout ce que nous entreprenons.' },
                      { title: 'Engagement', description: 'Nous tenons nos promesses et nous engageons pleinement envers nos clients.' }
                    ].map((value, index) => (
                      <div className="value-item" key={index}>
                        <h4>{value.title}</h4>
                        <p>{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-subtitle">Témoignages</span>
            <h2 className="section-title">Ce que disent nos clients</h2>
            <p className="section-description">
              Découvrez les retours de nos clients satisfaits à travers Madagascar
            </p>
          </div>
          
          <div className="testimonials-slider" data-aos="fade-up">
            {testimonials && testimonials.length > 0 ? (
              <div className="testimonials-grid">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <div className="testimonial-card" key={index}>
                    <div className="testimonial-content">
                      <p className="testimonial-text">"{testimonial.content || 'Aucun contenu disponible'}"</p>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          {testimonial.author_name ? testimonial.author_name.charAt(0) : '?'}
                        </div>
                        <div className="author-info">
                          <h4>{testimonial.author_name || 'Anonyme'}</h4>
                          {testimonial.author_position && (
                            <span className="author-role">{testimonial.author_position}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-testimonials">Aucun témoignage disponible pour le moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container" data-aos="fade-up">
          <div className="cta-content">
            <h2>Prêt à démarrer votre projet avec nous ?</h2>
            <p>Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Nous contacter <FaArrowRight style={{ marginLeft: '10px' }} />
              </Link>
              <Link to="#" className="btn btn-outline" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.nav-link[aria-expanded]')?.click();
              }}>
                Découvrir nos secteurs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
      
      {/* Featured News Section */}
      <FeaturedNews />
    </div>
  );
};

export default Home;
