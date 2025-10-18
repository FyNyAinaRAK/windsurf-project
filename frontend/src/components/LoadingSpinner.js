import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', variant = 'primary', text = 'Chargement...' }) => {
  const sizeClass = `spinner-${size}`;
  const variantClass = `spinner-${variant}`;

  return (
    <div className="loading-container">
      <div className={`modern-spinner ${sizeClass} ${variantClass}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-core"></div>
      </div>
      {text && (
        <div className="loading-text">
          {text}
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    >
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <SkeletonLoader height="200px" borderRadius="12px" className="skeleton-image" />
      <div className="skeleton-content">
        <SkeletonLoader height="24px" width="80%" className="skeleton-title" />
        <SkeletonLoader height="16px" width="60%" className="skeleton-subtitle" />
        <div className="skeleton-lines">
          <SkeletonLoader height="14px" width="100%" />
          <SkeletonLoader height="14px" width="90%" />
          <SkeletonLoader height="14px" width="70%" />
        </div>
        <SkeletonLoader height="32px" width="120px" borderRadius="20px" className="skeleton-button" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
