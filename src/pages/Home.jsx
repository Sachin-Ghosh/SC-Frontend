import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
    <img 
        src="/background.jpg" 
        alt="Background" 
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className='fixed inset-0 bg-amber-900 opacity-40 z-10'></div>
    <div className="relative z-20 flex flex-col justify-center items-center min-h-screen">
      <div className='flex flex-col items-center '>
        <motion.img 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:2.5 }}
        src='/ucoe.png' className='h-36 w-32'/>
      <motion.h1 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-sm md:text-3xl font-semibold text-center">
        Universal College of engineering
      </motion.h1>
      <motion.span
      className='sm:text-xl'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay:0.5 }}
      >presents</motion.span>
      <motion.h2 
        className="text-6xl text-nowrap md:text-9xl font-serif text-center mb-8 text-[#3d2b1e]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:1.5 }}
      >
        Aurora 2025
      </motion.h2>
      </div>
      {/* <motion.h2 
        className="text-4xl md:text-5xl font-serif text-center mb-8 text-[#4a3728]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Renaissance Sports
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif mb-4 text-[#8b4513]">About Us</h3>
          <p className="text-[#4a3728] mb-4">Experience the elegance of the Renaissance era combined with the thrill of modern sports. Our unique events bring history and athleticism together in a celebration of human achievement.</p>
          <Link to="/events" className="inline-block bg-[#8b4513] text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200">
            Explore Events
          </Link>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif mb-4 text-[#8b4513]">Register Now</h3>
          <p className="text-[#4a3728] mb-4">Join our community of athletes and history enthusiasts. Sign up for upcoming events and be part of this unique sporting experience.</p>
          <Link to="/registration" className="inline-block bg-[#8b4513] text-white py-2 px-4 rounded hover:bg-[#a0522d] transition-colors duration-200">
            Register
          </Link>
        </motion.div>
      </div> */}
      <div className='relative top-20'>
        <h1 className='text-center'>Time Remaining</h1>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col">
    <span className="countdown font-mono text-7xl">
      <span style={{"--value":15}}></span>
    </span>
    days
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-7xl">
      <span style={{"--value":10}}></span>
    </span>
    hours
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-7xl">
      <span style={{"--value":24}}></span>
    </span>
    min
  </div>
  <div className="flex flex-col">
    <span className="countdown font-mono text-7xl">
      <span style={{"--value": counter}}></span>
    </span>
    sec
  </div>
  </div>
</div>
    </div>
    </>
  );
};

export default Home;
