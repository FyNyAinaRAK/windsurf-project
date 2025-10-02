import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import NotFound from './pages/NotFound';
import BTP from './pages/sectors/BTP';
import Transport from './pages/sectors/Transport';
import Immobilier from './pages/sectors/Immobilier';
import Communication from './pages/sectors/Communication';
import Security from './pages/sectors/Security';
import Services from './pages/sectors/Services';
import ImportExport from './pages/sectors/ImportExport';
import './App.css';

// Loading component for Suspense fallback
const Loading = () => <div className="loading">Chargement...</div>;

// Error boundary for routes
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <div className="error-message">Une erreur est survenue. Veuillez rafraîchir la page.</div>;
  }

  return children;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Nell'Faa Groupe Majunga - Conglomérat Leader à Madagascar</title>
        <meta name="description" content="Nell'Faa Groupe Majunga, conglomérat leader à Madagascar dans les secteurs BTP, Transport, Immobilier, Communication, Services, Security et Import/Export" />
      </Helmet>
      
      <Header />
      <ScrollToTop />
      <Breadcrumbs />
      
      <main>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/btp" element={<BTP />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/immobilier" element={<Immobilier />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/services" element={<Services />} />
              <Route path="/security" element={<Security />} />
              <Route path="/import-export" element={<ImportExport />} />
              <Route path="/actualites" element={<News />} />
              <Route path="/actualites/:slug" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
}

// Wrap the App with Router and HelmetProvider to fix warnings
const AppWrapper = () => (
  <Router future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </Router>
);

export default AppWrapper;
