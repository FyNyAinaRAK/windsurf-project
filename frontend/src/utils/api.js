// API utility functions for Nell'Faa Groupe
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API endpoints
export const api = {
  // Company info
  getCompanyInfo: () => apiRequest('/api/company-info/'),
  
  // Sectors
  getSectors: () => apiRequest('/api/sectors/'),
  getSector: (id) => apiRequest(`/api/sectors/${id}/`),
  
  // Services
  getAdminServices: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/sectors/services/admin/${queryString ? `?${queryString}` : ''}`);
  },
  getTechnicalServices: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/sectors/services/technical/${queryString ? `?${queryString}` : ''}`);
  },
  
  // Testimonials
  getTestimonials: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/testimonials/${queryString ? `?${queryString}` : ''}`);
  },
  
  // News articles
  getNews: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/news/${queryString ? `?${queryString}` : ''}`);
  },
  getNewsArticle: (slug) => apiRequest(`/api/news/${slug}/`),
  
  // Contact
  submitContact: (data) => apiRequest('/api/contacts/submit/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Newsletter
  subscribeNewsletter: (data) => apiRequest('/api/contacts/newsletter/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default api;
