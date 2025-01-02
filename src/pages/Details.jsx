import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Award } from 'lucide-react';
import { Button } from "@/components/ui/button"

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
  const eventName = eventDetails[event];
console.log(event)
  if (!eventName) {
    return <div>Event not found</div>;
  }
  const navigate=useNavigate();

  return (
    <>
    <img src='/event-background.jpg' className='fixed object-cover h-full w-full z-0' alt="Cultural background" />
    <div className="min-h-screen bg-cover bg-center text-amber-900">
        <img src='/detail-banner.png' className='fixed -bottom-72 -right-20 w-[40rem] h-[40rem]'/>
      <div className="container mx-auto px-4 py-8 relative top-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-center ysabeau-sc"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eventName.name}
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={eventName.image} alt={event.name} className="w-full h-96 relative z-20 rounded-lg shadow-lg" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <Calendar className="mr-2" />
              <p>{eventName.date}</p>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" />
              <p>{eventName.time}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <p>{eventName.venue}</p>
            </div>
            <div className="flex items-center">
              <Users className="mr-2" />
              <p>{eventName.participants}</p>
            </div>
            <p className="text-lg">{eventName.description}</p>
            <Button className="mt-4 bg-amber-900 text-white hover:bg-amber-800" 
            onClick={()=>{navigate(`/${event}/registration`)}}
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
          <h2 className="text-2xl font-bold mb-4 ysabeau-sc">Rules of Engagement</h2>
          <ul className="list-disc list-inside space-y-2">
            {eventName.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center ysabeau-sc">
            <Award className="mr-2" />
            Prizes and Honors
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {eventName.prizes.map((prize, index) => (
              <li key={index}>{prize}</li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link to="/events/sports">
            <Button variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-100">
              Back to Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default EventDetails;

