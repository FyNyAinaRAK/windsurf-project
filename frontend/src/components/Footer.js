import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCompanyInfo } from '../services/api';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    name: "Nell'Faa Groupe Majunga",
    description: "Conglomérat leader à Madagascar, actif dans 7 secteurs d'activité pour répondre à tous vos besoins professionnels et personnels.",
    address: "Majunga, Madagascar",
    phone: "+261 XX XX XXX XX",
    email: "contact@nellfaa-groupe.mg",
    business_hours: "Lun-Ven: 8h00-17h00\nSam: 8h00-12h00",
    social_media: {
      facebook: 'https://facebook.com',
      linkedin: 'https://linkedin.com'
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data = await getCompanyInfo();
        setCompanyInfo(prev => ({
          ...prev,
          ...data,
          social_media: {
            ...prev.social_media,
            ...(data.social_media || {})
          }
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des informations de l\'entreprise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleNewsletterClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('newsletter');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('newsletter');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSocialClick = (platform) => {
    const url = companyInfo.social_media?.[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const sectors = [
    { name: 'BTP', path: '/btp' },
    { name: 'Transport', path: '/transport' },
    { name: 'Immobilier', path: '/immobilier' },
    { name: 'Communication', path: '/communication' },
    { name: 'Services', path: '/services' },
    { name: 'Security', path: '/security' },
    { name: 'Import/Export', path: '/import-export' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{companyInfo.name}</h3>
            <p>{companyInfo.description}</p>
            <div className="social-links">
              <button 
                onClick={() => handleSocialClick('facebook')} 
                className="social-button"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')} 
                className="social-button"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Nos Secteurs</h4>
            <ul className="footer-links">
              {sectors.map((sector) => (
                <li key={sector.path}>
                  <Link to={sector.path}>Nell'Faa {sector.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/actualites">Actualités</Link></li>
              <li><Link to="/a-propos">À Propos</Link></li>
              <li><Link to="/contact">Contact & Devis</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p>📍 {companyInfo.address}</p>
              <p>📞 {companyInfo.phone}</p>
              <p>✉️ {companyInfo.email}</p>
              <p>🕒 {companyInfo.business_hours && companyInfo.business_hours.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}</p>
            </div>
            <div className="footer-newsletter">
              <h5>Newsletter</h5>
              <p>Restez informé de nos actualités</p>
              <button 
                className="newsletter-link" 
                onClick={handleNewsletterClick}
                aria-label="S'abonner à la newsletter"
              >
                S'abonner →
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {companyInfo.name}. Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <span className="footer-link-inactive">Mentions légales</span>
            <span className="footer-link-inactive">Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;