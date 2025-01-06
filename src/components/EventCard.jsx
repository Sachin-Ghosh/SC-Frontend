import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'

const EventCard = ({ event, subEventDetails, getStatusColor }) => {
    console.log(event.id)
    const navigate=useNavigate();
    
  return (
    <Card className="mb-4 bg-white bg-opacity-70" onClick={() => { navigate(`/registered-events/${event.id}`) }}>
      <CardHeader>
        <CardTitle className="text-lg">
          {subEventDetails[event.sub_event] ? (
            <Link 
              to={`/registered-events/${subEventDetails[event.sub_event].slug}`} 
              className="text-blue-600 hover:underline"
            >
              {subEventDetails[event.sub_event].name}
            </Link>
          ) : 'Loading...'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Registration No:</strong> {event.registration_number}</p>
        <p><strong>Team Name:</strong> {event.team_name}</p>
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

