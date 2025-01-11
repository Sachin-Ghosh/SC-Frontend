import React from 'react';

export const HeatCard = ({ heat }) => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold">{heat.event}</h3>
    <p className="text-gray-600">Date: {heat.date}</p>
    <div className="text-gray-800 font-medium">
      {heat.teamA} vs {heat.teamB}
    </div>
  </div>
);