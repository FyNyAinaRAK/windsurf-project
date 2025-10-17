import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: '',
    nom: '',
    secteurs_interesse: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const sectors = [
    { value: 'btp', label: 'BTP' },
    { value: 'transport', label: 'Transport' },
    { value: 'immobilier', label: 'Immobilier' },
    { value: 'communication', label: 'Communication' },
    { value: 'services', label: 'Services' },
    { value: 'security', label: 'Security' },
    { value: 'import_export', label: 'Import/Export' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectorChange = (sectorValue) => {
    setFormData(prev => ({
      ...prev,
      secteurs_interesse: prev.secteurs_interesse.includes(sectorValue)
        ? prev.secteurs_interesse.filter(s => s !== sectorValue)
        : [...prev.secteurs_interesse, sectorValue]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/newsletter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage(result.message || 'Inscription à la newsletter réussie !');
        setFormData({
          email: '',
          nom: '',
          secteurs_interesse: []
        });
      } else {
        const errorData = await response.json();
        if (errorData.email && errorData.email.includes('already exists')) {
          setSubmitMessage('Cet email est déjà abonné à notre newsletter. Vos préférences ont été mises à jour.');
        } else {
          setSubmitMessage('Une erreur est survenue lors de l\'inscription.');
        }
        console.error('Erreur API:', errorData);
      }
    } catch (error) {
      setSubmitMessage('Erreur de connexion. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-info">
            <h3>📧 Restez informé</h3>
            <p>
              Abonnez-vous à notre newsletter pour recevoir nos dernières actualités, 
              projets et opportunités dans les secteurs qui vous intéressent.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom (optionnel)"
                />
              </div>
            </div>

            <div className="sectors-selection">
              <p>Secteurs d'intérêt :</p>
              <div className="sectors-grid">
                {sectors.map(sector => (
                  <label key={sector.value} className="sector-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.secteurs_interesse.includes(sector.value)}
                      onChange={() => handleSectorChange(sector.value)}
                    />
                    <span className="checkmark"></span>
                    {sector.label}
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary newsletter-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription...' : 'S\'abonner'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('réussie') || submitMessage.includes('mises à jour') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
