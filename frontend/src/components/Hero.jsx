import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
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
      <div className="hero-bg-image">
        <motion.img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Fond de la section hero"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      
      <motion.div 
        className="hero-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-content" variants={item}>
          <motion.h1 className="hero-title">
            <span className="highlight">NELL'FAA GROUPE</span>
            <br />
            Votre partenaire de confiance
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={item}>
            Découvrez des opportunités uniques et concrétisez vos projets avec notre expertise.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={item}>
            <Link to="/contact" className="cta-button">
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