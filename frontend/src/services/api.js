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
