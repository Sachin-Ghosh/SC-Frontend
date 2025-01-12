import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEventStore } from '@/components/store/eventStore';

const UpdateHeatModal = ({ heat }) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(heat.status);
  const { updateHeatStatus } = useEventStore();

  const handleUpdateStatus = async () => {
    await updateHeatStatus(heat.id, status);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-amber-700 rounded text-white  mt-4">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Update Heat Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full bg-amber-700 rounded text-white" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateHeatModal;