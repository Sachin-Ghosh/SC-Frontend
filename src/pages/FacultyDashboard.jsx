import React, { useState } from 'react';
import ScoreForm from '../components/ScoreForm';
import Modal from '../components/ScoreModal';

// Mock data for events
const mockEvents = [
  { id: 1, name: "Math Quiz", date: "2023-06-15" },
  { id: 2, name: "Science Fair", date: "2023-06-20" },
  { id: 3, name: "Debate Competition", date: "2023-06-25" },
];

const FacultyDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="space-y-6 p-4 md:p-0">
      <h2 className="text-2xl font-semibold text-gray-900">Your Events</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.name}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">Date: {event.date}</p>
              <button 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedEvent(event)}
              >
                Manage Scores
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <ScoreForm 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </Modal>
    </div>
  );
};

export default FacultyDashboard;