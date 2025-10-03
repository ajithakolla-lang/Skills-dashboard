
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-lg shadow-lg p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="h-full">{children}</div>
    </div>
  );
};
