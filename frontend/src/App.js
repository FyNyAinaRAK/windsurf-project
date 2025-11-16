import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
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
      duration: 1200,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
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
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Home /></motion.div>} />
                <Route path="/btp" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BTP /></motion.div>} />
                <Route path="/transport" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Transport /></motion.div>} />
                <Route path="/immobilier" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Immobilier /></motion.div>} />
                <Route path="/communication" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Communication /></motion.div>} />
                <Route path="/services" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Services /></motion.div>} />
                <Route path="/security" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Security /></motion.div>} />
                <Route path="/import-export" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ImportExport /></motion.div>} />
                <Route path="/actualites" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><News /></motion.div>} />
                <Route path="/actualites/:slug" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><NewsDetail /></motion.div>} />
                <Route path="/contact" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Contact /></motion.div>} />
                <Route path="/a-propos" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><About /></motion.div>} />
                <Route path="*" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><NotFound /></motion.div>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
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
