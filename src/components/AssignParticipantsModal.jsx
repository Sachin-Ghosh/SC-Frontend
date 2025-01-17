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
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function AddParticipantsModal({ heatId, subEventId, stage }) {
  const [allParticipants, setAllParticipants] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('access-token');
  const navigate = useNavigate()

  const fetchAllParticipants = async () => {
    setIsLoading(true)
    try {
      // First, fetch the heat data to get currently assigned participants
      const heatResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/events/heats/${heatId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const heatData = await heatResponse.json();
      
      // Create a Set of registration IDs of participants already in the heat
      const assignedRegistrationIds = new Set(heatData.participants.map(p => p.registration));

      // Then fetch available participants
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${subEventId}/get-available-participants/?stage=${stage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const availableParticipants = await response.json();
      
      // Filter out participants who are already in the heat
      const filteredParticipants = availableParticipants.filter(
        participant => !assignedRegistrationIds.has(participant.id)
      );

      setAllParticipants(availableParticipants);
      setParticipants(filteredParticipants);
      
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error("Failed to fetch participants");
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

      if (!response.ok) {
        toast.error('Failed to assign participants');
      } else {
        toast.success("Participants assigned successfully");
        setSelectedParticipants([]);
        fetchAllParticipants(); // Refresh the participants list
      }
    } catch (error) {
      toast.error("Error assigning participants");
    }
  }

  const toggleParticipant = (participantId) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(p => p !== participantId)
        : [...prev, participantId]
    )
  }

  useEffect(() => {
    fetchAllParticipants();
  }, [])

  return (
    <>
      <Dialog className="">
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full mt-4 bg-amber-100 hover:bg-amber-200 border-amber-900 text-amber-900"
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
            ) : participants.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p>No available participants to add</p>
              </div>
            ) : (
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center space-x-4 p-2 rounded hover:bg-gray-100"
                  >
                    <Checkbox
                      checked={selectedParticipants.includes(participant.id)}
                      onCheckedChange={() => toggleParticipant(participant.id)}
                    />
                    <Avatar className="bg-white">
                      <AvatarImage 
                        src={participant.profile_picture} 
                        alt={participant.team_members[0].full_name || participant.team_name} 
                      />
                      <AvatarFallback>
                        {participant.team_members[0].full_name ? participant.team_members[0].full_name.charAt(0) : participant.team_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{participant.team_name ? participant.team_name : participant.team_members[0].full_name}</p>
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

