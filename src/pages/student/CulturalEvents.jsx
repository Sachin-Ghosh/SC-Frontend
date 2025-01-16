import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFootballBall } from 'react-icons/fa';
import { formatDateTime } from '@/utils/util';
import { ScrollArea } from '@/components/ui/scroll-area';

const events = [
  {
    id: 1,
    name: 'Dance Competition',
    date: 'August 10, 2023',
    description: 'Showcase your moves in our grand dance competition featuring various styles.',
    image: '/dancing.jpeg',
    link: 'dance-competition'
  },
  {
    id: 2,
    name: 'Music',
    date: 'September 15, 2023',
    description: 'Experience a night of melodies with performances from talented musicians.',
    image: '/singing.jpeg',
    link: 'music-festival'
  },
  {
    id: 3,
    name: 'Art Exhibition',
    date: 'October 5, 2023',
    description: 'Immerse yourself in creativity at our annual art exhibition featuring local artists.',
    image: '/poster.jpg',
    link: 'art-exhibition'
  },
  {
    id: 4,
    name: 'Group Singing',
    date: 'November 20, 2023',
    description: 'Enjoy a captivating theatrical performance by our talented drama group.',
    image: '/group-singing.jpg',
    link: 'theater-play'
  },
  {
    id: 5,
    name: 'JAM',
    date: 'December 1, 2023',
    description: 'Listen to powerful words and emotions at our engaging poetry slam event.',
    image: '/jamming.jpg',
    link: 'poetry-slam'
  },
];

const CulturalEvent = () => {
  const navigate = useNavigate();
  const [subevents, setSubevents]=useState([]);
  const accessToken=localStorage.getItem('access-token')

  const fetchCulturalEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/?category=CULTURAL`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setSubevents(data);
      // console.log(subevents)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchCulturalEvents();
  }, []);
  useEffect(() => {
    if(!accessToken){
      navigate('/')
    }
  
  }, [accessToken])
  // console.log(subevents[20].name);

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Cultural background" />
      <div className=" sticky z-20  lg:top-10 px-10 flex flex-col justify-center items-center min-h-screen">
        <img src='/gandhi.png' alt='Cultural banner' className='fixed -z-10  -bottom-20  h-[28rem] w-[32rem] sm:-left-40' />
        <img src='/tunes.png' alt='Cultural decor' className='fixed sm:block hidden -z-10 bottom-0 right-0' />
        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8 text-[#966742] relative z-30 -top-10 sm:top-0 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <img src='/frame.png' className='absolute top-5 sm:top-0 -z-10 w-full' /> */}
          <h1 className='ysabeau-sc relative z-40 top-24  text-nowrap'>Cultural Events</h1>
        </motion.div>
        {subevents.length===0 ? (
          <>
         <div className='flex justify-center items-center min-h-screen gap-5'>
          <FaFootballBall className='animate-bounce text-amber-700' size={30}/>
          <h1 className='relative z-50  ysabeau-sc'>Loading....</h1>
        </div>
          </>
        ):(
          <ScrollArea className="h-[calc(110vh-300px)] w-full sticky top-20 md:top-32">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full md:px- lg:px-28 gap-8 relative">
          {subevents.map((event, index) => (
            <motion.div 
              key={event.id}
              className="rounded shadow-lg overflow-hidden relative text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              <img src={event.images[0]?.image} alt={event.name} className="w-full h-full object-cover absolute z-20" />
              <div className="p-6 relative z-30 bg-amber-900 w-full h-full bg-opacity-50 hover:bg-opacity-60 transition-all duration-300">
                <h3 className="text-2xl mb-2 text-amber-100">{event.name}</h3>
                <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Date:{event?.schedule ? formatDateTime(event.schedule):''}</p>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Start:{event?.registration_start_time
 ? formatDateTime(event?.registration_start_time
 ):''}</p>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Deadline: {event.registration_deadline?formatDateTime(event.registration_deadline):''}</p>
            {event?.aura_points_winner && event?.aura_points_runner && (
            <>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Aura Points: 1st {event?.aura_points_winner}</p>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">2nd {event?.aura_points_runner}</p>
            </>
            )}
                <p className="text-amber-100 py-4">{event.short_description}</p>
                <div className="flex justify-between">
                  <motion.button
                    className="bg-[#8b4513] ysabeau-sc  text-xs sm:text-xl text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/${event.id}/details`)}
                  >
                    Learn More
                  </motion.button>
                  <motion.button
                    className="bg-[#8b4513] ysabeau-sc text-xs sm:text-xl text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/${event.id}/registration`)}
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </ScrollArea>
        )}
       
      </div>
    </>
  );
};

export default CulturalEvent;

