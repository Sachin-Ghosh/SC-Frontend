import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Cultural background" />
      <div className="relative z-20 top-20 px-10 flex flex-col justify-center items-center min-h-screen">
        <img src='/angel.png' alt='Cultural banner' className='fixed -z-10  bottom-0 -right-32 sm:-left-10' />
        <img src='/tunes.png' alt='Cultural decor' className='fixed sm:block hidden -z-10 bottom-0 right-0' />
        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8 text-[#966742] relative top-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/frame.png' className='absolute -top-[4.5rem] sm:-top-24 -z-10 w-full '/>
          <h1 className='ysabeau-sc relative z-40'>Cultural Events</h1>
        </motion.div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8  sm:px-32 relative top-36">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className="rounded shadow-lg overflow-hidden relative text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
            >
              <img src={event.image} alt={event.name} className="w-full h-full object-cover absolute z-20" />
              <div className="p-6 relative z-30 bg-amber-900 bg-opacity-50 hover:bg-opacity-60 transition-all duration-300">
                <h3 className="text-2xl mb-2 text-amber-100">{event.name}</h3>
                <p className="text-amber-100 ysabeau-sc">Date: {event.date}</p>
                <p className="text-amber-100 py-4">{event.description}</p>
                <div className="flex justify-between">
                  <motion.button
                    className="bg-[#8b4513] ysabeau-sc text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/${event.link}/details`)}
                  >
                    Learn More
                  </motion.button>
                  <motion.button
                    className="bg-[#8b4513] ysabeau-sc text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/${event.link}/registration`)}
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CulturalEvent;

