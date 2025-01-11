import React, { useState } from 'react';
import { CustomButton } from './ui/CustomButton';

export const GenerateHeatForm = ({ onClose }) => {
  const [heatData, setHeatData] = useState({
    event: '',
    teamA: '',
    teamB: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating heat:', heatData);
    alert('Heat generated successfully!');
    onClose();
  };

  const events = ['Math Quiz', 'Science Fair', 'Debate Competition'];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Generate New Heat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event
          </label>
          <select
            value={heatData.event}
            onChange={(e) => setHeatData(prev => ({ ...prev, event: e.target.value }))}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>
        </div>
        
        {['teamA', 'teamB'].map((team) => (
          <div key={team}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {team === 'teamA' ? 'Team A' : 'Team B'}
            </label>
            <input
              type="text"
              value={heatData[team]}
              onChange={(e) => setHeatData(prev => ({ ...prev, [team]: e.target.value }))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={heatData.date}
            onChange={(e) => setHeatData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <CustomButton variant="secondary" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton type="submit">
            Generate Heat
          </CustomButton>
        </div>
      </form>
    </div>
  );
};