import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaFootballBall } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import EventCard from '@/components/EventCard'

const RegisteredEvents = () => {
  const [events, setEvents] = useState([])
  const [subEventDetails, setSubEventDetails] = useState({})
  const accessToken = localStorage.getItem('access-token');
  const navigate = useNavigate()
  const isDesktop = useMediaQuery({ minWidth: 768 })

  const getRegisteredEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/my_registrations/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })

      const data = await response.json()
      setEvents(data)

      // Fetch subevent details for each registration
      data.forEach(event => {
        fetchSubEventName(event.sub_event)
      })
    } catch (error) {
      console.error('Error fetching registered events:', error)
    }
  }

  const fetchSubEventName = async (subEventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${subEventId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()
      setSubEventDetails(prev => ({
        ...prev,
        [subEventId]: { name: data.name, slug: data.slug }
      }))
    } catch (error) {
      console.error('Error fetching subevent details:', error)
    }
  }

  useEffect(() => {
    getRegisteredEvents()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500'
      case 'PENDING':
        return 'bg-yellow-500'
      case 'REJECTED':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <div className="relative z-20 top-32 lg:top-10 px-4 sm:px-10 flex flex-col justify-center items-center min-h-screen">
        <img src='/banner-1.png' alt='banner' className='fixed -z-10 -bottom-5 h-[30rem] -left-10' />
        <img src='/angel-2.png' alt='banner' className='sm:block hidden fixed -z-10 top-0 right-0' />

        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8 text-[#966742] fixed z-30 top-16 sm:top-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/frame.png' className='absolute top-5 sm:top-0 -z-10 w-full' alt="Decorative frame" />
          <h1 className='ysabeau-sc relative z-40 top-[6.5rem]'>Registered Events</h1>
        </motion.div>

        {events.length === 0 ? (
          <div className='flex justify-center items-center min-h-screen gap-5'>
            <FaFootballBall className='animate-bounce' size={30}/>
            <h1 className='relative z-50'>Loading....</h1>
          </div>
        ) : (
          <div className='fixed top-56 sm:top-32'>
            {isDesktop ? (
          <div className='w-full max-w-7xl  mt-40 max-h-96 sm:mt-48 mb-10 overflow-y-auto bg-white/80 rounded shadow-xl'>
              <Table>
                <TableHeader className="sticky top-0 backdrop-blur-sm bg-gray-400 bg-opacity-25">
                  <TableRow>
                    <TableHead>Registration No.</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Current Stage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium" onClick={() => { navigate(`/registered-events/${event.id}`) }}>{event.registration_number}</TableCell>
                      <TableCell>
                        {subEventDetails[event.sub_event] ? (
                          <Link 
                            to={`/registered-events/${subEventDetails[event.sub_event].slug}`} 
                            className="text-blue-600 hover:underline"
                          >
                            {subEventDetails[event.sub_event].name}
                          </Link>
                        ) : 'Loading...'}
                      </TableCell>
                      <TableCell>{event.team_name}</TableCell>
                      <TableCell>
                        {format(new Date(event.registration_date), 'dd MMM yyyy, hh:mm a')}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(event.status)} text-white`}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {event.current_stage}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            ) : (
              <div className=" fixed flex flex-col w-full left-0  justify-center items-center top-80 sm:top-32">
                <div className='max-h-screen overflow-y-auto'>

                {events.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    subEventDetails={subEventDetails} 
                    getStatusColor={getStatusColor} 
                  />
                ))}
                </div>
              </div>
            )}
          </div>
        
        )}
      </div>
    </>
  )
}

export default RegisteredEvents

