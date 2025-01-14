import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'

const EventCard = ({ event, subEventDetails, getStatusColor }) => {
    console.log(event.id)
    const navigate=useNavigate();
    // console.log('subevnt',subEventDetails[event.sub_event]?.id)
  return (
    <Card className="mb-4 bg-white bg-opacity-70 rounded-xl" >
      <CardHeader>
        <CardTitle className="text-lg">
        <p className='text-blue-500' onClick={()=>{navigate(`/registered-events/${event.id}`)}}> {event.registration_number}</p>
         
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Event Name:</strong> {subEventDetails[event.sub_event] ? (
            <>
             <Link 
                        to={`/${subEventDetails[event.sub_event]?.id}/details`} 
                        className="text-blue-600 hover:underline"
                      >
                        {subEventDetails[event.sub_event].name}
                      </Link>
          </>
          ) : 'Loading...'}</p>
        <p><strong>Team Name:</strong> {event.team_name?event.team_name:'N/A'}</p>
        <p><strong>Registration Date:</strong> {format(new Date(event.registration_date), 'dd MMM yyyy, hh:mm a')}</p>
        <p>
          <strong>Status:</strong> 
          <Badge className={`${getStatusColor(event.status)} text-white ml-2`}>
            {event.status}
          </Badge>
        </p>
        <p>
          <strong>Current Stage:</strong> 
          <Badge variant="outline" className="ml-2">
            {event.current_stage}
          </Badge>
        </p>
      </CardContent>
    </Card>
  )
}

export default EventCard

