import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found page-transition">
      <Helmet>
        <title>Page non trouvée - Nell'Faa Groupe</title>
        <meta name="description" content="La page que vous recherchez n'existe pas. Retournez à l'accueil de Nell'Faa Groupe." />
      </Helmet>

      <div className="not-found-container">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-illustration">
              <div className="error-code">404</div>
              <div className="error-icon">🏗️</div>
            </div>
            
            <div className="not-found-text">
              <h1>Oups ! Page en construction</h1>
              <p>
                La page que vous recherchez n'existe pas ou a été déplacée. 
                Nos équipes travaillent constamment à améliorer votre expérience.
              </p>
              
              <div className="not-found-actions">
                <Link to="/" className="btn btn-primary">
                  Retour à l'accueil
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Nous contacter
                </Link>
              </div>
              
              <div className="helpful-links">
                <h3>Liens utiles</h3>
                <div className="links-grid">
                  <Link to="/btp">Nell'Faa BTP</Link>
                  <Link to="/transport">Nell'Faa Transport</Link>
                  <Link to="/immobilier">Nell'Faa Immobilier</Link>
                  <Link to="/actualites">Actualités</Link>
                  <Link to="/a-propos">À Propos</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
