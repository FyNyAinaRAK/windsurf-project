import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getContactInfo = async () => {
  try {
    const response = await api.get('/api/contact-info/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de contact:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/api/contacts/submit/', formData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    throw error;
  }
};

export const getCompanyInfo = async () => {
  try {
    const response = await api.get('/api/company/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'entreprise:', error);
    // Retourner des valeurs par défaut en cas d'erreur
    return {
      name: "Nell'Faa Groupe Majunga",
      description: "Conglomérat leader à Madagascar, actif dans 7 secteurs d'activité pour répondre à tous vos besoins professionnels et personnels.",
      address: "Majunga, Madagascar",
      phone: "+261 XX XX XXX XX",
      email: "contact@nellfaa-groupe.mg",
      working_hours: "Lun-Ven: 8h00-17h00",
      weekend_hours: "Sam: 8h00-12h00",
      social_media: {
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com'
      }
    };
  }
};
