import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const sectors = [
    { name: 'BTP', path: '/btp' },
    { name: 'Transport', path: '/transport' },
    { name: 'Immobilier', path: '/immobilier' },
    { name: 'Communication', path: '/communication' },
    { name: 'Services', path: '/services' },
    { name: 'Security', path: '/security' },
    { name: 'Import/Export', path: '/import-export' }
  ];

  // Fermer le menu déroulant quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSectorsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSectors = () => {
    setIsSectorsOpen(!isSectorsOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/images/logo/nellfaa-logo.svg" alt="Nell'Faa Groupe Logo" className="logo-image" />
            <div className="logo-text">
              <h1>NELL'FAA GROUPE</h1>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSectorsOpen(false);
              }}
            >
              Accueil
            </Link>

            <div 
              className={`dropdown ${isSectorsOpen ? 'show' : ''}`} 
              ref={dropdownRef}
            >
              <button 
                type="button"
                className="nav-link"
                onClick={toggleSectors}
                aria-expanded={isSectorsOpen}
              >
                Nos Secteurs
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-menu">
                {sectors.map((sector) => (
                  <Link
                    key={sector.path}
                    to={sector.path}
                    className="dropdown-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSectorsOpen(false);
                    }}
                  >
                    {sector.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/actualites" 
              className={`nav-link ${location.pathname === '/actualites' || location.pathname.startsWith('/actualites/') ? 'active' : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSectorsOpen(false);
              }}
            >
              Actualités
            </Link>

            <Link 
              to="/a-propos" 
              className={`nav-link ${location.pathname === '/a-propos' ? 'active' : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSectorsOpen(false);
              }}
            >
              À Propos
            </Link>

            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSectorsOpen(false);
              }}
            >
              Contact
            </Link>
          </nav>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
