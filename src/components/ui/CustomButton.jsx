import React from 'react';

export const CustomButton = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => (
  <button 
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-colors
      ${variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
      ${className}`}
  >
    {children}
  </button>
);