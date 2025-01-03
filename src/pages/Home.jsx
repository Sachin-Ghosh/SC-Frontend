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
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen top-[20rem] sm:top-60">
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
        <div className='min-h-screen '>

        
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:  true}}
          transition={{ duration: 1 }}
          className="mt-12 container   bg-center bg-contain mx-auto w-[45rem] h-[50rem] sm:h-[33rem] bg-white  bg-no-repeat  bg-opacity-80 p-8 rounded-lg shadow-xl max-w-3xl relative z-10 top-96 mb-20"
    >
      <img src='/about.png' className='absolute z-0 sm:left-48 sm:top-28 h-96 w-96 sm:h-80 sm:w- opacity-40 object-center'/>
          <div className='z-10 relative'>

         
          <h3 className="text-3xl font-serif mb-4 text-[#8b4513] text-center">About Aurora 2025</h3>
          <TypeAnimation
            sequence={[
              `Aurora 2025 is not just a sports event; it's a celestial celebration of athleticism, teamwork, and the indomitable human spirit. Named after the mesmerizing Northern Lights, Aurora 2025 promises to illuminate the world of collegiate sports with its brilliance and diversity.

              Featuring a wide array of sporting disciplines, from traditional favorites to emerging sports, Aurora 2025 offers a platform for athletes to showcase their skills, push their limits, and forge lasting friendships. This grand spectacle will bring together students from across the nation, creating a tapestry of talent, culture, and sportsmanship.
              
              Join us as we embark on this extraordinary journey, where every game is a story, every athlete a star, and every moment, a memory to cherish. Aurora 2025 - Where Champions Rise and Legends are Born!`,
              500,
            ]}
            wrapper="p"
            speed={50}
            style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
            repeat={0}
            className="text-[#4a3728] text-lg leading-relaxed"
          />
           </div>
         
        </motion.div>
        </div>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:  true}}
          transition={{ duration: 1 }}
          className="mt-12 container grid grid-cols-1 sm:grid-cols-2 gap-12 bg-center bg-contain mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-xl relative z-10 top-96 mb-20"
        >
           <div>
            <img src='/college.jpg'/>
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-4 text-[#8b4513] text-center">About </h2>

          <h3 className="text-3xl font-serif mb-4 text-[#8b4513] text-center">Universal College of Engineering</h3>
          <TypeAnimation
            sequence={[
              `Universal College of Engineering is approved by the All India Council for Technical Education (AICTE), New Delhi; recognized by the Directorate of Technical Education (DTE), Government of Maharashtra; affiliated to Mumbai University. The college is also associated with professional bodies like IEEE, IETE, ISA and CSI to update the revolutionary technological advancements. It offers 4 years full-time Bachelor of Technology in Computer Engineering, Civil Engineering, Information Technology Engineering, Data Science, and Artificial Intelligence & Machine Learning.`,
              500,
            ]}
            wrapper="p"
            speed={50}
            style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
            repeat={0}
            className="text-[#4a3728] text-lg leading-relaxed"
          />
         
          </div>
         
        </motion.div>
      </div>

    </>
  );
};

export default Home;

