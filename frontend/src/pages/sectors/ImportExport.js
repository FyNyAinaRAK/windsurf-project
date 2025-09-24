import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SectorPage.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const ImportExport = () => {
  const [sector, setSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sectors/import_export/`);
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
    'Import de marchandises internationales',
    'Export de produits malgaches',
    'Dédouanement et formalités administratives',
    'Logistique internationale et transit',
    'Conseil en commerce international',
    'Sourcing et négociation fournisseurs'
  ];

  const defaultSolutions = [
    {
      type: 'Import',
      description: 'Importation sécurisée de vos marchandises avec suivi complet',
      focus: 'Fiabilité',
      details: ['Douane', 'Transport', 'Dédouanement']
    },
    {
      type: 'Export',
      description: 'Développement de vos marchés à l\'international',
      focus: 'Expansion',
      details: ['Étude de marché', 'Logistique', 'Accompagnement']
    },
    {
      type: 'Transit',
      description: 'Solutions logistiques complètes pour vos flux internationaux',
      focus: 'Efficacité',
      details: ['Stockage', 'Transport', 'Tracabilité']
    }
  ];

  const services = sector?.services?.length > 0 ? sector.services : defaultServices;
  const solutions = sector?.solutions?.length > 0 ? sector.solutions : defaultSolutions;

  return (
    <div className="sector-page page-transition importexport-theme">
      <Helmet>
        <title>{sector?.meta_title || "Nell'Faa Import/Export - Commerce International à Majunga"}</title>
        <meta 
          name="description" 
          content={sector?.meta_description || "Nell'Faa Import/Export, votre partenaire commerce international à Majunga. Import, export, dédouanement et logistique internationale."} 
        />
      </Helmet>

      <section className="sector-hero import-export-hero">
        <div className="container">
          <div className="sector-hero-content">
            <div className="sector-icon">{sector?.icon || '🌍'}</div>
            <h1>{sector?.display_name || "Nell'Faa Import/Export"}</h1>
            <p>Commerce International & Négoce</p>
            <div className="hero-description">
              <p>
                {sector?.description || sector?.short_description || 
                  "Nell'Faa Import/Export facilite vos échanges commerciaux internationaux " +
                  "avec Madagascar. Expertise en dédouanement, logistique et développement " +
                  "de marchés pour optimiser vos flux commerciaux."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Nos Services Import/Export</h2>
          <p className="section-subtitle">
            Solutions complètes pour vos échanges commerciaux internationaux
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
            Accompagnement personnalisé selon vos besoins commerciaux
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
                <h3>🌐 Réseau International</h3>
                <p>Partenaires de confiance dans le monde entier pour faciliter vos échanges.</p>
              </div>
              <div className="expertise-item">
                <h3>📋 Conformité Réglementaire</h3>
                <p>Maîtrise parfaite des réglementations douanières et commerciales.</p>
              </div>
              <div className="expertise-item">
                <h3>⚡ Optimisation des Coûts</h3>
                <p>Solutions économiques pour maximiser la rentabilité de vos opérations.</p>
              </div>
            </div>
            <div className="expertise-image">
              <img 
                src={sector?.expertise_image || "/images/import-export-expertise.jpg"} 
                alt="Expertise en commerce international"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/import-export-expertise.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Développez Votre Commerce International</h2>
          <p>Prêt à étendre vos activités à l'international ? Bénéficiez de notre expertise pour sécuriser et optimiser vos échanges commerciaux.</p>
          <Link to="/contact" className="btn btn-primary">Étude de faisabilité</Link>
        </div>
      </section>
    </div>
  );
};

export default ImportExport;
