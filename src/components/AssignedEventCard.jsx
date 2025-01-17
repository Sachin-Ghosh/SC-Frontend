import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useEventStore } from './store/eventStore'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

export default function AssignedEventCard({ event }) {
  const navigate = useNavigate();
  const { setSubEventId, fetchHeats } = useEventStore();

  const handleCheckHeats = async () => {
    setSubEventId(event.id);
    navigate(`/heats/${event.id}`);
  };
  // //console.log('event',event)

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white border-gray-200 rounded">
      <CardHeader className="p-0">
        {event.images && event.images.length > 0 && (
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={event.images[0].image}
              alt={event.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <CardTitle className="text-xl font-bold text-white mb-2">
                {event.name}
              </CardTitle>
              <p className="text-sm text-white/90">
                {event.short_description}
              </p>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            {event.category}
          </Badge>
          <Badge variant="outline" className="border-primary/20">
            {event.participation_type}
          </Badge>
          <Badge variant="secondary" className="bg-secondary/10">
            {event.current_stage}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <p className="text-sm">{event.venue}</p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <p className="text-sm">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <p className="text-sm">
              {event.reporting_time}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50/50 p-6 border-t">
        <div className="w-full space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">Event Coordinators</p>
            <div className="flex flex-wrap items-center gap-3">
              {event.sub_heads.map((subHead) => (
                <div key={subHead.id} className="flex items-center gap-2 bg-white p-1 pl-1 pr-3 rounded-full shadow-sm">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={subHead.profile_picture} alt={subHead.full_name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {subHead.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{subHead.full_name}</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleCheckHeats}
            className="w-full rounded bg-green-600 hover:bg-green-700 text-white"
          >
            Check Heats
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}