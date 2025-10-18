import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  // Scroll-based animations
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  // Smooth spring animations
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothTitleScale = useSpring(titleScale, { stiffness: 100, damping: 30 });
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 100, damping: 30 });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="hero">
      <motion.div 
        className="hero-bg-image"
        style={{ y: smoothBackgroundY }}
      >
        <motion.img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Fond de la section hero"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>
      
      <motion.div 
        className="hero-container"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: smoothContentY }}
      >
        <motion.div className="hero-content floating" variants={item}>
          <motion.h1 
            className="hero-title"
            style={{ 
              scale: smoothTitleScale, 
              opacity: smoothTitleOpacity 
            }}
          >
            <span className="highlight">NELL'FAA GROUPE</span>
            <br />
            Votre partenaire de confiance
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={item}>
            Découvrez des opportunités uniques et concrétisez vos projets avec notre expertise.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={item}>
            <Link to="/contact" className="cta-button magnetic-btn ripple glow-hover">
              Nous contacter
              <FiArrowRight style={{ marginLeft: '10px' }} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;