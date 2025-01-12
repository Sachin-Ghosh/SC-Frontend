import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventStore } from '@/components/store/eventStore';
import { toast } from 'sonner';

const CreateHeatModal = () => {
  const { createHeat } = useEventStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    heat_name: '',
    stage: 'PRELIMS',
    round_number: 1,
    schedule: '',
    venue: '',
    max_participants: 6,
    status: 'PENDING'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the date properly for the API
      const formattedData = {
        ...formData,
        round_number: parseInt(formData.round_number),
        max_participants: parseInt(formData.max_participants),
        // Ensure the date is in UTC format
        schedule: new Date(formData.schedule).toISOString()
      };

      // Log the formatted data for debugging
      console.log('Submitting heat data:', formattedData);

      await createHeat(formattedData);
      setOpen(false);
      setFormData({  // Reset form
        heat_name: '',
        stage: 'PRELIMS',
        round_number: 1,
        schedule: '',
        venue: '',
        max_participants: 6,
        status: 'PENDING'
      });

    } catch (error) {
      console.error('Failed to create heat:', error);
      // Error toasts are now handled in the createHeat function
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get current date-time in local ISO format for the datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-800 rounded text-white relative z-20 hover:bg-amber-600">Create Heat</Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-96 sm:max-h-full overflow-x-auto bg-[url('/vintage-2.jpg')] bg-center bg-cover">
        <DialogHeader>
          <DialogTitle>Create New Heat</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Heat Name</label>
            <Input
              required
              value={formData.heat_name}
              onChange={(e) => handleChange('heat_name', e.target.value)}
              placeholder="Enter heat name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stage</label>
            <Select
              value={formData.stage}
              onValueChange={(value) => handleChange('stage', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="PRELIMS">Prelims</SelectItem>
                <SelectItem value="QUARTERS">Quarters</SelectItem>
                <SelectItem value="SEMIS">Semis</SelectItem>
                <SelectItem value="FINALS">Finals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Round Number</label>
            <Input
              type="number"
              required
              min="1"
              value={formData.round_number}
              onChange={(e) => handleChange('round_number', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Schedule</label>
            <Input
              type="datetime-local"
              required
              min={getCurrentDateTime()}
              value={formData.schedule}
              onChange={(e) => handleChange('schedule', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Venue</label>
            <Input
              required
              value={formData.venue}
              onChange={(e) => handleChange('venue', e.target.value)}
              placeholder="Enter venue"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Participants</label>
            <Input
              type="number"
              required
              min="1"
              value={formData.max_participants}
              onChange={(e) => handleChange('max_participants', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full relative z-20 bg-amber-900 text-white rounded hover:bg-primary/90">
            Create Heat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHeatModal;

