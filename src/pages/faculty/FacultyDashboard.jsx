import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TbMoodEmpty } from "react-icons/tb";
import { toast } from 'sonner';

const FacultyDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access-token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/faculty/my_subevents/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();

    if (user.user_type !== 'FACULTY') {
      toast.warning('No access');
      navigate('/events/sports');
    }
  }, []);

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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <img src='/raja.png' className='fixed -bottom-10 h-[25rem] w-64 sm:h-auto sm:w-80 left-0' alt="Event background" />
      <div className="relative z-20 space-y-6 p-4 md:p-8 mt-20">
        <motion.h2 
          className="text-xl sm:text-3xl text-center font-semibold text-amber-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Assigned Events
        </motion.h2>
        <div className='md:px-28'>
          {events.length === 0 ? (
            <motion.div 
              className="text-center flex items-center justify-center flex-col py-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TbMoodEmpty size={90} className='text-amber-900'/>
              <h3 className="text-md sm:text-2xl font-semibold text-amber-900 ">No Assigned Events</h3>
              <p className="text-gray-600 text-sm sm:text-md mt-2">You currently have no events assigned to you.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {events.map((event) => (
                <motion.div 
                  key={event.id} 
                  className="bg-white bg-opacity-60 backdrop-blur-sm border border-amber-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-amber-900"><Link to={`/${event.id}/details`}>{event.name}</Link></h3>
                    <p className="text-gray-600 mt-2">Main Event: {event.event.name}</p>
                    <p className="text-gray-600">Venue: {event.venue}</p>
                    <p className="text-gray-600">
                      Schedule: {format(new Date(event.schedule), 'PPp')}
                    </p>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2 flex-col">
                      <motion.button 
                        className="flex-1 bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                        onClick={() => navigate(`/score/${event.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Manage Scores
                      </motion.button>
                      <motion.button 
                        className="flex-1 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 transition-colors"
                        onClick={() => navigate(`/view-registrations/${event.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Registrations
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FacultyDashboard;

