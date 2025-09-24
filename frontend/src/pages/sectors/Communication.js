import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Communication = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/communication/`);
        setSector(response.data);
        
        // Si des solutions sont fournies dans la réponse, on les utilise
        if (response.data.solutions) {
          setSolutions(response.data.solutions);
        } else {
          // Valeurs par défaut si aucune solution n'est fournie
          setSolutions([
            {
              type: 'Digital',
              description: 'Solutions numériques complètes pour votre présence en ligne',
              focus: 'Web & Mobile'
            },
            {
              type: 'Marketing',
              description: 'Stratégies marketing personnalisées pour atteindre vos objectifs',
              focus: 'ROI & Performance'
            },
            {
              type: 'Branding',
              description: 'Création et développement de votre identité de marque',
              focus: 'Image & Notoriété'
            }
          ]);
        }
        
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
    <div className="sector-page page-transition communication-theme">
      <Helmet>
        <title>{sector.meta_title || "Nell'Faa Communication - Marketing Digital et Communication à Majunga"}</title>
        <meta 
          name="description" 
          content={sector.meta_description || "Nell'Faa Communication, votre agence de communication digitale à Majunga. Sites web, réseaux sociaux, branding et stratégie marketing."} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="sector-hero communication-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector.icon || '📱'}</div>
            <h1>{sector.display_name || "Nell'Faa Communication"}</h1>
            <p>Marketing Digital & Communication</p>
            <div className="hero-description">
              <p>{sector.description || sector.short_description || "Agence de communication moderne, Nell'Faa Communication vous accompagne dans votre transformation digitale avec des solutions créatives et performantes adaptées au marché malgache."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services Communication</h2>
          <p className="section-subtitle">
            {sector.services_subtitle || "Solutions complètes pour booster votre présence et votre image de marque"}
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
                'Stratégie de communication digitale',
                'Création de sites web et applications',
                'Gestion des réseaux sociaux',
                'Publicité en ligne et SEO',
                'Identité visuelle et branding',
                'Événementiel et relations publiques'
              ].map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                  <p>{service}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="section solutions-section">
        <div className="container">
          <h2 className="section-title">Nos Solutions</h2>
          <p className="section-subtitle">
            {sector.solutions_subtitle || "Des approches innovantes pour répondre à vos défis de communication"}
          </p>
          
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <h3>{solution.type}</h3>
                <p>{solution.description}</p>
                <div className="solution-focus">
                  <span>Focus : </span>
                  {solution.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section expertise-section">
        <div className="container">
          <div className="expertise-content">
            <div className="expertise-text">
              <h2>Notre Approche</h2>
              {sector.expertise_highlights && sector.expertise_highlights.length > 0 ? (
                sector.expertise_highlights.map((item, index) => (
                  <div key={index} className="expertise-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="expertise-item">
                    <h3>🎯 Stratégie Sur Mesure</h3>
                    <p>Analyse approfondie de vos besoins pour une stratégie personnalisée.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>🚀 Innovation Créative</h3>
                    <p>Solutions créatives et modernes adaptées aux tendances actuelles.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>📊 Mesure de Performance</h3>
                    <p>Suivi et analyse des résultats pour optimiser votre ROI.</p>
                  </div>
                </>
              )}
            </div>
            <div className="expertise-image">
              {sector.expertise_image ? (
                <img src={sector.expertise_image} alt="Expertise en Communication" />
              ) : (
                <div className="placeholder-image">
                  <span>Image communication digitale</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{sector.cta_title || "Développons Votre Communication"}</h2>
            <p>
              {sector.cta_description || "Prêt à booster votre présence digitale et développer votre notoriété ? Discutons de votre projet de communication."}
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                {sector.cta_primary_text || "Demander un audit"}
              </Link>
              <a href="tel:+261XXXXXXXX" className="btn btn-secondary">
                {sector.cta_secondary_text || "Nous appeler"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Communication;
