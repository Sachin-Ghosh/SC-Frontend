import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader, Trash2, Check, ChevronsUpDown } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { CommandList } from 'cmdk';

const Registration = () => {
  const eventName = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');
  const storedUser = JSON.parse(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // team_leader: storedUser,
    team_name: '',
    department: '',
    year: '',
    division: '',
    team_members: [], // This will store only the ids
  });

  const [warning, setWarning]=useState({
    team_name: '',
    department: '',
    year: '',
    division: '',
    team_members: '',
  })
  const [teamMembers, setTeamMembers] = useState([]);
  const [open, setOpen] = useState(false);

  const accessToken = localStorage.getItem('access-token');

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${eventName.event}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast.error('Failed to fetch event details');
      }
    };
    const getTeamMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/filter/?department=${formData.department}&year=${formData.year}&division=${formData.division}&user_type=STUDENT`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        const data = await response.json();
        console.log('teammembers', data);
        setTeamMembers(data.results)
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    getTeamMembers();
    getDetails();
  }, [eventName.event, accessToken, formData.department, formData.division, formData.year]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset warnings
    setWarning({
      team_name: '',
      department: '',
      year: '',
      division: '',
      team_members: '',
    });
  
    let hasError = false;
  
    // Validation checks
    if (!formData.team_name && event.participation_type === 'GROUP') {
      setWarning((prev) => ({
        ...prev,
        team_name: "Please enter a team name",
      }));
      hasError = true;
    }
    if (!formData.department) {
      setWarning((prev) => ({
        ...prev,
        department: "Please select a department",
      }));
      hasError = true;
    }
    if (!formData.division) {
      setWarning((prev) => ({
        ...prev,
        division: "Please select your division",
      }));
      hasError = true;
    }
    if (!formData.year) {
      setWarning((prev) => ({
        ...prev,
        year: "Please select your year of study",
      }));
      hasError = true;
    }
    if (
      event.participation_type === 'GROUP' &&
      formData.team_members.length < event.participants_per_group - 1
    ) {
      setWarning((prev) => ({
        ...prev,
        team_members: `You need to add at least ${
          event.participants_per_group - 1
        } team members.`,
      }));
      hasError = true;
    }

    if (event.participation_type === 'GROUP' && formData.team_members.length < event.participants_per_group - 1) {
      console.log(`You need to add at least ${event.participants_per_group - 1} team members.`)
      toast.error(`You need to add at least ${event.participants_per_group - 1} team members.`);
      return;
    }
  
    // Stop submission if there are errors
    if (hasError) {
      toast.error('Please fix the errors before submitting.');
      return;
    }
  
    console.log('Form submitted:', formData);
  
    // Prepare payload
    const payload = {
      sub_event: event.id,
      ...formData,
    };
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/registrations/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Registration submitted successfully!');
        navigate('/registered-events');
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while submitting the form.');
    }
  };
  
  const addTeamMember = (memberId) => {
    if (formData.team_members.length < event.participants_per_group - 1) {
      setFormData(prev => ({
        ...prev,
        team_members: [...prev.team_members, memberId],
      }));
      setOpen(false); // Close the Popover after selection
    } else {
      toast.error(`You can't add more than ${event.participants_per_group - 1} team members.`);
    }
  };

  const removeTeamMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      team_members: prev.team_members.filter(id => id !== memberId),
    }));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken])

  useEffect(() => {
    if (formData.team_members.length === 0) {
      setOpen(false);
    }
  }, [formData.team_members]);

  console.log(event?.upload_link)

  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      {!event ? (
        <>
          <span className='text-black flex justify-center items-center min-h-screen gap-5'>
            <Loader className='animate-spin' size={30} />
            <h1 className='relative z-50'>Loading....</h1>
          </span>
        </>
      ) : (
        <>
          <div className="flex flex-col min-h-screen items-center justify-center w-full max-w-2xl sm:max-w-full py-8 relative z-20 top-10">
            <motion.h2
              className="text-2xl md:text-5xl font-serif pb-10 text-center text-[#4a3728] cinzel uppercase"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {event.name} Registration
            </motion.h2>
            <div className='relative '>
              <motion.form
                onSubmit={handleSubmit}
                className="mx-auto  sm:px-28 pt-3 rounded relative z-20 bg-center flex flex-col items-center w-full  lg:flex-row flex-wrap max-w-2xl sm:max-w-5xl lg:gap-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* <div className="">
                  <label htmlFor="team_leader" className="block text-[#4a3728] ">Name</label>
                  <Input
                    type="text"
                    id="team_leader"
                    name="team_leader"
                    value={formData.team_leader.first_name+" "+formData.team_leader.last_name}
                    onChange={handleChange}
                    readOnly
                    required
                    className=" px-3 w-96 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
                  />
                </div> */}
                {event && event.participation_type === 'GROUP' && (
                  <div className=" sm:px-0 mb-6 sm:mb-0">
                    <label htmlFor="email" className="block text-[#4a3728] ">Team Name</label>
                    <Input
                      type="text"
                      id="team_name"
                      name="team_name"
                      value={formData.team_name}
                      onChange={handleChange}
                      
                      className="w-60 sm:w-96 px-3 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
                    />
                    {!formData.team_name && event.participation_type === 'GROUP' && <span>{warning.team_name}</span>  }
                  </div>
                )}

                <div className="mb-6 sm:mb-0">
                  <label htmlFor="department" className="block text-[#4a3728] ">Department</label>
                  <Select onValueChange={(value) => handleSelectChange('department', value)}>
                    <SelectTrigger className="w-60 sm:w-96 border-b">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                      <SelectItem value="AS&H">AS&H</SelectItem>
                      <SelectItem value="COMPUTER">Computer Engineering</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="AIML">AI/ML</SelectItem>
                      <SelectItem value="DATA">Data Engineering</SelectItem>
                      <SelectItem value="CIVIL">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                  {!formData.department&& <span>{warning.department}</span>  }
                </div>
                <div className="mb-6 sm:mb-0">
                  <label htmlFor="year" className="block text-[#4a3728] ">Year</label>
                  <Select onValueChange={(value) => handleSelectChange('year', value)}>
                    <SelectTrigger className="w-60 sm:w-96 border-b">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                      <SelectItem value="FE">FE</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TE">TE</SelectItem>
                      <SelectItem value="BE">BE</SelectItem>
                    </SelectContent>
                  </Select>
                  {!formData.year&& <span>{warning.year}</span>}
                </div>
                <div className="mb-6 sm:mb-0">
                  <label htmlFor="division" className="block text-[#4a3728] ">Division</label>
                  <Select onValueChange={(value) => handleSelectChange('division', value)}>
                    <SelectTrigger className="w-60 sm:w-96 border-b">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      {/* <SelectItem value="D">D</SelectItem> */}
                    </SelectContent>
                  </Select>
                  {!formData.division&& <span>{warning.division}</span>}
                </div>

                {event && event.participation_type === 'GROUP' && (
                  <div className="col-span-2 mb-6 flex flex-col gap-2 w-full">
                    <label className="block text-[#4a3728]">Team Members ({formData.team_members.length}/{event.participants_per_group - 1})</label>
                    {formData.team_members.map((memberId) => {
                      const member = teamMembers.find(tm => tm.id === memberId);
                      return (
                        <div key={memberId} className="flex items-center">
                          <Input
                            type="text"
                            value={member ? member.full_name : ''}
                            readOnly
                            className="w-56 sm:w-96 border-b"
                          />
                          <Button
                            type="button"
                            onClick={() => removeTeamMember(memberId)}
                            variant="ghost"
                            size="icon"
                            className="text-[#8b4513] hover:text-[#a0522d]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                    {!(formData.team_members.length>0) && event.participation_type === 'GROUP' && <span>{warning.team_members}</span>}
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-fit sm:w-96 justify-between"
                        >
                          Select team member...
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="sm:w-80 p-0 ">
                        <Command className="bg-[url('/event-background.jpg')] bg-center bg-cover rounded w-full max-h-32 ">
                          <CommandInput placeholder="Search team member..." />
                          <CommandList>
                          <CommandEmpty>No team member found.</CommandEmpty>
                          <CommandGroup>
                            {teamMembers
                              .filter(tm => 
                                tm.id !== storedUser.id &&
                                !formData.team_members.includes(tm.id)
                              )
                              .map((teamMember) => (
                                <CommandItem
                                  key={teamMember.id}
                                  onSelect={() => {
                                    addTeamMember(teamMember.id);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.team_members.includes(teamMember.id) ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {teamMember.full_name} - {teamMember.email}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>


                  </div>
                )}

                {event.upload_link===true && (

                <div className="mb-6 sm:mb-0">
                  <label htmlFor="division" className="block text-[#4a3728] ">Upload your audio in the drive :

                  </label>
                  <Link to={'https://drive.google.com/drive/folders/1zs72ia9FmdXxieV9P0jo_g7Z7C8oAfJc'} target='_blank' className='underline text-blue-600'>Google Drive</Link>
                 
                </div>
                )}



                

                <motion.button
                  type="submit"
                  className="col-span-2 sm:w-full bg-[#8b4513] text-white py-2 px-12 sm:px-0 rounded hover:bg-[#a0522d] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </motion.form>
            </div>
          </div>
        </>
      )}

      <Toaster richColors position='top-right' />
    </>
  );
};

export default Registration;

