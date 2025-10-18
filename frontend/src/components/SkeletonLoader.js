import React from 'react';
import { motion } from 'framer-motion';
import './SkeletonLoader.css';

// Base Skeleton Component
export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  variant = 'pulse',
  ...props 
}) => {
  const skeletonVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    wave: {
      backgroundPosition: ['-200px 0', '200px 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    shimmer: {
      x: ['-100%', '100%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`skeleton skeleton-${variant} ${className}`}
      style={{
        width,
        height,
        borderRadius
      }}
      variants={skeletonVariants}
      animate={variant}
      {...props}
    />
  );
};

// Text Skeleton
export const SkeletonText = ({ 
  lines = 3, 
  className = '',
  lastLineWidth = '60%',
  lineHeight = '16px',
  spacing = '8px'
}) => {
  return (
    <div className={`skeleton-text ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          className="skeleton-text-line"
          style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
        />
      ))}
    </div>
  );
};

// Avatar Skeleton
export const SkeletonAvatar = ({ 
  size = '40px', 
  shape = 'circle',
  className = '' 
}) => {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={shape === 'circle' ? '50%' : '8px'}
      className={`skeleton-avatar skeleton-avatar-${shape} ${className}`}
    />
  );
};

// Card Skeleton
export const SkeletonCard = ({ 
  hasImage = true,
  hasAvatar = false,
  textLines = 3,
  className = '',
  imageHeight = '200px'
}) => {
  return (
    <div className={`skeleton-card ${className}`}>
      {hasImage && (
        <Skeleton
          height={imageHeight}
          borderRadius="8px 8px 0 0"
          className="skeleton-card-image"
        />
      )}
      
      <div className="skeleton-card-content">
        {hasAvatar && (
          <div className="skeleton-card-header">
            <SkeletonAvatar size="40px" />
            <div className="skeleton-card-header-text">
              <Skeleton width="120px" height="16px" />
              <Skeleton width="80px" height="12px" />
            </div>
          </div>
        )}
        
        <div className="skeleton-card-body">
          <Skeleton width="80%" height="20px" className="skeleton-card-title" />
          <SkeletonText lines={textLines} />
        </div>
        
        <div className="skeleton-card-actions">
          <Skeleton width="80px" height="32px" borderRadius="16px" />
          <Skeleton width="100px" height="32px" borderRadius="16px" />
        </div>
      </div>
    </div>
  );
};

// List Item Skeleton
export const SkeletonListItem = ({ 
  hasAvatar = true,
  hasSecondaryText = true,
  className = '' 
}) => {
  return (
    <div className={`skeleton-list-item ${className}`}>
      {hasAvatar && <SkeletonAvatar size="48px" />}
      
      <div className="skeleton-list-item-content">
        <Skeleton width="60%" height="16px" />
        {hasSecondaryText && (
          <Skeleton width="40%" height="12px" />
        )}
      </div>
      
      <Skeleton width="24px" height="24px" borderRadius="4px" />
    </div>
  );
};

// Table Skeleton
export const SkeletonTable = ({ 
  rows = 5,
  columns = 4,
  hasHeader = true,
  className = '' 
}) => {
  return (
    <div className={`skeleton-table ${className}`}>
      {hasHeader && (
        <div className="skeleton-table-header">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={`header-${index}`}
              width="80%"
              height="16px"
              className="skeleton-table-header-cell"
            />
          ))}
        </div>
      )}
      
      <div className="skeleton-table-body">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="skeleton-table-row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                width={colIndex === 0 ? '60%' : '80%'}
                height="14px"
                className="skeleton-table-cell"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Button Skeleton
export const SkeletonButton = ({ 
  width = '120px',
  height = '40px',
  variant = 'primary',
  className = '' 
}) => {
  return (
    <Skeleton
      width={width}
      height={height}
      borderRadius="8px"
      className={`skeleton-button skeleton-button-${variant} ${className}`}
    />
  );
};

// Image Skeleton
export const SkeletonImage = ({ 
  width = '100%',
  height = '200px',
  aspectRatio,
  className = '' 
}) => {
  const style = aspectRatio 
    ? { width, aspectRatio, height: 'auto' }
    : { width, height };

  return (
    <Skeleton
      {...style}
      borderRadius="8px"
      className={`skeleton-image ${className}`}
    />
  );
};

// Feed Skeleton (for social media-like feeds)
export const SkeletonFeed = ({ 
  items = 3,
  className = '' 
}) => {
  return (
    <div className={`skeleton-feed ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-feed-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="skeleton-feed-header">
            <SkeletonAvatar size="48px" />
            <div className="skeleton-feed-header-text">
              <Skeleton width="140px" height="16px" />
              <Skeleton width="80px" height="12px" />
            </div>
          </div>
          
          <div className="skeleton-feed-content">
            <SkeletonText lines={2} />
            <SkeletonImage height="250px" />
          </div>
          
          <div className="skeleton-feed-actions">
            <Skeleton width="60px" height="32px" borderRadius="16px" />
            <Skeleton width="80px" height="32px" borderRadius="16px" />
            <Skeleton width="70px" height="32px" borderRadius="16px" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Dashboard Skeleton
export const SkeletonDashboard = ({ className = '' }) => {
  return (
    <div className={`skeleton-dashboard ${className}`}>
      {/* Header */}
      <div className="skeleton-dashboard-header">
        <Skeleton width="200px" height="32px" />
        <div className="skeleton-dashboard-header-actions">
          <SkeletonButton width="100px" height="36px" />
          <SkeletonButton width="120px" height="36px" />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="skeleton-dashboard-stats">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="skeleton-stat-card">
            <Skeleton width="60px" height="60px" borderRadius="12px" />
            <div className="skeleton-stat-content">
              <Skeleton width="80px" height="24px" />
              <Skeleton width="60px" height="14px" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="skeleton-dashboard-main">
        <div className="skeleton-dashboard-chart">
          <Skeleton width="150px" height="20px" />
          <Skeleton width="100%" height="300px" borderRadius="12px" />
        </div>
        
        <div className="skeleton-dashboard-sidebar">
          <Skeleton width="120px" height="20px" />
          <SkeletonListItem hasAvatar={false} />
          <SkeletonListItem hasAvatar={false} />
          <SkeletonListItem hasAvatar={false} />
        </div>
      </div>
    </div>
  );
};

// Loading Container with Stagger Animation
export const SkeletonContainer = ({ 
  children, 
  stagger = 0.1,
  className = '' 
}) => {
  return (
    <motion.div
      className={`skeleton-container ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Skeleton;