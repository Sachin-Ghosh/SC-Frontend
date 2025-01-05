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
import { Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Registration = () => {
  const params = useParams();
  const [eventId, setEventId]=useState('');
  const [event, setEvent]=useState('');
  console.log(params);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    division: '',
      ...(event.participation_type==='GROUP' &&{
        teamMembers: [],
      })
    
  });
  const accessToken = localStorage.getItem('access-token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);


    toast('Registration submitted successfully!');
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { id: Date.now(), name: '' }],
    });
  };

  const removeTeamMember = (id) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(member => member.id !== id),
    });
  };

  const handleTeamMemberChange = (id, value) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.map(member =>
        member.id === id ? { ...member, name: value } : member
      ),
    });
  };


  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${params.event}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data)
        console.log(data.id);
        setEvent(data)

        setEventId(data.id);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getDetails();
  }, [params, accessToken]);
  



  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8 relative z-20 top-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-serif text-center text-[#4a3728] cinzel uppercase"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {params.event} Registration
        </motion.h2>
        <div className='relative '>
          <motion.form 
            onSubmit={handleSubmit}
            className="mx-auto sm:px-10 pt-3 rounded relative z-20 bg-center flex flex-col sm:flex-row flex-wrap max-w-4xl lg:gap-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="">
              <label htmlFor="name" className="block text-[#4a3728] ">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className=" px-3 w-96 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
              />
            </div>
            <div className="">
              <label htmlFor="email" className="block text-[#4a3728] ">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-96 px-3 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
              />
            </div>
            <div className="">
              <label htmlFor="phone" className="block text-[#4a3728] ">Phone no.</label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-96 px-3 border-b bg-transparent border-[#d2b48c] rounded focus:outline-none focus:border-[#8b4513]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="department" className="block text-[#4a3728] ">Department</label>
              <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="computer">Computer Engineering</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="aiml">AI/ML</SelectItem>
                  <SelectItem value="data">Data Engineering</SelectItem>
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
                  <SelectItem value="fe">FE</SelectItem>
                  <SelectItem value="se">SE</SelectItem>
                  <SelectItem value="te">TE</SelectItem>
                  <SelectItem value="be">BE</SelectItem>
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
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="d">D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {event.participation_type==='GROUP' && 
            <div className="col-span-2 mb-6 flex flex-col gap-2">
            <label className="block text-[#4a3728] ">Team Members</label>
            {event.participation_type==='GROUP' && formData.teamMembers.map((member, index) => (
              <div key={member.id} className="flex items-center">
               <Select onValueChange={(value) => handleSelectChange('division', value)}>
              <SelectTrigger className="sm:w-96 w-full border-b">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="d">D</SelectItem>
              </SelectContent>
            </Select>
                <Button
                  type="button"
                  onClick={() => removeTeamMember(member.id)}
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
            }
            
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
      <Toaster position='top-right'/>
    </>
  );
};

export default Registration;

