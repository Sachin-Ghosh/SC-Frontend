import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Award, UserPlus, DollarSign, FileCheck, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { FaFootballBall } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';

const RegistrationDetails = () => {
  const { event } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [subevent, setSubevent] = useState('');
  const accessToken = localStorage.getItem('access-token');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/${event}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setEventDetail(data);
        const response2 = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${data.sub_event}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data2 = await response2.json();
        setSubevent(data2.name);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getDetails();
  }, [event, accessToken]);

  if (!eventDetail || !subevent) {
    return (
      <>
        <img src='/event-background.jpg' className='fixed object-cover h-full w-full z-0' alt="Event background" />
        <div className='min-h-screen flex justify-center relative z-20 items-center gap-5'>
        <img src='/detail-banner.png' className='fixed -bottom-72 -right-20 w-[40rem] h-[40rem]'/>
          <FaFootballBall className="animate-bounce text-amber-600 text-4xl" />
          <span className="text-amber-900 text-2xl">Loading...</span>
        </div>
      </>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full z-0' alt="Event background" />
      <div className="min-h-screen bg-cover bg-center text-amber-900 relative z-10">
        <img src='/detail-banner.png' className='fixed -bottom-72 -right-20 w-[40rem] h-[40rem] opacity-30'/>
        <motion.div 
          className="container mx-auto px-4 py-8 relative top-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-center ysabeau-sc text-amber-800"
            variants={itemVariants}
          >
            {subevent} Registration Details
          </motion.h1>
          
          <motion.div className="bg-amber-50 bg-opacity-50 rounded shadow-lg p-6 mb-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Team Information
            </h2>
            <p><strong>Team Name:</strong> {eventDetail.team_name}</p>
            <p><strong>Registration Number:</strong> {eventDetail.registration_number}</p>
            <p><strong>Department:</strong> {eventDetail.department}</p>
            <p><strong>Year:</strong> {eventDetail.year}</p>
            <p><strong>Division:</strong> {eventDetail.division}</p>
          </motion.div>

          <motion.div className="bg-amber-50 bg-opacity-50 rounded shadow-lg p-6 mb-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <UserPlus className="mr-2" /> Team Members
            </h2>
            <div className="grid grid-cols-2 gap-10">

            {eventDetail.team_members.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="mb-4 p-4 bg-amber-100 rounded flex items-center space-x-4"
                variants={itemVariants}
              >
                <img src={member.profile_picture} alt={member.username} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold">{member.username}</h3>
                  <p>Department: {member.department}</p>
                  <p>Roll No: {member.roll_number}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>

          <motion.div className="bg-amber-50 bg-opacity-50 rounded shadow-lg p-6 mb-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" /> Registration Details
            </h2>
            <p><strong>Registration Date:</strong> {new Date(eventDetail.registration_date).toLocaleString()}</p>
            <p><strong>Status:</strong> 
              <Badge className={`ml-2 px-2 py-1 rounded ${eventDetail.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {eventDetail.status}
              </Badge>
            </p>
            <p><strong>Current Stage:</strong> {eventDetail.current_stage}</p>
            {/* <p><strong>Payment Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded ${eventDetail.payment_status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {eventDetail.payment_status ? 'Paid' : 'Unpaid'}
              </span>
            </p> */}
            {eventDetail.payment_amount && <p><strong>Payment Amount:</strong> ${eventDetail.payment_amount}</p>}
          </motion.div>

          {/* <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={eventDetail.has_submitted_files}
            >
              <FileCheck className="mr-2" />
              {eventDetail.has_submitted_files ? 'Files Submitted' : 'Submit Files'}
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <AlertTriangle className="mr-2" />
              Report Issue
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </>
  );
};

export default RegistrationDetails;

