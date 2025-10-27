import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight, FaBuilding, FaChartLine, FaGlobeAfrica, FaUsers, FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const timelineRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });

    // Animation d'intersection pour la timeline
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, options);
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.current.observe(item));

    // Animation des chiffres
    const animateNumbers = () => {
      const numbers = document.querySelectorAll('.number');
      
      numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
          current += step;
          if (current < target) {
            number.textContent = Math.ceil(current);
            requestAnimationFrame(updateNumber);
          } else {
            number.textContent = target;
          }
        };
        
        updateNumber();
      });
    };

    // Observer pour la section des chiffres
    const numbersSection = document.querySelector('.numbers');
    if (numbersSection) {
      const numbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumbers();
            numbersObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      numbersObserver.observe(numbersSection);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Récupérer les secteurs depuis l'API
  const [sectors, setSectors] = useState([]);
  
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/api/sectors/`;
        console.log('Tentative de récupération des secteurs depuis:', apiUrl);
        
        const response = await axios.get(apiUrl);
        console.log('Réponse des secteurs:', response.data);
        
        // Gérer différents formats de réponse
        const sectorsData = response.data.results || response.data || [];
        console.log('Secteurs récupérés:', sectorsData);
        
        // Si aucun secteur n'est trouvé, utiliser une valeur par défaut
        if (!sectorsData || sectorsData.length === 0) {
          console.warn('Aucun secteur trouvé dans la réponse de l\'API');
          // Valeurs par défaut pour les tests
          setSectors([
            { id: 1, name: 'BTP' },
            { id: 2, name: 'Transport' },
            { id: 3, name: 'Immobilier' },
            { id: 4, name: 'Communication' },
            { id: 5, name: 'Services' },
            { id: 6, name: 'Sécurité' },
            { id: 7, name: 'Import/Export' }
          ]);
        } else {
          setSectors(sectorsData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des secteurs:', error);
        // En cas d'erreur, utiliser des valeurs par défaut
        setSectors([
          { id: 1, name: 'BTP' },
          { id: 2, name: 'Transport' },
          { id: 3, name: 'Immobilier' },
          { id: 4, name: 'Communication' },
          { id: 5, name: 'Services' },
          { id: 6, name: 'Sécurité' },
          { id: 7, name: 'Import/Export' }
        ]);
      }
    };

    fetchSectors();
  }, []);

  // Calcul des années d'expérience depuis le 1er janvier 2010
  const calculateExperience = () => {
    const startDate = new Date(2010, 0, 1); // 1er janvier 2010
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    
    // Vérifier si l'anniversaire est déjà passé cette année
    if (currentDate.getMonth() < startDate.getMonth() || 
        (currentDate.getMonth() === startDate.getMonth() && 
         currentDate.getDate() < startDate.getDate())) {
      return years - 1;
    }
    return years;
  };

  // Compter le nombre de secteurs uniques
  const uniqueSectors = [...new Set(sectors.map(sector => sector.name))];
  
  const stats = [
    { 
      number: calculateExperience(), // Sans le +
      label: 'Années d\'expérience', 
      icon: <FaChartLine className="stat-icon" />,
      description: 'Depuis 2010' 
    },
    { 
      number: uniqueSectors.length, // Nombre de secteurs uniques
      label: 'Secteurs d\'activité', 
      icon: <FaBuilding className="stat-icon" />,
      description: 'Solutions complètes' 
    },
    { 
      number: 7, // Sans le +
      label: 'Employés dévoués', 
      icon: <FaUsers className="stat-icon" />,
      description: 'Chefs de secteurs experts' 
    },
    { 
      number: 50, // Sans le +
      label: 'Clients satisfaits', 
      icon: <FaHandshake className="stat-icon" />,
      description: 'À travers Madagascar' 
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites pour offrir des solutions novatrices et adaptées aux défis de demain.',
      icon: <FaLightbulb className="value-icon" />
    },
    {
      title: 'Intégrité',
      description: 'Nous agissons avec honnêteté, transparence et éthique dans toutes nos relations d\'affaires.',
      icon: <FaShieldAlt className="value-icon" />
    },
    {
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des services de la plus haute qualité, en dépassant les attentes de nos clients.',
      icon: <FaChartLine className="value-icon" />
    },
    {
      title: 'Engagement',
      description: 'Nous nous engageons envers le développement durable et la responsabilité sociale de l\'entreprise.',
      icon: <FaGlobeAfrica className="value-icon" />
    }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Fondation informelle',
      description: 'Début du projet NELL\'FAA GROUPE, encore sans statut officiel mais avec la vision de bâtir une organisation solide et durable',
      icon: '🏗️'
    },
    {
      year: '2013',
      title: 'Formalisation et premiers secteurs',
      description: 'Le Groupe devient officiel et démarre ses activités dans le BTP, l\'Immobilier, la Communication et l\'Import\\Export',
      icon: '🏢'
    },
    {
      year: '2016',
      title: 'Expansion rapide',
      description: 'Phase de croissance marqué par l\'élargissement des activités, avec l\'intégration des secteurs Transport et Services.',
      icon: '🚚'
    },
    {
      year: '2022',
      title: 'Création du secteur Sécurité',
      description: 'Ajout d\'un pôle Sécurité pour répondre aux besoins de protection des biens et des personnes, renforçant la diversification du Groupe',
      icon: '🔒'
    },
    {
      year: 'A nos jours',
      title: 'Une dynamique toujours vivante',
      description: 'NELL\'FAA GROUPE poursuit son chemin avec energie, reste debout et continue d\'évoluer en s\'adaptant aux nouveaux défis.',
      icon: '🌍'
    }
  ];

  const leadership = [
    {
      name: 'Direction Générale',
      role: 'Leadership stratégique',
      description: 'Notre équipe de direction apporte une vision globale et une expertise pointue pour guider le groupe vers l\'excellence et l\'innovation continue.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Direction Opérationnelle',
      role: 'Gestion des secteurs',
      description: 'Nos directeurs opérationnels assurent une coordination optimale entre nos 7 secteurs d\'activité pour une exécution sans faille de nos projets.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Direction Commerciale',
      role: 'Développement business',
      description: 'Notre équipe commerciale construit et entretient des relations solides avec nos clients et partenaires, garantissant une croissance durable.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="about-page">
      <Helmet>
        <title>À Propos - Nell'Faa Groupe Majunga</title>
        <meta name="description" content="Découvrez l'histoire, la vision et les valeurs de Nell'Faa Groupe Majunga, conglomérat leader à Madagascar depuis plus de 10 ans." />
      </Helmet>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 data-aos="fade-up">À Propos de Nell'Faa Groupe</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Plus de 10 ans d'excellence et d'innovation à Madagascar, façonnant l'avenir à travers nos 7 secteurs d'activité stratégiques.
          </p>
          <button 
            className="cta-button" 
            data-aos="fade-up" 
            data-aos-delay="200"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('.nav-link[aria-expanded]')?.click();
            }}
          >
            Découvrir nos secteurs <FaArrowRight style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="story section">
        <div className="container">
          <div className="story-content" data-aos="fade-up">
            <div className="story-text">
              <h2>Notre Histoire</h2>
              <p>
                Fondé en 2010, Nell'Faa Groupe Majunga est né d'une vision ambitieuse : créer un conglomérat 
                capable de répondre à tous les besoins du marché malgache avec excellence et innovation. Notre parcours 
                est marqué par une croissance constante et une diversification stratégique de nos activités.
              </p>
              <p>
                De nos débuts dans le BTP à notre expansion dans six autres secteurs clés, nous avons constamment 
                évolué pour devenir un acteur incontournable de l'économie malgache, offrant des solutions 
                complètes et intégrées à nos clients.
              </p>
              <p>
                Notre succès repose sur des valeurs fortes : l'excellence dans l'exécution, 
                l'innovation constante, et l'intégrité dans toutes nos relations d'affaires. 
                Ces principes guident chacune de nos actions et décisions stratégiques.
              </p>
            </div>
            <div className="story-image" data-aos="fade-left" data-aos-delay="200">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                alt="Équipe Nell'Faa Groupe" 
                className="card-hover-effect"
                style={{ borderRadius: '16px', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="numbers section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Notre Impact en Chiffres</h2>
            <p className="section-description">Une croissance mesurable, un impact réel sur l'économie malgache</p>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                className="stat-item" 
                key={index} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                data-aos-duration="600"
                data-aos-easing="ease-out-cubic"
              >
                <div 
                  className="stat-icon-container"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100 + 200}
                  data-aos-duration="800"
                >
                  {stat.icon}
                </div>
                <h3 
                  className="stat-number"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 100}
                  data-aos-duration="600"
                >
                  {stat.number}
                  {[2, 3].includes(index) && '+'} {/* Ajoute le + seulement pour les employés (index 2) et clients (index 3) */}
                </h3>
                <p 
                  className="stat-label"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 150}
                  data-aos-duration="600"
                >
                  {stat.label}
                </p>
                <p 
                  className="stat-description"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 200}
                  data-aos-duration="600"
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="values section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Nos Valeurs Fondatrices</h2>
            <p>Les principes qui guident chacune de nos actions et décisions</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Parcours */}
      <section className="timeline-section section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Notre Parcours</h2>
            <p>Les étapes clés qui ont marqué notre croissance et notre développement</p>
          </div>
          
          <div className="timeline-container" ref={timelineRef}>
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="timeline-year">
                  <span>{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-icon">
                    {milestone.icon}
                  </div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe de Direction */}
      <section className="leadership section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Notre Équipe de Direction</h2>
            <p>Des leaders expérimentés guidant le groupe vers l'excellence</p>
          </div>
          
          <div className="leadership-grid">
            {leadership.map((member, index) => (
              <div className="leader-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="leader-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="leader-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container" data-aos="fade-up">
          <div className="cta-content">
            <h2>Prêt à collaborer avec nous ?</h2>
            <p>Découvrez comment Nell'Faa Groupe peut répondre à vos besoins à travers nos différents secteurs d'activité.</p>
            <Link to="/contact" className="cta-button">
              Nous contacter <FaArrowRight style={{ marginLeft: '10px' }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
