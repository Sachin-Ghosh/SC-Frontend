import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomModal } from '../../components/ui/CustomModal';
import ScoreForm from '../../components/ScoreForm';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const ViewHeats = () => {
  const [subEvents, setSubEvents] = useState([]);
  const [selectedSubEvent, setSelectedSubEvent] = useState(null);
  const [heats, setHeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHeatModal, setShowHeatModal] = useState(false);
  const [selectedHeat, setSelectedHeat] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [heatLoading, setHeatLoading] = useState(false);

  useEffect(() => {
    const fetchSubEvents = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/faculty/my_subevents/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) throw new Error('Failed to fetch sub-events');
        const data = await response.json();
        setSubEvents(data);
        setLoading(false);
      } catch (err) {
        console.error(err.message)
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubEvents();
  }, []);

  const fetchHeats = async (subEventId) => {
    try {
      setHeatLoading(true);
      const accessToken = localStorage.getItem('access-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${subEventId}/get-heats/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch heats');
        } else {
          const textError = await response.text();
          console.error('Non-JSON error response:', textError);
          throw new Error('Server error occurred. Please try again later.');
        }
      }

      const data = await response.json();
      console.log(data);
      setHeats(data);
      setSelectedSubEvent(subEventId);
    } catch (err) {
      console.error('Error fetching heats:', err.message);
      setError(err.message);
    } finally {
      setHeatLoading(false);
    }
  };

  const handleViewHeats = (subEventId) => {
    setError(null); // Reset error state
    setHeatLoading(true);
    fetchHeats(subEventId);
    setShowHeatModal(true);
  };

  const handleHeatClick = (heat) => {
    setSelectedHeat(heat);
    setShowHeatModal(false);
    setShowScoreModal(true);
  };

  if (loading) {
    return (
      <>
        <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <img src='/royalty.png' className='fixed z-10 -bottom-10 left-0' alt="Event background" />
      <div className="min-h-screen pt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-2 relative sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl text-center sm:text-3xl font-bold text-amber-900 mb-4">View Heats</h1>
            <p className="text-gray-600 text-center">Select a sub-event to view its heats:</p>
          </div>

          <div className="grid grid-cols-1 relative z-20 w-full md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {subEvents.length === 0 ? (
              <motion.div 
                className="col-span-full text-center flex flex-col justify-center items-center w-full py-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-amber-900">No Assigned Events</h3>
                <p className="text-gray-600 mt-2">You currently have no events assigned to you.</p>
              </motion.div>
            ) : (
              subEvents.map((subEvent, index) => (
                <motion.div
                  key={subEvent.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{scale: 1.05}}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                  className="bg-white rounded place-self-center bg-opacity-40 shadow-md p-5 w-72 sm:w-full hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-amber-900">{subEvent.name}</h3>
                  <p className="text-gray-600 mt-2">Event: {subEvent.event.name}</p>
                  <p className="text-gray-600">Venue: {subEvent.venue}</p>
                  <p className="text-gray-600">Schedule: {new Date(subEvent.schedule).toLocaleDateString()}</p>
                  <Button className="bg-amber-800 hover:bg-amber-700 rounded text-white" onClick={() => handleViewHeats(subEvent.id)}>
                    View Heats
                  </Button>
                </motion.div>
              ))
            )}
          </div>

          <CustomModal 
            isOpen={showHeatModal} 
            onClose={() => setShowHeatModal(false)}
          >
            <ScrollArea className="p-6 w-full max-h-96">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Heats</h2>
              {heatLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-center">{error}</p>
                  <Button 
                    className="mt-4 bg-amber-800 hover:bg-amber-700 text-white mx-auto block" 
                    onClick={() => {
                      setError(null);
                      fetchHeats(selectedSubEvent);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : heats.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-center">No heats found for this sub-event.</p>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  {heats.map((heat) => (
                    <div 
                      key={heat.id} 
                      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleHeatClick(heat)}
                    >
                      <h3 className="text-xl font-semibold text-amber-900">{heat.heat_name}</h3>
                      <p className="text-gray-600">Stage: {heat.stage}</p>
                      <p className="text-gray-600">Round: {heat.round_number}</p>
                      <p className="text-gray-600">Status: {heat.status}</p>
                      <p className="text-gray-600">Participants: {heat.participant_count}/{heat.max_participants}</p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CustomModal>

          <CustomModal 
            isOpen={showScoreModal} 
            onClose={() => setShowScoreModal(false)}
          >
            {selectedHeat && (
              <ScoreForm 
                event={selectedHeat} 
                onClose={() => setShowScoreModal(false)} 
              />
            )}
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default ViewHeats;

