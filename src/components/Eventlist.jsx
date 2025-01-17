import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { useEventStore } from './store/eventStore'; // Changed to named import
import AssignedEventCard from './AssignedEventCard';

const getEvents = async () => {
  const token = localStorage.getItem('access-token');
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const baseUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${baseUrl}/api/events/sub-events/my_events/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setSubEventId = useEventStore((state) => state.setSubEventId);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        //console.log('Fetched events:', data.results);
        setEvents(data.results || []);
        
        // Store the sub-event ID if events exist
        if (data.results && data.results.length > 0) {
          setSubEventId(data.results[0].id);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setSubEventId]);

  if (loading) {
    return (
      <div className='flex flex-col sm:flex-row gap-6 px-2 lg:px-28 w-full justify-center items-center max-w-6xl sm:max-w-full relative sm:top-0'>
            <div className="flex w-full flex-col gap-2 bg-amber-800 bg-opacity-40 px-5 rounded py-5">
              <div className="skeleton h-32 w-full bg-amber-800 bg-opacity-60"></div>
              <div className='flex flex-col gap-2 w-full justify-center'>
                <div className="skeleton h-4 w-28 bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
              </div>
            </div>
            <div className="flex w-full flex-col  gap-2 bg-amber-800 bg-opacity-40 px-5 rounded py-5">
              <div className="skeleton h-32 w-full bg-amber-800 bg-opacity-60"></div>
              <div className='flex flex-col gap-2 w-full justify-center'>
                <div className="skeleton h-4 w-28 bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
              </div>
            </div>
            <div className="sm:flex w-full flex-col hidden   gap-2 bg-amber-800 bg-opacity-40 px-5 rounded py-5">
              <div className="skeleton h-32 w-full bg-amber-800 bg-opacity-60"></div>
              <div className='flex flex-col gap-2 w-full justify-center'>
                <div className="skeleton h-4 w-28 bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
              </div>
            </div>
          </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-500">No events assigned.</p>
    );
  }

  return (
    <div className="grid gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-24">
      {events.map((event, index) => (
        <AssignedEventCard event={event} />
      ))}
    </div>
  );
};

export default EventList;