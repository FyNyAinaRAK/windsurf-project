import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Hook for scroll-triggered animations
export const useScrollAnimation = (offset = 100) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `-${offset}px` 
  });

  return [ref, isInView];
};

// Parallax wrapper component
export const ParallaxWrapper = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const distance = 100 * speed;
  
  // Create transforms based on direction
  const transformUp = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const transformDown = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const transformLeft = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const transformRight = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return transformUp;
      case 'down':
        return transformDown;
      case 'left':
        return transformLeft;
      case 'right':
        return transformRight;
      default:
        return transformUp;
    }
  };

  const transform = getTransform();

  const style = direction === 'left' || direction === 'right' 
    ? { x: transform }
    : { y: transform };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Fade in on scroll component
export const FadeInOnScroll = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  distance = 50,
  className = '',
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation();

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '',
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  direction = 'up',
  distance = 30,
  className = '',
  ...props 
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          show: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          show: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          show: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          show: { opacity: 1, x: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          show: { opacity: 1, y: 0 }
        };
    }
  };

  const item = getVariants();

  return (
    <motion.div
      variants={item}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale on scroll component
export const ScaleOnScroll = ({ 
  children, 
  scaleFrom = 0.8,
  scaleTo = 1,
  className = '',
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: scaleFrom }}
      animate={isInView ? { opacity: 1, scale: scaleTo } : { opacity: 0, scale: scaleFrom }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Rotate on scroll component
export const RotateOnScroll = ({ 
  children, 
  rotateFrom = -10,
  rotateTo = 0,
  className = '',
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: rotateFrom }}
      animate={isInView ? { opacity: 1, rotate: rotateTo } : { opacity: 0, rotate: rotateFrom }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};