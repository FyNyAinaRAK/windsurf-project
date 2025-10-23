import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    secteur: '',
    sujet: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const sectors = [
    'BTP',
    'Transport',
    'Immobilier',
    'Communication',
    'Services',
    'Security',
    'Import/Export'
  ];

  // Initialisation de la carte Leaflet
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      // Configuration de l'icône du marqueur
      const defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Création de la carte
      const map = L.map(mapRef.current).setView([-15.7167, 46.3167], 15);
      
      // Ajout de la couche de tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Ajout d'un marqueur
      L.marker([-15.7167, 46.3167], { icon: defaultIcon })
        .addTo(map)
        .bindPopup("Nell'Faa Groupe Majunga")
        .openPopup();

      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]*$/;

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    if (formData.telephone && !phoneRegex.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Veuillez corriger les erreurs dans le formulaire.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      const secteurMapping = {
        'BTP': 'btp',
        'Transport': 'transport',
        'Immobilier': 'immobilier',
        'Communication': 'communication',
        'Services': 'services',
        'Security': 'security',
        'Import/Export': 'import_export'
      };

      const dataToSend = {
        ...formData,
        secteur: secteurMapping[formData.secteur] || ''
      };

      const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/contacts/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.'
        });
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          entreprise: '',
          secteur: '',
          sujet: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="contact page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Contact & Devis - Nell'Faa Groupe Majunga</title>
        <meta name="description" content="Contactez Nell'Faa Groupe Majunga pour vos projets. Demandez un devis gratuit et personnalisé pour tous nos secteurs d'activité." />
      </Helmet>

      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </motion.p>
          <motion.a 
            href="#contact-form" 
            className="cta-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Envoyer un message
          </motion.a>
        </div>
        
        {/* Vague décorative en bas du hero */}
        <div className="wave-shape">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,141.56,70.72,12.4,20.9,18.75,43.2,21.91,67.6,1.1,8.48.69,15.23-2.3,22.07-1.87,4.27-5.02,8.14-12.02,9.73-3.33.81-6.48.67-9.31.35-13.07-1.46-19.16-8.74-27.49-18.17-5.78-6.59-12.75-13.9-22.2-15.66-12.12-2.27-24.23,4.3-32.31,12.8-6.71,7.13-12.01,16.38-11.68,27.35.5,16.69,16.56,29.18,33.37,25.68,21.34-4.41,37.22-22.41,47.39-40.63,8.3-14.93,12.15-30.31,12.15-45.63C1200,9.34,1186.57,0,1170.4,0Z" className="shape-fill" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </motion.section>

      {/* Contact Content */}
      <section className="contact-content-wrapper">
        <div className="container">
          <motion.div 
            className="contact-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Form */}
            <motion.div className="contact-form-container" variants={itemVariants}>
              <h2>Demander un devis</h2>
              <p>Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.</p>
              
              {submitStatus.message && (
                <div className={`submit-message ${submitStatus.type}`}>
                  {submitStatus.type === 'success' ? (
                    <FaCheckCircle className="icon" />
                  ) : (
                    <FaExclamationCircle className="icon" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}
              
              <form id="contact-form" onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nom">Nom complet *</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className={errors.nom ? 'error' : ''}
                    />
                    {errors.nom && <span className="error-message">{errors.nom}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className={errors.telephone ? 'error' : ''}
                    />
                    {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="entreprise">Entreprise</label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="secteur">Secteur d'intérêt</label>
                    <select
                      id="secteur"
                      name="secteur"
                      value={formData.secteur}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionnez un secteur</option>
                      {sectors.map(sector => (
                        <option key={sector} value={sector}>
                          Nell'Faa {sector}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sujet">Sujet</label>
                    <input
                      type="text"
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleChange}
                      placeholder="Ex: Demande de devis BTP"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Décrivez votre projet en détail..."
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(26, 54, 93, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #1a365d, #2c5282)',
                    color: 'white',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'block',
                    width: '100%',
                    maxWidth: '300px',
                    margin: '2rem auto 1rem',
                    boxShadow: '0 4px 15px rgba(26, 54, 93, 0.3)',
                    opacity: 1,
                    visibility: 'visible',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center'
                  }}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="contact-info" variants={itemVariants}>
              <h3>Nos coordonnées</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4>Adresse</h4>
                  <p>Lot II M 19 Ambatoroka,<br />Majunga 401, Madagascar</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+261 32 11 111 11<br />+261 34 11 111 11</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@nellfaa.com<br />commercial@nellfaa.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaBuilding />
                </div>
                <div>
                  <h4>Heures d'ouverture</h4>
                  <p>Lundi - Vendredi: 8h00 - 17h00<br />Samedi: 8h00 - 12h00</p>
                </div>
              </div>
              
              <div ref={mapRef} className="map-container" style={{ height: '400px', width: '100%' }}></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
