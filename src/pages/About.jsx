
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
const About = () => {
  return (
    <div>
         <img 
        src="/about-back.jpg" 
        alt="Background" 
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
<div className='min-h-screen '>
<img className="fixed -bottom-64 w-[40rem] spin -left-64 z-0" src='/compass.png'/>
<img className="fixed top-0 w-[50rem] spin -right-[25.1rem] z-0" src='/compass.png'/>
        
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{once:  true}}
        transition={{ duration: 1 }}
        className="mt-12 container  w-[26rem] bg-center bg-contain mx-auto sm:w-[45rem] h-[50rem] sm:h-[33rem] bg-white  bg-no-repeat  bg-opacity-80 p-8 rounded-lg shadow-xl max-w-3xl relative z-10 top-20 mb-20"
  >
    <img src='/about.png' className='absolute z-0 top-48 sm:left-48 sm:top-28 h-96 w-96 sm:h-80 sm:w- opacity-40 object-center'/>
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
      <div className='min-h-screen relative top-96 flex justify-center items-center'>

      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:  true}}
          transition={{ duration: 1 }}
          className="mt-12 container grid grid-cols-1 sm:grid-cols-2 gap-12 bg-center bg-contain mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-xl relative z-10"
        >
           <div>
            <img src='/college.jpg'/>
          </div>
          <div>
            <h2 className="text-3xl mb-4 text-[#8b4513] text-center cizel">About </h2>

          <h3 className="text-3xl cizel mb-4 text-[#8b4513] text-center">Universal College of Engineering</h3>
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
      <div className='min-h-screen relative top-96 flex justify-center items-center'>

      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:  true}}
          transition={{ duration: 1 }}
          className="mt-12 container  w-[26rem] bg-center bg-contain mx-auto sm:w-[45rem] h-[50rem] sm:h-[28rem] bg-white  bg-no-repeat  bg-opacity-80 p-8 rounded-lg shadow-xl max-w-3xl relative z-10 top-20 mb-20"
        >
            <img src='/sc_logo.png' className='absolute z-0 top-48 sm:left-40 sm:top-28 h-96 w-96 sm:h-80 sm:w- opacity-40 object-center'/>
          <div>
            <h2 className="text-3xl mb-4 text-[#8b4513] text-center cizel">About </h2>
          <h3 className="text-3xl cizel mb-4 text-[#8b4513] text-center">Student's Council</h3>
          <TypeAnimation
            sequence={[
              `Universal College of Engineering is approved by the All India Council for Technical Education (AICTE), New Delhi; recognized by the Directorate of Technical Education (DTE), Government of Maharashtra; affiliated to Mumbai University. The college is also associated with professional bodies like IEEE, IETE, ISA and CSI to update the revolutionary technological advancements. It offers 4 years full-time Bachelor of Technology in Computer Engineering, Civil Engineering, Information Technology Engineering, Data Science, and Artificial Intelligence & Machine Learning.`,
              100,
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

      </div>
      
      </div>
  )
}

export default About