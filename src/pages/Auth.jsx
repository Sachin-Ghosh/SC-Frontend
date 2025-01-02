import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', formData);
  };

  return (
    <>
    <img src='/login.jpg' className='fixed z-0'/>
    <div className="min-h-screen rounded flex items-center justify-center bg-amber-800 bg-opacity-40 relative z-10 bg-cover bg-center bg-blend-overlay">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" p-8 rounded w-full max-w-lg relative"
      >
        {/* <img src='/form.png' className='absolute object-cover h-full w-full z-0'/> */}
        <div className='relative z-20'>
        <h2 className="text-4xl font-bold mb-6 text-center text-[#291b11] font-serif">Aurora 2025</h2>
        <h3 className="text-2xl font-semibold mb-6 text-center text-[#442914]">Athlete's Portal</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#4a3728] mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#4a3728] mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#d2b48c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b4513]"
              placeholder="Enter your password"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#8b4513] text-white py-2 px-4 rounded-md hover:bg-[#a0522d] transition-colors duration-300 font-semibold text-lg"
          >
            Sign In
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-[#120a05] hover:underline">Forgot password?</Link>
        </div>
        <div className="mt-8 border-t border-[#d2b48c] pt-6">
          <p className="text-center text-[#4a3728]">New to Renaissance Sports?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 w-full bg-[#4a3728] text-white py-2 px-4 rounded-md hover:bg-[#5a4738] transition-colors duration-300 font-semibold"
          >
            Create an Account
          </motion.button>
        </div>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Login;
