import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UnifiedSectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Transport = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/transport/`);
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

  // Fallback data in case sector is not available
  const services = sector?.services || [
    'Transport de marchandises et logistique',
    'Transport de personnes et navettes',
    'Location de véhicules avec chauffeur',
    'Transport spécialisé (matériaux, équipements)',
    'Déménagement et manutention',
    'Solutions logistiques sur mesure'
  ];

  const fleet = sector?.fleet || [
    {
      type: 'Camions',
      description: 'Flotte de camions de différentes capacités pour tous vos besoins de transport',
      capacity: '3T à 20T'
    },
    {
      type: 'Véhicules légers',
      description: 'Voitures et utilitaires pour transport de personnes et petites livraisons',
      capacity: '5 à 9 places'
    },
    {
      type: 'Transport spécialisé',
      description: 'Véhicules adaptés pour matériaux de construction et équipements lourds',
      capacity: 'Sur mesure'
    }
  ];

  const pageTitle = sector?.meta_title || "Nell'Faa Transport - Solutions de Transport et Logistique à Majunga";
  const pageDescription = sector?.meta_description || "Nell'Faa Transport, votre partenaire transport et logistique à Majunga. Marchandises, personnes, déménagement et solutions sur mesure.";
  const heroTitle = sector?.display_name || "Nell'Faa Transport";
  const heroDescription = sector?.description || "Avec une flotte moderne et une équipe expérimentée, Nell'Faa Transport vous offre des solutions de transport fiables et adaptées à tous vos besoins à Majunga et dans toute la région.";

  return (
    <div className="sector-page page-transition transport-theme">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {/* Hero Section */}
      <section className="sector-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector?.icon || '🚛'}</div>
            <h1>{heroTitle}</h1>
            <p>Solutions de Transport & Logistique</p>
            <div className="hero-description">
              <p>{heroDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services Transport</h2>
          <p className="section-subtitle">
            Des solutions complètes pour tous vos besoins de transport et logistique
          </p>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="service-content">
                  <p>{typeof service === 'object' ? service.name || service : service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="section properties-section">
        <div className="container">
          <h2 className="section-title">Notre Flotte</h2>
          <p className="section-subtitle">
            Véhicules modernes et bien entretenus pour garantir la sécurité de vos biens
          </p>
          
          <div className="properties-grid">
            {fleet.map((vehicle, index) => (
              <div key={index} className="property-card">
                <div className="property-range">{vehicle.capacity}</div>
                <h3>{vehicle.type}</h3>
                <p>{vehicle.description}</p>
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
              <h2>Pourquoi Nous Choisir</h2>
              {sector?.expertise_points?.length > 0 ? (
                sector.expertise_points.map((point, index) => (
                  <div key={index} className="expertise-item">
                    <h3>{point.title || 'Point clé'}</h3>
                    <p>{point.description || 'Description du point clé'}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="expertise-item">
                    <h3>🚚 Flotte Moderne</h3>
                    <p>Véhicules récents, bien entretenus et adaptés à tous types de transport.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>👨‍💼 Chauffeurs Expérimentés</h3>
                    <p>Équipe de chauffeurs professionnels connaissant parfaitement la région.</p>
                  </div>
                  <div className="expertise-item">
                    <h3>📱 Suivi en Temps Réel</h3>
                    <p>Traçabilité complète de vos marchandises avec suivi GPS en temps réel.</p>
                  </div>
                </>
              )}
            </div>
            <div className="expertise-image">
              {sector?.image_url ? (
                <img src={sector.image_url} alt={sector.display_name || 'Transport'} />
              ) : (
                <div className="placeholder-image">
                  <span>Image flotte transport</span>
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
            <h2>Besoin d'une Solution Transport ?</h2>
            <p>
              Que ce soit pour un transport ponctuel ou un contrat longue durée, 
              nous avons la solution adaptée à vos besoins.
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

export default Transport;
