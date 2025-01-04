import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

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
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen top-[10rem] sm:top-40">
        <div className='flex flex-col items-center'>
          <motion.img 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            src='/ucoe.png' className='h-36 w-32'
          />
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm md:text-3xl font-semibold text-center text-amber-950"
          >
            Universal College of Engineering
          </motion.h1>
          <motion.span
            className='sm:text-xl text-ambet-950'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            presents
          </motion.span>
          <motion.h2 
            className="text-6xl text-nowrap md:text-9xl font-serif text-center mb-8 text-[#3d2b1e]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Aurora 2025
          </motion.h2>
        </div>

        

        <motion.div
         className='relative top-80 h-72'>
          <h1 className='text-center text-amber-950 text-2xl mb-4'>Time Remaining</h1>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl sm:text-7xl text-amber-950">
                <span style={{"--value":15}}></span>
              </span>
              <span className="text-amber-950">days</span>
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl sm:text-7xl text-amber-950">
                <span style={{"--value":10}}></span>
              </span>
              <span className="text-amber-950">hours</span>
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl sm:text-7xl text-amber-950">
                <span style={{"--value":24}}></span>
              </span>
              <span className="text-amber-950">min</span>
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl sm:text-7xl text-amber-950">
                <span style={{"--value": counter}}></span>
              </span>
              <span className="text-amber-950">sec</span>
            </div>
          </div>
        </motion.div>


        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="mt-12 mb-8"
        >
          <Link to="/events" className="inline-block bg-[#8b4513] text-white py-3 px-6 rounded-full hover:bg-[#a0522d] transition-colors duration-200 text-lg font-semibold">
            Explore Events
          </Link>
        </motion.div> */}
        
      
      </div>

    </>
  );
};

export default Home;

