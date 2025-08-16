import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  gradient = false,
  onClick 
}) => {
  const baseClasses = `rounded-lg shadow-sm border border-gray-200 ${
    gradient 
      ? 'bg-gradient-to-br from-white to-gray-50' 
      : 'bg-white'
  } ${onClick ? 'cursor-pointer' : ''}`;

  const Component = hover ? motion.div : 'div';

  const motionProps = hover ? {
    whileHover: { y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};