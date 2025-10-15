const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  CONTACTS: `${API_BASE_URL}/api/contacts/submit/`,
  NEWSLETTER: `${API_BASE_URL}/api/contacts/newsletter/`,
  TESTIMONIALS: `${API_BASE_URL}/api/testimonials/`,
  COMPANY_INFO: `${API_BASE_URL}/api/company-info/`,
  NEWS: `${API_BASE_URL}/api/news/`,
  SECTORS: `${API_BASE_URL}/api/sectors/`,
  SECTOR_BTP: `${API_BASE_URL}/api/sectors/btp/`
};

export default API_ENDPOINTS;
