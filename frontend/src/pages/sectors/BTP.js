import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UnifiedSectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const BTP = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/btp/`);
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

  return (
    <div className="sector-page page-transition btp-theme">
      <Helmet>
        <title>{sector.meta_title || "Nell'Faa BTP - Construction et Travaux Publics à Majunga"}</title>
        <meta 
          name="description" 
          content={sector.meta_description || "Nell'Faa BTP, votre expert en construction, rénovation et travaux publics à Majunga. Bâtiments résidentiels, commerciaux et infrastructure."} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="sector-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector.icon || '🏗️'}</div>
            <h1>{sector.display_name || "Nell'Faa BTP"}</h1>
            <p>Construction, Rénovation & Travaux Publics</p>
            <div className="hero-description">
              <p>{sector.description || sector.short_description || "Fort de plus de 10 ans d'expérience, Nell'Faa BTP est votre partenaire de confiance pour tous vos projets de construction à Majunga et dans toute la région."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services BTP</h2>
          <p className="section-subtitle">
            De la conception à la réalisation, nous vous accompagnons dans tous vos projets
          </p>
          
          <div className="services-grid">
            {sector.services && sector.services.length > 0 ? (
              sector.services.map((service, index) => (
                <div key={service.id || index} className="service-card">
                  {service.icon && <div className="service-icon">{service.icon}</div>}
                  <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{service.name}</h3>
                  {service.description && <p>{service.description}</p>}
                </div>
              ))
            ) : (
              // Fallback si aucun service n'est disponible
              [
                'Construction de bâtiments résidentiels et commerciaux',
                'Travaux de rénovation et réhabilitation',
                'Travaux publics et infrastructure',
                'Génie civil et ouvrages d\'art',
                'Maçonnerie et gros œuvre',
                'Études techniques et architecturales'
              ].map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="service-content">
                    <p>{service}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">Projets Réalisés</h2>
          <p className="section-subtitle">
            Quelques-unes de nos réalisations qui témoignent de notre expertise
          </p>
          
          <div className="projects-grid">
            {sector.projects && sector.projects.length > 0 ? (
              sector.projects.map((project, index) => (
                <div key={project.id || index} className="project-card">
                  {project.completion_date && (
                    <div className="project-year">
                      {new Date(project.completion_date).getFullYear()}
                    </div>
                  )}
                  <h3>{project.title}</h3>
                  {project.description && <p>{project.description}</p>}
                  {project.location && (
                    <div className="project-location">
                      <i className="fas fa-map-marker-alt"></i> {project.location}
                    </div>
                  )}
                  {project.duration && (
                    <div className="project-duration">
                      <i className="far fa-clock"></i> {project.duration}
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Fallback si aucun projet n'est disponible
              [
                {
                  title: 'Centre Commercial Majunga Plaza',
                  description: 'Construction d\'un centre commercial moderne de 5000m²',
                  year: '2023',
                  location: 'Majunga',
                  duration: '12 mois'
                },
                {
                  title: 'Résidence Les Palmiers',
                  description: 'Complexe résidentiel de 50 logements avec piscine',
                  year: '2022',
                  location: 'Antananarivo',
                  duration: '18 mois'
                },
                {
                  title: 'Route Nationale RN4',
                  description: 'Réfection de 15km de route avec signalisation',
                  year: '2021',
                  location: 'Route Majunga-Antananarivo',
                  duration: '8 mois'
                }
              ].map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-year">{project.year}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-location">
                    <i className="fas fa-map-marker-alt"></i> {project.location}
                  </div>
                  <div className="project-duration">
                    <i className="far fa-clock"></i> {project.duration}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section expertise-section">
        <div className="container">
          <div className="expertise-content">
            <div className="expertise-text">
              <h2>Notre Expertise</h2>
              <div className="expertise-item">
                <h3>🎯 Qualité Garantie</h3>
                <p>Matériaux de première qualité et respect des normes de construction internationales.</p>
              </div>
              <div className="expertise-item">
                <h3>⏱️ Délais Respectés</h3>
                <p>Planning rigoureux et équipes expérimentées pour livrer vos projets dans les temps.</p>
              </div>
              <div className="expertise-item">
                <h3>💰 Prix Compétitifs</h3>
                <p>Devis transparents et tarifs adaptés à tous les budgets sans compromis sur la qualité.</p>
              </div>
            </div>
            <div className="expertise-image">
              <div className="placeholder-image">
                <span>Image chantier BTP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Afficher uniquement si des statistiques sont disponibles */}
      {sector.statistics && sector.statistics.length > 0 && (
        <section className="section statistics-section">
          <div className="container">
            <h2 className="section-title">En Chiffres</h2>
            <div className="statistics-grid">
              {sector.statistics.map((stat, index) => (
                <div key={stat.id || index} className="statistic-card">
                  <div className="statistic-value">
                    {stat.value} {stat.unit && <span>{stat.unit}</span>}
                  </div>
                  <div className="statistic-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Votre Projet BTP Nous Intéresse</h2>
            <p>
              Que ce soit pour une construction neuve, une rénovation ou des travaux publics, 
              notre équipe est prête à étudier votre projet.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <a href="tel:+261XXXXXXXX" className="btn btn-secondary">
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BTP;
