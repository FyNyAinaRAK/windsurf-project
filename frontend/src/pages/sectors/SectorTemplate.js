import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UnifiedSectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const SectorTemplate = ({ 
  sectorName, 
  sectorIcon, 
  displayName, 
  tagline, 
  metaTitle, 
  metaDescription, 
  heroDescription, 
  servicesTitle, 
  servicesSubtitle, 
  defaultServices,
  administrativeServices, // Nouvelle prop pour services administratifs
  propertiesTitle,
  propertiesSubtitle,
  defaultProperties,
  expertiseTitle,
  defaultExpertise,
  ctaTitle,
  ctaDescription,
  theme, // Ajout du paramètre theme manquant
}) => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/${sectorName}/`);
        setSector(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchSectorData();
  }, [sectorName]);

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
    <div className={`sector-page page-transition ${theme}-theme`}>
      <Helmet>
        <title>{sector.meta_title || metaTitle}</title>
        <meta 
          name="description" 
          content={sector.meta_description || metaDescription} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="sector-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector.icon || sectorIcon}</div>
            <h1>{sector.display_name || displayName}</h1>
            <p>{tagline}</p>
            <div className="hero-description">
              <p>{sector.description || sector.short_description || heroDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">{servicesTitle}</h2>
          <p className="section-subtitle">{servicesSubtitle}</p>
          
          {/* Services administratifs si disponibles */}
          {administrativeServices && administrativeServices.length > 0 && (
            <div className="services-category">
              <h3 className="category-title">Services Administratifs</h3>
              <div className="services-grid">
                {administrativeServices.map((service, index) => (
                  <div key={`admin-${index}`} className="service-card admin-service">
                    <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="service-content">
                      <p>{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Services techniques/non-administratifs */}
          <div className="services-category">
            {administrativeServices && administrativeServices.length > 0 && (
              <h3 className="category-title">Services Techniques</h3>
            )}
            <div className="services-grid">
              {sector.services && sector.services.length > 0 ? (
                sector.services.map((service, index) => {
                  const serviceNumber = administrativeServices && administrativeServices.length > 0 
                    ? index + administrativeServices.length + 1 
                    : index + 1;
                  return (
                    <div key={service.id || index} className="service-card">
                      {service.icon && <div className="service-icon">{service.icon}</div>}
                      <div className="service-number">{String(serviceNumber).padStart(2, '0')}</div>
                      <div className="service-content">
                        <h3>{service.name}</h3>
                        {service.description && <p>{service.description}</p>}
                      </div>
                    </div>
                  );
                })
              ) : (
                defaultServices && defaultServices.map((service, index) => {
                  const serviceNumber = administrativeServices && administrativeServices.length > 0 
                    ? index + administrativeServices.length + 1 
                    : index + 1;
                  return (
                    <div key={index} className="service-card">
                      <div className="service-number">{String(serviceNumber).padStart(2, '0')}</div>
                      <div className="service-content">
                        <p>{service}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Properties/Projects Section */}
      {defaultProperties && defaultProperties.length > 0 && (
        <section className="section properties-section">
          <div className="container">
            <h2 className="section-title">{propertiesTitle}</h2>
            <p className="section-subtitle">{propertiesSubtitle}</p>
            
            <div className="properties-grid">
              {defaultProperties.map((property, index) => (
                <div key={index} className="property-card">
                  <h3>{property.type}</h3>
                  <p>{property.description}</p>
                  {property.range && <div className="property-range">{property.range}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      <section className="section expertise-section">
        <div className="container">
          <div className="expertise-content">
            <div className="expertise-text">
              <h2>{expertiseTitle}</h2>
              {sector.expertise_highlights && sector.expertise_highlights.length > 0 ? (
                sector.expertise_highlights.map((item, index) => (
                  <div key={index} className="expertise-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                defaultExpertise.map((item, index) => (
                  <div key={index} className="expertise-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))
              )}
            </div>
            <div className="expertise-image">
              {sector.expertise_image ? (
                <img src={sector.expertise_image} alt={`${displayName} Expertise`} />
              ) : (
                <div className="placeholder-image">
                  <span>Image {sectorName}</span>
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
            <h2>{sector.cta_title || ctaTitle}</h2>
            <p>{sector.cta_description || ctaDescription}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                {sector.cta_primary_text || "Nous contacter"}
              </Link>
              <a href="tel:+261XXXXXXXX" className="btn btn-secondary">
                {sector.cta_secondary_text || "Devis gratuit"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorTemplate;