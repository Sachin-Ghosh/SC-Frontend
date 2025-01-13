"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaFootballBall } from 'react-icons/fa';
import { formatDateTime } from '@/utils/util';
import { format } from 'date-fns';

const SportsEvent = () => {
  const [subevents, setSubevents] = useState([]);
  const accessToken = localStorage.getItem('access-token')
  const [selectedTab, setSelectedTab] = useState('boys');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const fetchSportsEvents = async (gender) => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/?category=SPORTS&gender=${gender === 'boys' ? 'MALE' : 'FEMALE'}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setSubevents(data);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchSportsEvents(selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    if(!accessToken){
      navigate('/')
    }
  }, [accessToken])

  const renderEvents = (eventList) => (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-0 sm:px-10">
      {eventList.map((event, index) => (
        <motion.div 
          key={event.id}
          className="rounded shadow-lg overflow-hidden relative text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{scale: 1.05}}
          transition={{ delay: index * 0.3, duration: 0.5 }}
        >
          <img src={event.images[0]?.image} alt={event.name} className="w-full h-full object-cover absolute z-20" />
          <div className="p-2  relative z-30 bg-amber-900 h-full bg-opacity-50 hover:bg-opacity-60 transition-all w-full duration-300">
            <h3 className="text-lg sm:text-2xl mb-2 text-amber-100">{event.name}</h3>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Date:{event?.registration_schedule ? formatDateTime(event.schedule):''}</p>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Start:{event?.registration_start_time ? formatDateTime(event?.registration_start_time):''}</p>
            <p className="text-sm sm:text-md text-amber-100 ysabeau-sc">Deadline: {event.registration_deadline?formatDateTime(event.registration_deadline):''}</p>
            <p className="text-amber-100 py-4">{event.short_description}</p>
            <div className="flex gap-10 justify-between">
              <motion.button
                className="bg-[#8b4513] ysabeau-sc text-xs sm:text-xl  text-white sm:py-2 px-2 sm:px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
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
  );

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <div className="relative z-20 top-32 lg:top-10 px-10 flex flex-col justify-center items-center min-h-screen">
        <img src='/elephant.png' alt='banner' className='fixed sm:block hidden -z-10 -bottom-5 h-[30rem] -left-10' />
        <img src='/netaji.png' alt='banner' className='fixed -z-10 bottom-0 -right-20 sm:-right-32' />

        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8 text-[#966742] fixed z-30 top-16 sm:top-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/frame.png' className='absolute top-5 sm:top-0 -z-10 w-full' />
          <h1 className='ysabeau-sc relative z-40 top-20'>Sports Events</h1>
        </motion.div>
        {(subevents.length === 0) ? (
          <div className='flex flex-col sm:flex-row gap-6 w-full justify-center max-w-6xl relative top-20 sm:top-0'>
            <div className="flex w-full flex-row gap-2 bg-amber-800 bg-opacity-40 px-5 rounded py-5">
              <div className="skeleton h-32 w-full bg-amber-800 bg-opacity-60"></div>
              <div className='flex flex-col gap-2 w-full justify-center'>
                <div className="skeleton h-4 w-28 bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
              </div>
            </div>
            <div className="flex w-full gap-2 bg-amber-800 bg-opacity-40 px-5 rounded py-5">
              <div className="skeleton h-32 w-full bg-amber-800 bg-opacity-60"></div>
              <div className='flex flex-col gap-2 w-full justify-center'>
                <div className="skeleton h-4 w-28 bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
                <div className="skeleton h-4 w-full bg-amber-800 bg-opacity-60"></div>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="max-h-[40rem] w-full sticky top-40 sm:top-52">
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)} className="w-full sm:px-20 relative">
            <TabsList className="flex sm:fixed top-60 w-full gap-2 items-center right-0 left-0 justify-center py-10 px-1 sm:px-0">
              <TabsTrigger value="boys" className="text-lg ysabeau-sc data-[state=inactive]:border-2 data-[state=inactive]:border-amber-800  data-[state=active]:bg-amber-900 data-[state=active]:text-white w-full lg:w-96 rounded-full text-white sm:text-black">Boys</TabsTrigger>
              <TabsTrigger value="girls" className="text-lg ysabeau-sc data-[state=inactive]:border-2 data-[state=inactive]:border-amber-800  data-[state=active]:bg-amber-900 data-[state=active]:text-white w-full lg:w-96 rounded-full text-white sm:text-black">Girls</TabsTrigger>
            </TabsList>
            <TabsContent value="boys" className=" [data-state]:active:bg-brown-900">
              <ScrollArea className="h-[calc(100vh-300px)] w-full ">
                {renderEvents(subevents)}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="girls">
              <ScrollArea className="fixed h-[calc(100vh-300px)] w-full ">
                {renderEvents(subevents)}
              </ScrollArea>
            </TabsContent>
          </Tabs>
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default SportsEvent;

