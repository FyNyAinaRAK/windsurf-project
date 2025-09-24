// Helper utility functions for Nell'Faa Groupe

// Format date to French locale
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    ...options
  };
  
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', defaultOptions);
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

// Format date with time
export const formatDateTime = (dateString) => {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Madagascar format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+261|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Format phone number for display
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('261')) {
    return `+261 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`;
  }
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
};

// Scroll to element smoothly
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get sector info by key
export const getSectorByKey = (sectorKey, sectors) => {
  return sectors.find(sector => sector.key === sectorKey || sector.name === sectorKey);
};

// Format currency (Ariary)
export const formatCurrency = (amount, currency = 'Ar') => {
  if (!amount) return '0 ' + currency;
  
  const formatted = new Intl.NumberFormat('fr-FR').format(amount);
  return `${formatted} ${currency}`;
};

// Calculate reading time for articles
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de lecture`;
};

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Get random items from array
export const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  }
};

// Error handling helper
export const handleApiError = (error, fallbackMessage = 'Une erreur est survenue') => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || fallbackMessage;
  } else if (error.request) {
    // Network error
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  } else {
    // Other error
    return fallbackMessage;
  }
};
