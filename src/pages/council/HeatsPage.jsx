import React, { useEffect, useState } from 'react';
import { useEventStore } from '@/components/store/eventStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import CreateHeatModal from '@/components/CreateHeatModal';
import UpdateHeatModal from '@/components/UpdateHeatModal';
import { Toaster } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { GiStagHead } from 'react-icons/gi';
import { AddParticipantsModal } from '@/components/AssignParticipantsModal';
import { useParams } from 'react-router-dom';
// import { AddParticipantsModal } from '@/components/AddParticipantsModal';

const HeatsPage = () => {
  const params=useParams();
  //console.log(params)
  const { heats, isLoading, error, fetchHeats } = useEventStore();
  const [filters, setFilters] = useState({
    status: 'ALL',
    stage: 'ALL',
    round: 'ALL'
  });

  useEffect(() => {
    fetchHeats();
    return () => {
      useEventStore.getState().clearHeats();
    };
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const activeFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== 'ALL')
    );
    fetchHeats(activeFilters);
  };

  if (isLoading) {
    return (
      <>
        <img src='/vintage-2.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <div className="flex relative justify-center items-center min-h-screen">
          <p className="text-gray-500">Loading heats...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <img src='/vintage-2.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <div className="text-center text-red-500 p-4">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <img src='/vintage-2.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <img src='/bhagat.png' className='fixed object-cover bottom-0 right-0' alt="Event background" />

      <div className="container relative z-20 mx-auto p-6 space-y-6 mt-10 lg:px-24">
        <div className="flex justify-between items-center relative z-20">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Event Heats</h1>
          <CreateHeatModal />
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-[url('/vintage-2.jpg')] bg-center bg-cover rounded">
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.stage}
            onValueChange={(value) => handleFilterChange('stage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Stage" />
            </SelectTrigger>
            <SelectContent className="bg-[url('/vintage-2.jpg')] bg-center bg-cover rounded">
              <SelectItem value="ALL">All Stages</SelectItem>
              <SelectItem value="PRELIMS">Prelims</SelectItem>
              <SelectItem value="QUARTERS">Quarters</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.round}
            onValueChange={(value) => handleFilterChange('round', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Round" />
            </SelectTrigger>
            <SelectContent className="bg-[url('/vintage-2.jpg')] bg-center bg-cover rounded">
              <SelectItem value="ALL">All Rounds</SelectItem>
              <SelectItem value="1">Round 1</SelectItem>
              <SelectItem value="2">Round 2</SelectItem>
              <SelectItem value="3">Round 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Heats List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {heats.map((heat) => (
            <Card key={heat.id} className="hover:shadow-lg bg-white rounded-xl bg-opacity-70 transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className='text-amber-800'>{heat.heat_name}</span>
                  <Badge className="text-sm border-2 border-amber-900 text-amber-900">
                    {heat.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Stage</p>
                    <p className="font-medium">{heat.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Round</p>
                    <p className="font-medium">{heat.round_number}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Venue</p>
                    <p className="font-medium">{heat.venue}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Max. Participants</p>
                    <p className="font-medium">{heat.max_participants}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-500 text-sm">Schedule</p>
                  <p className="font-medium">
                    {format(new Date(heat.schedule), 'PPp')}
                  </p>
                </div>
                <UpdateHeatModal heat={heat} />
                <AddParticipantsModal heatId={heat.id} subEventId={params.id} stage={heat.stage}/>
              </CardContent>
            </Card>
          ))}
        </div>

        {heats.length === 0 && (
          <p className="text-center text-gray-500">No heats found.</p>
        )}
      </div>
      <Toaster position='top-right'/>
    </>
  );
};

export default HeatsPage;

