import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  // If custom breadcrumbs are provided, use them
  if (customBreadcrumbs) {
    return (
      <nav className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-list">
            {customBreadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="breadcrumb-separator">›</span>}
                {crumb.path ? (
                  <Link to={crumb.path} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  // Auto-generate breadcrumbs from URL
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbsMap = {
    'btp': 'BTP',
    'transport': 'Transport',
    'immobilier': 'Immobilier',
    'communication': 'Communication',
    'services': 'Services',
    'security': 'Security',
    'import-export': 'Import/Export',
    'actualites': 'Actualités',
    'a-propos': 'À Propos',
    'contact': 'Contact'
  };

  return (
    <nav className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbs-list">
          <Link to="/" className="breadcrumb-link">Accueil</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbsMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <React.Fragment key={name}>
                <span className="breadcrumb-separator">›</span>
                {isLast ? (
                  <span className="breadcrumb-current">{displayName}</span>
                ) : (
                  <Link to={routeTo} className="breadcrumb-link">
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
