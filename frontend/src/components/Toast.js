import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './Toast.css';

// Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use Toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaTimes />;
      case 'warning':
        return <FaExclamationTriangle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const toastVariants = {
    initial: {
      opacity: 0,
      x: 300,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      x: 300,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className={`toast toast-${toast.type}`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-message">
          {toast.message}
        </div>
        <button 
          className="toast-close"
          onClick={onRemove}
          aria-label="Fermer la notification"
        >
          <FaTimes />
        </button>
      </div>
      {toast.duration > 0 && (
        <div className="toast-progress">
          <motion.div
            className="toast-progress-bar"
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};

// Utility functions for easy toast usage
export const toast = {
  success: (message, duration) => {
    // This will be used with the hook
    return { message, type: 'success', duration };
  },
  error: (message, duration) => {
    return { message, type: 'error', duration };
  },
  warning: (message, duration) => {
    return { message, type: 'warning', duration };
  },
  info: (message, duration) => {
    return { message, type: 'info', duration };
  }
};

export default Toast;