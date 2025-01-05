import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <motion.div
      className="w-16 h-16 border-4 border-t-4 border-[#8b4513] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default Loader;
