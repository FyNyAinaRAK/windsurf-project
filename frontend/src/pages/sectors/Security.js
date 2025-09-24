import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Security = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/security/`);
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

  // Données par défaut si aucune donnée n'est disponible
  const defaultServices = [
    'Surveillance et gardiennage 24h/24',
    'Systèmes de sécurité électronique',
    'Protection rapprochée et événementiel',
    'Audit et conseil en sécurité',
    'Formation en sécurité et sûreté',
    'Télésurveillance et alarmes'
  ];

  const defaultSolutions = [
    {
      type: 'Résidentiel',
      description: 'Protection de vos domiciles et résidences avec surveillance adaptée',
      focus: 'Tranquillité'
    },
    {
      type: 'Commercial',
      description: 'Sécurisation de vos locaux commerciaux et industriels',
      focus: 'Protection'
    },
    {
      type: 'Événementiel',
      description: 'Sécurité pour vos événements privés et professionnels',
      focus: 'Sérénité'
    }
  ];

  const services = sector?.services?.length > 0 ? sector.services : defaultServices;
  const solutions = sector?.solutions?.length > 0 ? sector.solutions : defaultSolutions;

  return (
    <div className="sector-page page-transition security-theme">
      <Helmet>
        <title>{sector?.meta_title || "Nell'Faa Security - Sécurité et Surveillance Professionnelle à Majunga"}</title>
        <meta 
          name="description" 
          content={sector?.meta_description || "Nell'Faa Security, votre expert sécurité à Majunga. Surveillance, gardiennage, systèmes électroniques et protection sur mesure."} 
        />
      </Helmet>

      <section className="sector-hero security-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector?.icon || '🛡️'}</div>
            <h1>{sector?.display_name || "Nell'Faa Security"}</h1>
            <p>Sécurité & Surveillance Professionnelle</p>
            <div className="hero-description">
              <p>
                {sector?.description || sector?.short_description || 
                  "Nell'Faa Security assure la protection de vos biens et personnes " +
                  "avec des solutions de sécurité modernes et une équipe de professionnels " +
                  "formés aux dernières techniques de surveillance."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services Sécurité</h2>
          <p className="section-subtitle">
            Protection complète adaptée à vos besoins spécifiques
          </p>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.id || index} className="service-card">
                {service.icon && <div className="service-icon">{service.icon}</div>}
                <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{service.name || service}</h3>
                {service.description && <p>{service.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">Nos Solutions</h2>
          <p className="section-subtitle">
            Sécurité sur mesure pour tous types d'environnements
          </p>
          
          <div className="projects-grid">
            {solutions.map((solution, index) => (
              <div key={solution.id || index} className="project-card">
                <div className="project-year">{solution.focus}</div>
                <h3>{solution.type || solution.title}</h3>
                <p>{solution.description}</p>
                {solution.details && (
                  <div className="project-details">
                    {solution.details.map((detail, i) => (
                      <span key={i} className="detail-tag">{detail}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section expertise-section">
        <div className="container">
          <div className="expertise-content">
            <div className="expertise-text">
              <h2>Notre Expertise</h2>
              <div className="expertise-item">
                <h3>�️ Surveillance 24/7</h3>
                <p>Des équipes dédiées assurent une surveillance continue de vos biens.</p>
              </div>
              <div className="expertise-item">
                <h3>�️ Protection sur mesure</h3>
                <p>Des solutions adaptées à chaque type de risque et d'environnement.</p>
              </div>
              <div className="expertise-item">
                <h3>🚨 Intervention rapide</h3>
                <p>Des équipes d'intervention disponibles 24h/24 pour une réactivité optimale.</p>
              </div>
            </div>
            <div className="expertise-image">
              <img 
                src={sector?.expertise_image || "/images/security-expertise.jpg"} 
                alt="Expertise en sécurité" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/security-expertise.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Besoin d'une solution de sécurité personnalisée ?</h2>
          <p>Nos experts sont à votre écoute pour évaluer vos besoins et vous proposer la solution la plus adaptée.</p>
          <Link to="/contact" className="btn btn-primary">Demander un devis</Link>
        </div>
      </section>
    </div>
  );
};

export default Security;
