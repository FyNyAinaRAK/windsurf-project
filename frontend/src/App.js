import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>Nell'Faa Groupe Majunga - Conglomérat Leader à Madagascar</title>
          <meta name="description" content="Nell'Faa Groupe Majunga, conglomérat leader à Madagascar dans les secteurs BTP, Transport, Immobilier, Communication, Services, Security et Import/Export" />
        </Helmet>
        
        <Header />
        <ScrollToTop />
        <Breadcrumbs />
        
        <main>
          <Routes>
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
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
