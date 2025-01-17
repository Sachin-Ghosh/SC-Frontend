'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'



export function AddParticipantsModal({ heatId, subEventId, stage }) {
  const [participants, setParticipants] = useState([])
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  // const [open,setOpen]=useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('access-token');
  const navigate=useNavigate()

  // //console.log(heatId,subEventId,stage)
//   const { toast } = useToast()

  const fetchParticipants = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${subEventId}/get-available-participants/?stage=${stage}`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        }
      })
      const data = await response.json();
      //console.log(data)
      setParticipants(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch participants",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignParticipants = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${subEventId}/assign-participants-to-heat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          heat_id: heatId,
          registration_ids: selectedParticipants,
        }),
      })

      //console.log(await response.json())

      if (!response.ok) {
        toast('Failed to assign participants')
      }

      toast.success("Assigned Success fully")
      
      // setOpen(false)
      setSelectedParticipants([])
    } catch (error) {
      // toast.error("Error")
      //console.log(error.message)
    }
  }

  const toggleParticipant = (registrationNumber) => {
    setSelectedParticipants(prev => 
      prev.includes(registrationNumber)
        ? prev.filter(p => p !== registrationNumber)
        : [...prev, registrationNumber]
    )
  }
  useEffect(() => {
fetchParticipants();
  }, [])
  

  return (
    <>
    <Dialog className="">
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full mt-4 bg-amber-100 hover:bg-amber-200 border-amber-900 text-amber-900"
        //   onClick={fetchParticipants}
        >
          Add Participants
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-white bg-opacity-90 bg-[url('/vintage.jpg')] bg-center bg-cover">
        <DialogHeader>
          <DialogTitle>Add Participants to Heat</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading participants...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {participants.map((participant) => (
                <div
                  key={participant.registration_number}
                  className="flex items-center space-x-4 p-2 rounded hover:bg-gray-100"
                >
                  <Checkbox
                    checked={selectedParticipants.includes(participant.id)}
                    onCheckedChange={() => toggleParticipant(participant.id)}
                  />
                  <Avatar>
                    <AvatarImage 
                      src={participant.team_members[0]?.profile_picture} 
                      alt={participant.team_members[0]?.full_name} 
                    />
                    <AvatarFallback>
                      {participant.team_members[0]?.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{participant.team_members[0]?.full_name}</p>
                    <p className="text-sm text-gray-500">
                      {participant.registration_number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="flex justify-end">
          <Button
            onClick={handleAssignParticipants}
            disabled={selectedParticipants.length === 0}
            className="bg-amber-800 hover:bg-amber-900 text-white"
          >
            Assign Selected Participants
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

