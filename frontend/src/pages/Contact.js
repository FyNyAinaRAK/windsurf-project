import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getContactInfo, getCompanyInfo, submitContactForm } from '../services/api';
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
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: '',
    business_hours: 'Lun-Ven: 8h00-17h00\nSam: 8h00-12h00',
    latitude: -15.7167,
    longitude: 46.3167
  });

  const sectors = [
    'BTP',
    'Transport',
    'Immobilier',
    'Communication',
    'Services',
    'Security',
    'Import/Export'
  ];

  // Récupération des informations de l'entreprise depuis l'API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const companyData = await getCompanyInfo();
        console.log('Données de l\'entreprise:', companyData); // Pour le débogage
        setContactInfo(prev => ({
          ...prev,
          address: companyData.address || 'Majunga, Madagascar',
          phone: companyData.phone || '+261 XX XX XXX XX',
          email: companyData.email || 'contact@nellfaa-groupe.mg',
          business_hours: companyData.business_hours || 'Lun-Ven: 8h00-17h00\nSam: 8h00-12h00'
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des informations de l\'entreprise:', error);
        // Valeurs par défaut en cas d'erreur
        setContactInfo(prev => ({
          ...prev,
          address: 'Majunga, Madagascar',
          phone: '+261 XX XX XXX XX',
          email: 'contact@nellfaa-groupe.mg',
          working_hours: 'Lun-Sam: 8h00-18h00',
          weekend_hours: 'Dim: Fermé'
        }));
      }
    };

    fetchCompanyInfo();
  }, []);

  // Initialisation de la carte Leaflet
  useEffect(() => {
    if (!mapInstance.current && mapRef.current && contactInfo.latitude && contactInfo.longitude) {
      // Configuration de l'icône du marqueur
      const defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Création de la carte avec les coordonnées de l'API
      const map = L.map(mapRef.current).setView([contactInfo.latitude, contactInfo.longitude], 15);
      
      // Ajout de la couche de tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Ajout d'un marqueur avec les coordonnées de l'API
      L.marker([contactInfo.latitude, contactInfo.longitude], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(contactInfo.address || "Nell'Faa Groupe Majunga")
        .openPopup();

      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [contactInfo.latitude, contactInfo.longitude]);

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

      const response = await submitContactForm(dataToSend);
      
      if (!response.success) {
        throw new Error('Échec de l\'envoi du formulaire');
      }
      
      setSubmitStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.'
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
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Contact - Nell'Faa Groupe</title>
        <meta name="description" content="Contactez-nous pour toute demande d'information ou de devis. Notre équipe est à votre écoute." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </motion.p>
        </div>
        
        <div className="wave-shape">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <div className="contact-content-wrapper">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-container"
              variants={itemVariants}
            >
              <h2>Demander un devis</h2>
              <p>Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais.</p>
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
              
              {/* Message de statut de soumission */}
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
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="contact-info-container"
              variants={itemVariants}
            >
              <h2>Nos coordonnées</h2>
              
              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Adresse</h4>
                  <p>{contactInfo.address || 'Majunga, Madagascar'}</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Téléphone</h4>
                  <p>{contactInfo.phone || '+261 XX XX XXX XX'}</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>{contactInfo.email || 'contact@nellfaa-groupe.mg'}</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <FaBuilding className="contact-icon" />
                <div>
                  <h4>Heures d'ouverture</h4>
                  <p>{contactInfo.business_hours && contactInfo.business_hours.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}</p>
                </div>
              </div>
              
              <div 
                ref={mapRef} 
                className="map-container" 
                style={{ 
                  height: '250px', 
                  width: '100%', 
                  marginTop: '20px', 
                  borderRadius: '8px', 
                  overflow: 'hidden' 
                }}
              ></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
