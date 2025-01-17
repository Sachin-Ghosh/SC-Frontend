import React from 'react'
import { useParams } from 'react-router-dom';
import { motion } from "motion/react"
import { Typewriter } from 'react-simple-typewriter';
import { TbTargetArrow } from "react-icons/tb";
const Details = () => {
    const { subevent } = useParams();
    //console.log(subevent);

  return (
    <div className="py-8 flex flex-col min-h-screen px-10 w-full">
      <div  className='relative top-10'>
         <div className='relative uppercase revalia text-cyan-500 font-semibold text-3xl md:text-5xl '>
         <Typewriter
                    words={[subevent]} // Text to display in the typewriter effect
                    loop={1} // Set to 1 for a single iteration; use `Infinity` for looping
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    
                />
          </div>
          <div className='relative'>
          
                 <h1 className=' md:text-3xl flex gap-3 items-center'><TbTargetArrow />
                 <Typewriter
                    words={['Rules and Points System']} // Text to display in the typewriter effect
                    loop={1} // Set to 1 for a single iteration; use `Infinity` for looping
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1500}
                    
                /><TbTargetArrow /></h1>

                 <motion.img  initial={{x:-100 , opacity: 0 }} whileInView={{x:0, opacity: 1 }} src='/cricket-new.jpg'/>
           
          </div>
          </div>
        </div>
  )
}

export default Details