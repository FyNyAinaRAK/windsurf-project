import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FaArrowUp, FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaLinkedin } from 'react-icons/fa';
import './FloatingElements.css';

// Floating Action Button Component
export const FloatingActionButton = ({ 
  icon = <FaArrowUp />, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  tooltip,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const fabVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`floating-action-button fab-${variant} fab-${size} ${className}`}
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props}
        >
          {icon}
          
          {tooltip && (
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="fab-tooltip"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Scroll to Top Button
export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FloatingActionButton
      icon={<FaArrowUp />}
      onClick={scrollToTop}
      tooltip="Retour en haut"
      className="scroll-to-top"
    />
  );
};

// Contact Floating Menu
export const ContactFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaPhone />, label: 'Téléphone', href: 'tel:+261123456789', color: '#10b981' },
    { icon: <FaEnvelope />, label: 'Email', href: 'mailto:contact@nellfaa.mg', color: '#3b82f6' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://wa.me/261123456789', color: '#25d366' },
    { icon: <FaFacebook />, label: 'Facebook', href: 'https://facebook.com/nellfaa', color: '#1877f2' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/company/nellfaa', color: '#0a66c2' }
  ];

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <div className="contact-floating-menu">
      <motion.div
        className="contact-menu-container"
        variants={containerVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="contact-menu-item"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ '--item-color': item.color }}
            target={item.href.startsWith('http') ? '_blank' : '_self'}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
          >
            {item.icon}
            <span className="contact-item-tooltip">{item.label}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.button
        className="contact-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </motion.button>
    </div>
  );
};

// Floating Tooltip Component
export const FloatingTooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0.5,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
      x: position === 'left' ? 10 : position === 'right' ? -10 : 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <div 
      className={`floating-tooltip-container ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`floating-tooltip tooltip-${position}`}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {content}
            <div className="tooltip-arrow"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animated Background Elements
export const AnimatedBackgroundElements = ({ count = 6 }) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="animated-background-elements">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="background-element"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// Mouse Follower Component
export const MouseFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="mouse-follower"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring
      }}
    />
  );
};

// Floating Notification Badge
export const FloatingBadge = ({ 
  count, 
  max = 99, 
  showZero = false, 
  className = '',
  children 
}) => {
  const displayCount = count > max ? `${max}+` : count;
  const shouldShow = showZero || count > 0;

  return (
    <div className={`floating-badge-container ${className}`}>
      {children}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            className="floating-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30
            }}
          >
            {displayCount}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default {
  FloatingActionButton,
  ScrollToTopButton,
  ContactFloatingMenu,
  FloatingTooltip,
  AnimatedBackgroundElements,
  MouseFollower,
  FloatingBadge
};