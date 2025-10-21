import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import FeaturedNews from '../components/FeaturedNews';
import './Home.css';
import '../components/Sectors.css';
import { FaArrowRight, FaBuilding, FaChartLine, FaUsers, FaHandshake, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  // Métadonnées pour le SEO
  const seoData = {
    title: "Nell'Faa Groupe | BTP, Transport, Immobilier - Leader à Madagascar",
    description: "Nell'Faa Groupe, leader à Madagascar dans le BTP, Transport, Immobilier, Import-Export, Sécurité et Services. Découvrez nos solutions professionnelles et innovantes.",
    keywords: "Nellfaa, Groupe Nellfaa, BTP Madagascar, Transport Majunga, Immobilier Madagascar, Services Madagascar, Import Export Madagascar, Sécurité Madagascar, Construction Madagascar, Bâtiment Travaux Publics, Logistique Madagascar",
    canonical: "https://nellfaa-groupe.onrender.com"
  };

  const [sectors, setSectors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mission');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const servicesTrackRef = React.useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - servicesTrackRef.current.offsetLeft);
    setScrollLeft(servicesTrackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - servicesTrackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour un défilement plus rapide
    servicesTrackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Fonction pour passer au slide suivant
  const nextSlide = () => {
    if (!servicesTrackRef.current) return;
    
    const track = servicesTrackRef.current;
    const cardWidth = track.firstChild ? track.firstChild.offsetWidth + 32 : 300; // 32px pour la marge
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    if (track.scrollLeft + track.clientWidth >= maxScroll - 10) {
      // Si on est à la fin, revenir au début
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Sinon, faire défiler d'une carte
      track.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour revenir au slide précédent
  const prevSlide = () => {
    if (!servicesTrackRef.current) return;
    
    const track = servicesTrackRef.current;
    const cardWidth = track.firstChild ? track.firstChild.offsetWidth + 32 : 300; // 32px pour la marge
    
    if (track.scrollLeft <= 10) {
      // Si on est au début, aller à la fin
      track.scrollTo({ 
        left: track.scrollWidth, 
        behavior: 'smooth' 
      });
    } else {
      // Sinon, faire défiler d'une carte vers l'arrière
      track.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsRes, testimonialsRes, companyRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sectors/`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/testimonials/`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/company-info/`)
        ]);
        
        console.log('Données brutes des secteurs:', sectorsRes.data);
        
        // Gérer les réponses paginées ou non
        const sectorsData = sectorsRes.data.results || sectorsRes.data;
        const testimonialsData = testimonialsRes.data.results || testimonialsRes.data;
        const companyData = companyRes.data.results || companyRes.data;
        
        // S'assurer que chaque secteur a un slug
        const sectorsWithSlug = sectorsData.map(sector => {
          const slug = sector.slug || sector.name.toLowerCase().replace(/\s+/g, '-');
          console.log(`Secteur: ${sector.name}, Slug: ${slug}`);
          return {
            ...sector,
            slug: slug
          };
        });
        
        console.log('Secteurs avec slugs:', sectorsWithSlug);
        setSectors(sectorsWithSlug);
        setTestimonials(testimonialsData);
        setCompanyInfo(Array.isArray(companyData) ? companyData[0] : companyData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={`${seoData.canonical}/images/og-image.jpg`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonical} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={`${seoData.canonical}/images/og-image.jpg`} />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="about-section section" id="a-propos">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h1>Nell'Faa Groupe - Leader du BTP et des Services à Madagascar</h1>
            <p className="lead">Expertise, Innovation et Excellence depuis 2010</p>
          </div>
          
          <div className="about-content">
            <div className="about-text" data-aos="fade-right" itemScope itemType="https://schema.org/Organization">
              <h2>À propos de <span itemProp="name">Nell'Faa Groupe</span></h2>
              <p>Fondé en 2010, <strong>Nell'Faa Groupe</strong> s'est imposé comme un acteur majeur dans les secteurs clés de l'économie malgache, notamment le <strong>BTP</strong>, le <strong>Transport</strong>, l'<strong>Immobilier</strong>, l'<strong>Import-Export</strong>, la <strong>Sécurité</strong> et les <strong>Services divers</strong>.</p>
              
              <h3>Notre engagement à Madagascar</h3>
              <p>Basé à <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="addressLocality">Antananarivo</span>, <span itemProp="addressCountry">Madagascar</span>
              </span>, notre groupe s'engage à fournir des solutions sur mesure adaptées aux besoins spécifiques du marché malgache et de la région.</p>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <FaBuilding className="stat-icon" />
                  <h4>+50</h4>
                  <p>Projets réalisés</p>
                </div>
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <h4>+100</h4>
                  <p>Collaborateurs</p>
                </div>
                <div className="stat-item">
                  <FaChartLine className="stat-icon" />
                  <h4>+10 ans</h4>
                  <p>D'expérience</p>
                </div>
              </div>
              
              <div className="cta-buttons">
                <Link to="/a-propos" className="btn btn-primary">En savoir plus sur nous</Link>
                <Link to="/contact" className="btn btn-outline">Nous contacter</Link>
              </div>
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
      <section className="services-section section bg-light" id="nos-services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-subtitle">Nos Secteurs d'Activité</span>
            <h2 className="section-title">Découvrez nos expertises à Madagascar</h2>
            <p className="section-description">
              Nell'Faa Groupe vous propose une gamme complète de services professionnels adaptés au marché malgache. 
              De la construction à la logistique, en passant par l'immobilier et la sécurité, nous couvrons tous les aspects 
              de vos projets avec professionnalisme et expertise locale.
            </p>
          </div>
          
          {/* Schema.org Markup for Services */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Service",
                  "name": "BTP et Construction",
                  "description": "Construction de bâtiments, travaux publics et aménagement urbain à Madagascar.",
                  "url": "https://nellfaa-groupe.onrender.com/services/btp"
                },
                {
                  "@type": "Service",
                  "name": "Transport et Logistique",
                  "description": "Solutions de transport routier et logistique adaptées aux besoins de Madagascar.",
                  "url": "https://nellfaa-groupe.onrender.com/services/transport"
                },
                {
                  "@type": "Service",
                  "name": "Immobilier",
                  "description": "Gestion immobilière, promotion et transaction à Madagascar.",
                  "url": "https://nellfaa-groupe.onrender.com/services/immobilier"
                },
                {
                  "@type": "Service",
                  "name": "Import-Export",
                  "name": "Sécurité et Surveillance",
                  "description": "Services de sécurité et de surveillance pour les entreprises et particuliers à Madagascar.",
                  "url": "https://nellfaa-groupe.onrender.com/services/securite"
                },
                {
                  "@type": "Service",
                  "name": "Tourisme et Hôtellerie",
                  "description": "Services touristiques et hôteliers pour découvrir Madagascar.",
                  "url": "https://nellfaa-groupe.onrender.com/services/tourisme"
                },
                {
                  "@type": "Service",
                  "name": "Services Divers",
                  "description": "Une gamme complète de services complémentaires pour répondre à tous vos besoins.",
                  "url": "https://nellfaa-groupe.onrender.com/services/services-divers"
                }
              ]
            })}
          </script>

          <div className="services-carousel-container">
            <button 
              className="carousel-arrow left-arrow" 
              onClick={prevSlide}
              aria-label="Précédent"
              disabled={sectors.length <= 1}
            >
              <FaChevronLeft />
            </button>
            
            <div className="services-carousel">
              <div 
                className="services-track"
                ref={servicesTrackRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
              >
                {sectors.map((sector, index) => (
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
                    <p>{sector.short_description || ''}</p>
                    <Link 
                      to={`/${sector.name === 'import_export' ? 'import-export' : (sector.slug || sector.name.toLowerCase().replace(/\s+/g, '-'))}`} 
                      className="btn btn-link"
                    >
                      En savoir plus <FaArrowRight />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="carousel-arrow right-arrow" 
              onClick={nextSlide}
              aria-label="Suivant"
              disabled={sectors.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
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
                <div className="tab-pane active">
                  <h3>Notre Mission</h3>
                  <p>Fournir des solutions innovantes et durables dans tous nos secteurs d'activité, en dépassant les attentes de nos clients et en contribuant au développement de Madagascar.</p>
                </div>
              )}
              
              {activeTab === 'vision' && (
                <div className="tab-pane active">
                  <h3>Notre Vision</h3>
                  <p>Devenir le leader incontesté dans nos domaines d'expertise à Madagascar et dans la région, en nous appuyant sur l'innovation, la qualité et l'engagement envers nos clients.</p>
                </div>
              )}
              
              {activeTab === 'values' && (
                <div className="tab-pane">
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
          <div className="testimonials-grid">
            {testimonials && testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((testimonial, index) => (
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
              ))
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
}

export default Home;
