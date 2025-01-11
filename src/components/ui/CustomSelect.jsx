import React, { useState } from 'react';
import {motion} from 'motion/react'
import { ChevronDownIcon } from 'lucide-react';

export const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[180px] flex items-center justify-between px-4 py-2 bg-white bg-opacity-90 border rounded shadow-sm hover:bg-gray-50"
      >
        <span>{value}</span>
        <span className="ml-2"><ChevronDownIcon className='h-3 w-3'/></span>
      </button>
      {isOpen && (
        <motion.div className="absolute bg-[url('/vintage.jpg')] bg-cover bg-center z-10 w-full mt-1 bg-white border rounded shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};