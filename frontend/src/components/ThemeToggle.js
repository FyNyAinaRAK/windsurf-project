import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import styled from 'styled-components';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    try {
      // Vérifier si on est côté client
      if (typeof window !== 'undefined') {
        // Récupérer le thème depuis localStorage ou utiliser les préférences système
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Déterminer le thème à appliquer
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(shouldBeDark);
        
        // Appliquer le thème
        applyTheme(shouldBeDark);
        
        // Écouter les changements de préférence système
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
          if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setIsDark(e.matches);
            applyTheme(e.matches);
          }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du thème:', error);
    }
  }, []);

  const applyTheme = (isDarkMode) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Forcer la mise à jour des styles
    root.style.setProperty('--current-theme', isDarkMode ? 'dark' : 'light');
    
    // Ajouter une classe pour les transitions
    root.classList.add('theme-transition');
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Appliquer le thème avec animation
    applyTheme(newTheme);
  };

  return (
    <ToggleContainer 
      ref={toggleRef}
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="theme-toggle__button">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              className="theme-toggle__icon theme-toggle__icon--moon"
              initial={{ opacity: 0, y: -10, rotate: -30 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 10, rotate: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <FiMoon />
              {isHovered && <span className="theme-toggle__tooltip">Mode sombre actif</span>}
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              className="theme-toggle__icon theme-toggle__icon--sun"
              initial={{ opacity: 0, y: -10, rotate: 30 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 10, rotate: -30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <FiSun />
              {isHovered && <span className="theme-toggle__tooltip">Mode clair actif</span>}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <ThemeIndicator
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1 }}
          >
            {isDark ? 'Mode Nuit' : 'Mode Jour'}
          </ThemeIndicator>
        )}
      </AnimatePresence>
      <span className="theme-toggle-label">
        {isDark ? 'Sombre' : 'Clair'}
      </span>
    </ToggleContainer>
  );
};

// Styles avec styled-components
const ToggleContainer = styled(motion.button)`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  outline: none;
`;




const ThemeIndicator = styled(motion.span)`
  position: absolute;
  bottom: -25px;
  font-size: 11px;
  font-weight: 600;
  color: var(--gray-600);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  outline: none;
`;

export default ThemeToggle;