import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    department: '',
    idProof: null
  });
  const [idProofPreview, setIdProofPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      setIdProofPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the sign up logic
    console.log('Sign up attempted with:', formData);
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, idProof: null });
    setIdProofPreview(null);
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <img src='/register.jpg' className='fixed w-full h-full object-cover z-0' alt="Background" />
      <div className="min-h-screen rounded flex items-center justify-center bg-amber-800 bg-opacity-40 relative z-10 bg-cover bg-center bg-blend-overlay">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded w-full max-w-2xl relative"
        >
          <div className='relative z-20'>
            <h2 className="text-4xl font-bold mb-6 text-center text-[#291b11] font-serif">Aurora 2025</h2>
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#442914]">Athlete's Registration</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                    placeholder="Choose a password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-white mb-1">Gender</label>
                  <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-full bg-white border-b">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>

                </SelectContent>
              </Select>
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-white mb-1">Department</label>
                  <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-full bg-white border-b">
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
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-white mb-1">Department</label>
                  <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-full bg-white border-b">
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
              </div>
              <div>
                <label htmlFor="idProof" className="block text-sm font-medium text-white mb-1">ID Proof Photo</label>
                <input
                  type="file"
                  id="idProof"
                  name="idProof"
                  onChange={handleChange}
                  accept="image/*"
                  required
                  className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
                />
                {idProofPreview && (
                  <div className="mt-2 relative w-fit">
                    <img src={idProofPreview} alt="ID Proof Preview" className="max-w-xs h-auto rounded-md" />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white py-2 px-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      <X/>
                    </motion.button>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#8b4513] text-white py-2 px-4 rounded-md hover:bg-[#a0522d] transition-colors duration-300 font-semibold text-lg"
              >
                Sign Up
              </motion.button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-[#120a05] hover:underline">Already have an account? Sign In</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;

