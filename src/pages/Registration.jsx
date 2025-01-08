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
import { Loader, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

// import { setMaxListeners } from 'events';

const Registration = () => {
  const eventName = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const user=localStorage.getItem('user');
  const storedUser=JSON.parse(user);
  const navigate=useNavigate();
  // console.log('storedUser',storedUser)
  const [formData, setFormData] = useState({
    team_leader: storedUser,
    team_name: '',
    department: '',
    year: '',
    division: '',
    teamMembers: [],
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState([]);

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const payload={
      sub_event: event.id,
      ...formData
    }
    try {
      const response= await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/`,{
        headers:{
          'Authorization':`Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
      const data=await response.json()
      console.log(data);
      if(response.ok){
        toast.success('Registration submitted successfully!');
        navigate('/registered-events')
        
      }else{
        toast.error(`${data.error}`)
      }
    } catch (error) {
      console.log(error)
      
    }
    
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, ''],
    }));
    setDropdownOpen(prev => [...prev, false]);
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
    setDropdownOpen(prev => prev.filter((_, i) => i !== index));
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(prev => prev.map((item, i) => i === index ? !item : item));
  };

  useEffect(() => {
    if(!accessToken){
      navigate('/')
    }
  }, [accessToken])
  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      {!event ? (
        <>
        <span className='text-black flex justify-center items-center min-h-screen gap-5'>
        <Loader className='animate-spin' size={30}/>
        <h1 className='relative z-50'>Loading....</h1>
        </span>
        </>
      ):(<>
      <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8 relative z-20 top-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-serif text-center text-[#4a3728] cinzel uppercase"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {event.name} Registration
        </motion.h2>
        <div className='relative '>
          <motion.form 
            onSubmit={handleSubmit}
            className="mx-auto sm:px-10 pt-3 rounded relative z-20 bg-center flex flex-col lg:flex-row flex-wrap max-w-4xl lg:gap-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="">
              <label htmlFor="team_leader" className="block text-[#4a3728] ">Name</label>
              <Input
                type="text"
                id="team_leader"
                name="team_leader"
                value={formData.team_leader.username}
                onChange={handleChange}
                readOnly
                required
                className=" px-3 w-96 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
              />
            </div>
            {event && event.participation_type === 'GROUP'&&(

            <div className="">
              <label htmlFor="email" className="block text-[#4a3728] ">Team Name</label>
              <Input
                type="text"
                id="team_name"
                name="team_name"
                value={formData.team_name}
                onChange={handleChange}
                required
                className="w-96 px-3 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
              />
            </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="department" className="block text-[#4a3728] ">Department</label>
              <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="COMPUTER">Computer Engineering</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="AIML">AI/ML</SelectItem>
                  <SelectItem value="DATA">Data Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-6">
              <label htmlFor="year" className="block text-[#4a3728] ">Year</label>
              <Select onValueChange={(value) => handleSelectChange('year', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="FE">FE</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TE">TE</SelectItem>
                  <SelectItem value="BE">BE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-6">
              <label htmlFor="division" className="block text-[#4a3728] ">Division</label>
              <Select onValueChange={(value) => handleSelectChange('division', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
            {event && event.participation_type === 'GROUP' && (
                <div className="col-span-2 mb-6 flex flex-col gap-2">
                  <label className="block text-[#4a3728]">Team Members</label>
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="relative w-full">
                        <Input
                          type="text"
                          placeholder="Search team members"
                          value={teamMembers.find(tm => tm.id === member)?.username || ''}
                          onChange={(e) => {
                            const newTeamMembers = [...formData.teamMembers];
                            newTeamMembers[index] = '';
                            setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }));
                            toggleDropdown(index);
                          }}
                          onFocus={() => toggleDropdown(index)}
                          className="w-full border-b"
                        />
                        {dropdownOpen[index] && !member && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {teamMembers.filter(tm =>
                              tm.username.toLowerCase().includes((teamMembers.find(t => t.id === member)?.username || '').toLowerCase()) ||
                              tm.email.toLowerCase().includes((teamMembers.find(t => t.id === member)?.username || '').toLowerCase())
                            ).map((teamMember) => (
                              <div
                                key={teamMember.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  const newTeamMembers = [...formData.teamMembers];
                                  newTeamMembers[index] = teamMember.id;
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    teamMembers: newTeamMembers 
                                  }));
                                  toggleDropdown(index);
                                }}
                              >
                                {teamMember.username} - {teamMember.email}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        variant="ghost"
                        size="icon"
                        className="text-[#8b4513] hover:text-[#a0522d]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addTeamMember}
                    variant="outline"
                    className="mt-2 text-[#8b4513] w-fit border-[#8b4513] hover:bg-[#8b4513] hover:text-white"
                  >
                    Add Subordinates
                  </Button>
                </div>
              )}
            
            <motion.button
              type="submit"
              className="col-span-2 w-full bg-[#8b4513] text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </motion.form>
        </div>
      </div>
      </>)}
      
      <Toaster richColors position='top-right'/>
    </>
  );
};

export default Registration;

