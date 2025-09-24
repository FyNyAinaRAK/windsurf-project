import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Services = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tous');

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/services/`);
        setSector(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchSectorData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  if (!sector) {
    return <div className="no-data">Aucune donnée disponible pour ce secteur.</div>;
  }

  // Fonction pour filtrer les services par catégorie
  const filteredServices = sector.services ? 
    activeTab === 'tous' ? 
      sector.services : 
      sector.services.filter(service => service.category === activeTab)
    : [];

  // Fonction pour afficher une carte de service
  const renderServiceCard = (service, index) => (
    <div key={`service-${service.id || index}`} className="service-card">
      <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
      <div className="service-content">
        <h4>{service.name}</h4>
        {service.description && <p>{service.description}</p>}
        {service.details && (
          <ul className="service-details">
            {service.details.map((detail, i) => (
              <li key={i}>
                <i className="fas fa-check-circle"></i> {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  // Données pour la section processus
  const processus = [
    {
      step: "1",
      title: "Analyse des Besoins",
      description: "Évaluation approfondie de vos besoins et objectifs spécifiques."
    },
    {
      step: "2",
      title: "Proposition sur Mesure",
      description: "Élaboration d'une solution personnalisée adaptée à votre situation."
    },
    {
      step: "3",
      title: "Mise en Œuvre",
      description: "Déploiement efficace des services avec un suivi rigoureux."
    },
    {
      step: "4",
      title: "Suivi & Amélioration",
      description: "Évaluation continue et ajustements pour des résultats optimaux."
    }
  ];

  // Données pour la section solutions
  const solutions = [
    {
      focus: "2022",
      type: "Solution de gestion",
      description: "Gestion administrative et financière pour les entreprises."
    },
    {
      focus: "2022",
      type: "Solution de conseil",
      description: "Conseil en stratégie et développement pour les entreprises."
    },
    {
      focus: "2022",
      type: "Solution de formation",
      description: "Formation et développement des compétences pour les entreprises."
    }
  ];

  return (
    <div className="sector-page page-transition services-theme">
      <Helmet>
        <title>{sector.meta_title || "Nell'Faa Services - Services aux Entreprises et Particuliers à Majunga"}</title>
        <meta 
          name="description" 
          content={sector.meta_description || "Nell'Faa Services, votre partenaire services à Majunga. Conseil, administration, comptabilité, RH, froid et climatisation."} 
        />
      </Helmet>

      {/* Section Hero */}
      <section className="sector-hero services-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector?.icon || '💼'}</div>
            <h1>{sector.display_name || "Nell'Faa Services"}</h1>
            <p>{sector.tagline || "Solutions Intégrées pour Votre Entreprise"}</p>
            <div className="hero-description">
              <p>
                {sector.description || sector.short_description || 
                  "Découvrez notre gamme complète de services professionnels conçus pour optimiser votre entreprise. " +
                  "De la gestion administrative aux solutions techniques, nous vous accompagnons à chaque étape."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Services */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nos Compétences</span>
            <h2 className="section-title">Services Complets pour Votre Entreprise</h2>
            <p className="section-description">
              Découvrez notre gamme complète de services professionnels conçus pour répondre à tous vos besoins
            </p>
          </div>

          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'tous' ? 'active' : ''}`}
                onClick={() => setActiveTab('tous')}
              >
                Tous les services
              </button>
              <button 
                className={`tab-btn ${activeTab === 'administratif' ? 'active' : ''}`}
                onClick={() => setActiveTab('administratif')}
              >
                Services Administratifs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'technique' ? 'active' : ''}`}
                onClick={() => setActiveTab('technique')}
              >
                Services Techniques
              </button>
            </div>

            <div className="services-grid">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => renderServiceCard(service, index))
              ) : (
                <div className="no-results">
                  <p>Aucun service trouvé dans cette catégorie.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Solutions */}
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">Nos Solutions</h2>
          <p className="section-subtitle">
            Approche personnalisée selon vos besoins spécifiques
          </p>
          
          <div className="projects-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="project-card">
                <div className="project-year">{solution.focus}</div>
                <h3>{solution.type}</h3>
                <p>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Expertise */}
      <section className="section expertise-section">
        <div className="container">
          <div className="expertise-content">
            <div className="expertise-text">
              <h2>Pourquoi Nous Choisir</h2>
              <div className="expertise-item">
                <h3>🎯 Expertise Reconnue</h3>
                <p>Équipe de professionnels expérimentés dans tous les domaines.</p>
              </div>
              <div className="expertise-item">
                <h3>⏱️ Réactivité</h3>
                <p>Réponse rapide et traitement efficace de vos demandes.</p>
              </div>
              <div className="expertise-item">
                <h3>🤝 Relation de Confiance</h3>
                <p>Partenariat durable basé sur la transparence et la qualité.</p>
              </div>
            </div>
            <div className="expertise-image">
              <div className="placeholder-image">
                <span>Image services professionnels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Simplifiez Votre Gestion</h2>
            <p>
              Concentrez-vous sur votre cœur de métier, nous nous occupons du reste. 
              Découvrez nos solutions sur mesure.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <a href="tel:+261XXXXXXXX" className="btn btn-secondary">
                Nous consulter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
