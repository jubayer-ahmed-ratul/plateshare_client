import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin ${className}`}></div>
  );
};

export const LoadingSkeleton = ({ className = '', height = 'h-4' }) => (
  <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${height} ${className}`}></div>
);

export const CardSkeleton = () => (
  <div className="card-primary p-6 animate-pulse">
    <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="bg-neutral-200 dark:bg-neutral-700 rounded h-6 w-3/4"></div>
      <div className="bg-neutral-200 dark:bg-neutral-700 rounded h-4 w-full"></div>
      <div className="bg-neutral-200 dark:bg-neutral-700 rounded h-4 w-2/3"></div>
    </div>
  </div>
);

export default LoadingSpinner;