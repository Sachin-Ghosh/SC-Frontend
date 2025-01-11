import React from 'react';

export const CustomProgress = ({ value }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);