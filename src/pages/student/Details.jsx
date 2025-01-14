import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Award, UserPlus, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { FaFootballBall } from 'react-icons/fa';
import DOMPurify from 'dompurify';


const eventDetails = {
  cricket: {
    name: "The Cricket Tournament",
    date: "July 15, 2023",
    time: "10:00 AM - 4:00 PM",
    venue: "Royal Arena",
    description: "Experience the thrill of medieval combat in our grand jousting tournament. Witness skilled knights clash in a display of chivalry and valor, as they compete for honor and glory in the royal arena.",
    participants: "16 knights from across the realm",
    rules: [
      "All participants must wear period-appropriate armor",
      "Lances must be blunted for safety",
      "Victory is achieved by unseating the opponent or breaking the most lances",
      "Conduct unbecoming of a knight will result in disqualification"
    ],
    prizes: [
      "1st Place: Golden Chalice and 1000 gold coins",
      "2nd Place: Silver Medallion and 500 gold coins",
      "3rd Place: Bronze Shield and 250 gold coins"
    ],
    image: "/cricket.jpg"
  },
  football: {
    name: "The Football Tournament",
    date: "July 15, 2023",
    time: "10:00 AM - 4:00 PM",
    venue: "Royal Arena",
    description: "Experience the thrill of medieval combat in our grand jousting tournament. Witness skilled knights clash in a display of chivalry and valor, as they compete for honor and glory in the royal arena.",
    participants: "11 knights from across the realm",
    rules: [
      "All participants must wear period-appropriate armor",
      "Lances must be blunted for safety",
      "Victory is achieved by unseating the opponent or breaking the most lances",
      "Conduct unbecoming of a knight will result in disqualification"
    ],
    prizes: [
      "1st Place: Golden Chalice and 1000 gold coins",
      "2nd Place: Silver Medallion and 500 gold coins",
      "3rd Place: Bronze Shield and 250 gold coins"
    ],
    image: "/football.jpg"
  },
  Dancing: {
    name: "The Football Tournament",
    date: "July 15, 2023",
    time: "10:00 AM - 4:00 PM",
    venue: "Royal Arena",
    description: "Experience the thrill of medieval combat in our grand jousting tournament. Witness skilled knights clash in a display of chivalry and valor, as they compete for honor and glory in the royal arena.",
    participants: "Solo",
    rules: [
      "All participants must wear period-appropriate armor",
      "Lances must be blunted for safety",
      "Victory is achieved by unseating the opponent or breaking the most lances",
      "Conduct unbecoming of a knight will result in disqualification"
    ],
    prizes: [
      "1st Place: Golden Chalice and 1000 gold coins",
      "2nd Place: Silver Medallion and 500 gold coins",
      "3rd Place: Bronze Shield and 250 gold coins"
    ],
    image: "/football.jpg"
  },
};

const EventDetails = () => {
  const { event } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access-token');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${event}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setEventDetail(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getDetails();
  }, [event, accessToken]);
  // console.log(eventDetail.images[0]?.image)

  useEffect(() => {
    if(!accessToken){
      navigate('/')
    }
  }, [accessToken])

  if (!eventDetail) {
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



  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full z-0' alt="Event background" />
      <div className="min-h-screen bg-cover bg-center text-amber-900">
        <img src='/maharaj.png' className='fixed -bottom-60 -right-20 w-[40rem] h-[40rem]'/>
        <div className="container mx-auto px-4 py-8 relative top-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-center ysabeau-sc"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {eventDetail.name}
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src={eventDetail.images[0]?.image} alt={eventDetail.name} className="w-full h-96 relative z-20 rounded-lg shadow-lg object-cover" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <p>{new Date(eventDetail.schedule).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <p>{new Date(eventDetail.schedule).toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <p>{eventDetail.venue}</p>
              </div>
              <div className="flex items-center">
                <Users className="mr-2" />
                <p>{eventDetail.participation_type}</p>
              </div>
              <div className="flex items-center">
                <UserPlus className="mr-2" />
                <p>Max Participants: {eventDetail.max_participants}</p>
              </div>
              {/* <div className="flex items-center">
                <DollarSign className="mr-2" />
                <p>Registration Fee: ₹{eventDetail.registration_fee}</p>
              </div> */}
              <p className="text-lg">{DOMPurify.sanitize(eventDetail.description, { ALLOWED_TAGS: [] })}</p>
              {/* <p className="text-lg">{eventDetail.description}</p> */}
              <Button 
                className="mt-4 bg-amber-900 text-white hover:bg-amber-800" 
                onClick={() => navigate(`/${eventDetail.id}/registration`)}
              >
                Register Now
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4 ysabeau-sc">Rules</h2>
            <p className="">{DOMPurify.sanitize(eventDetail.rules, { ALLOWED_TAGS: [] })}</p>

            {/* <p>{eventDetail.rules}</p> */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center ysabeau-sc">
              <Award className="mr-2" />
              Prizes
            </h2>
            <p>{eventDetail.prize_pool_description}</p>
            {/* <p className="mt-2">Total Prize Pool: ₹{eventDetail.prize_pool}</p> */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center"
          >
            {/* <Link to="/events/sports">
              <Button variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-100">
                Back to Events
              </Button>
            </Link> */}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
