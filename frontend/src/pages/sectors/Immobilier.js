import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Immobilier = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/immobilier/`);
        setSector(response.data);
        
        // Si des propriétés sont fournies dans la réponse, on les utilise
        if (response.data.properties) {
          setProperties(response.data.properties);
        } else {
          // Valeurs par défaut si aucune propriété n'est fournie
          setProperties([
            {
              type: 'Résidentiel',
              description: 'Appartements, villas et terrains dans les meilleurs quartiers de Majunga',
              range: '50M - 1.5M Ar'
            },
            {
              type: 'Commercial',
              description: 'Bureaux, locaux commerciaux et espaces professionnels clés en main',
              range: '100M - 5M Ar'
            },
            {
              type: 'Terrains',
              description: 'Parcelles constructibles et terrains d\'investissement',
              range: '20M - 200M Ar'
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
    <div className="sector-page page-transition immobilier-theme">
      <Helmet>
        <title>{sector.meta_title || "Nell'Faa Immobilier - Vente, Location et Gestion Immobilière à Majunga"}</title>
        <meta 
          name="description" 
          content={sector.meta_description || "Nell'Faa Immobilier, votre expert immobilier à Majunga. Vente, location, gestion locative et conseil en investissement immobilier."} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="sector-hero immobilier-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector.icon || '🏢'}</div>
            <h1>{sector.display_name || "Nell'Faa Immobilier"}</h1>
            <p>Vente, Location & Gestion Immobilière</p>
            <div className="hero-description">
              <p>{sector.description || sector.short_description || "Spécialiste de l'immobilier à Majunga, Nell'Faa Immobilier vous accompagne dans tous vos projets : achat, vente, location et gestion de patrimoine immobilier avec expertise et professionnalisme."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services Immobiliers</h2>
          <p className="section-subtitle">
            {sector.services_subtitle || "Une gamme complète de services pour tous vos besoins immobiliers"}
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
                'Vente de biens immobiliers résidentiels',
                'Location d\'appartements et maisons',
                'Gestion locative et syndic',
                'Estimation et expertise immobilière',
                'Conseil en investissement immobilier',
                'Promotion immobilière et développement'
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

      {/* Properties Section */}
      <section className="section properties-section">
        <div className="container">
          <h2 className="section-title">Nos Biens Immobiliers</h2>
          <p className="section-subtitle">
            Découvrez notre sélection de biens exclusifs
          </p>
          
          <div className="properties-grid">
            {properties.map((property, index) => (
              <div key={index} className="property-card">
                <h3>{property.type}</h3>
                <p>{property.description}</p>
                <div className="property-range">{property.range}</div>
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
              <h2>Notre Expertise</h2>
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
                    <h3>🏠 Connaissance du Marché</h3>
                    <p>Expertise approfondie du marché immobilier local et des tendances.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>📋 Accompagnement Complet</h3>
                    <p>De la recherche à la signature, nous vous accompagnons à chaque étape.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>💼 Gestion Professionnelle</h3>
                    <p>Services de gestion locative et de syndic pour optimiser vos revenus.</p>
                  </div>
                </>
              )}
            </div>
            <div className="expertise-image">
              {sector.expertise_image ? (
                <img src={sector.expertise_image} alt="Expertise Immobilière" />
              ) : (
                <div className="placeholder-image">
                  <span>Image biens immobiliers</span>
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
            <h2>{sector.cta_title || "Votre Projet Immobilier Commence Ici"}</h2>
            <p>
              {sector.cta_description || "Achat, vente, location ou investissement ? Notre équipe d'experts est là pour vous conseiller et vous accompagner."}
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                {sector.cta_primary_text || "Nous contacter"}
              </Link>
              <a href="tel:+261XXXXXXXX" className="btn btn-secondary">
                {sector.cta_secondary_text || "Estimation gratuite"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Immobilier;
