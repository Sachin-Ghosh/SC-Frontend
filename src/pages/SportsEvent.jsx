import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = {
  boys: [
    {
      id: 1,
      name: 'Cricket',
      date: 'July 15, 2023',
      description: 'Experience the thrill of cricket in our grand tournament.',
      image: '/cricket.jpg',
      link: 'cricket'
    },
    {
      id: 2,
      name: 'Football',
      date: 'August 5, 2023',
      description: 'Show your skills in our exciting football championship.',
      image: '/football.jpg',
      link: 'football'
    },
    {
      id: 3,
      name: 'Kabaddi',
      date: 'September 2, 2023',
      description: 'Engage in the traditional sport of kabaddi in our tournament.',
      image: '/kabaddi.jpeg',
      link: 'kabaddi'
    },
    {
      id: 5,
      name: 'Badminton',
      date: 'October 1, 2023',
      description: 'Show your skills in our exciting badminton championship.',
      image: '/badminton.jpeg',
      link: 'badminton'
    },
  ],
  girls: [
    {
      id: 4,
      name: 'Volleyball',
      date: 'September 10, 2023',
      description: 'Compete in our thrilling volleyball tournament.',
      image: '/volleyball.jpg',
      link: 'volleyball'
    },
    {
      id: 5,
      name: 'Badminton',
      date: 'October 1, 2023',
      description: 'Show your skills in our exciting badminton championship.',
      image: '/badminton.jpeg',
      link: 'badminton'
    },
    {
      id: 6,
      name: 'Box Cricket',
      date: 'October 15, 2023',
      description: 'Compete in our fast-paced table tennis tournament.',
      image: '/box-cricket.jpg',
      link: 'table-tennis'
    },
  ]
};

const SportsEvent = () => {
  const [subevents, setSubevents]=useState([]);
  const accessToken=localStorage.getItem('access-token')
  const [selectedTab, setSelectedTab] = useState('boys');
  const navigate = useNavigate();

  const fetchSportsEvents = async (gender) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/?category=SPORTS&gender=${gender === 'boys' ? 'MALE' : 'FEMALE'}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setSubevents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchSportsEvents(selectedTab);
  }, [selectedTab]);

  

  const renderEvents = (eventList) => (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-3 sm:px-10 ">
      {eventList.map((event, index) => (
        <motion.div 
          key={event.id}
          className="rounded shadow-lg overflow-hidden relative  text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{scale: 1.05}}
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
  );

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <div className="relative z-20 top-32 lg:top-10 px-10 flex flex-col justify-center items-center min-h-screen">
        <img src='/banner-1.png' alt='banner' className='fixed -z-10 -bottom-5 h-[30rem] -left-10' />
        <img src='/angel-2.png' alt='banner' className='sm:block hidden fixed -z-10 top-0 right-0' />

        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8  text-[#966742] fixed z-30 top-16 sm:top-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/frame.png' className='absolute top-5 sm:top-0 -z-10 w-full '/>
          <h1 className='ysabeau-sc relative z-40 top-20'>Sports Events</h1>
        </motion.div>
        
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)} className="w-full sm:px-20 relative top-40 sm:top-28">
        <TabsList className="flex gap-2 items-center justify-center py-10">
          <TabsTrigger value="boys" className="text-lg ysabeau-sc data-[state=active]:bg-amber-900 data-[state=active]:text-white w-full lg:w-96 rounded-full text-white sm:text-black">Boys</TabsTrigger>
          <TabsTrigger value="girls" className="text-lg ysabeau-sc data-[state=active]:bg-amber-900 data-[state=active]:text-white w-full lg:w-96 rounded-full text-white sm:text-black ">Girls</TabsTrigger>
        </TabsList>
        <TabsContent value="boys" className="[data-state]:active:bg-brown-900">
          {renderEvents(subevents)}
        </TabsContent>
        <TabsContent value="girls">
          {renderEvents(subevents)}
        </TabsContent>
      </Tabs>
        {/* <div className='w-full sm:px-20 relative top-48'>

        {renderEvents(subevents)}
        </div> */}



      </div>
    </>
  );
};

export default SportsEvent;

