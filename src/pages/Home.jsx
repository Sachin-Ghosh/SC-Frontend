import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const eventDate = new Date("2025-01-17T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
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
      <div className="fixed inset-0 bg-amber-900 opacity-40 z-10"></div>
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen top-[10rem] sm:top-40">
        <div className="flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            src="/ucoe.png"
            className="h-36 w-32"
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
            className="sm:text-xl text-ambet-950"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            presents
          </motion.span>
          <motion.h2
            className="text-5xl text-nowrap md:text-9xl font-serif text-center mb-8 text-[#3d2b1e]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Aurora 2025
          </motion.h2>
        </div>

        <motion.div className="relative  h-72">
          <h1 className="text-center text-amber-950 text-2xl mb-4">Time Remaining</h1>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col p-2 bg-amber-800 rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{ "--value": timeLeft.days }}></span>
    </span>
    days
  </div>
  <div className="flex flex-col p-2 bg-amber-800 rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":timeLeft.hours}}></span>
    </span>
    hours
  </div>
  <div className="flex flex-col p-2 bg-amber-800 rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":timeLeft.minutes}}></span>
    </span>
    min
  </div>
  <div className="flex flex-col p-2 bg-amber-800 rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":timeLeft.seconds}}></span>
    </span>
    sec
  </div>
</div>
        </motion.div>

        
      </div>
    </>
  );
};

export default Home;
