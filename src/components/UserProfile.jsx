import React from 'react';
import { motion } from 'framer-motion';
import { FaScroll } from 'react-icons/fa';
import { User } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { GiBlackKnightHelm } from 'react-icons/gi';

const UserProfile = ({ user }) => {
  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      <div className="min-h-screen bg-[#f3e5d8] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-transparent max-w-4xl w-full rounded-lg overflow-hidden"
        >
          <div className="bg-[url('/renaissance-banner.jpg')] h-60 bg-cover bg-center"></div>
          <div className="relative px-4 pt-16 pb-8 sm:px-6 lg:px-8">
            <div className={`absolute ${user.avatar ? ' -top-32':'-top-16'} left-1/2 transform -translate-x-1/2  bg-center bg-cover flex w-full items-center justify-center`}>
              <img src='/profile-frame.png' className='absolute z-0 w-64 h-64' alt="Profile Frame"/>
              <div className='relative z-10'>
                {user.avatar ? (
                  <img className="relative z-10 rounded-full border-4 w-40 h-40 shadow-lg" src={user.avatar} alt={user.name} />
                ) : (
                    <GiBlackKnightHelm  size={70} className='text-amber-950'/>
                )}
              </div>
            </div>
            <div className="text-center">
              <motion.h1 
                className="text-3xl font-bold cinzel text-[#4a3728]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                {user.name}
              </motion.h1>
              <p className="text-sm text-[#8b4513] mt-1">{user.title}</p>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <ProfileSection icon={<FaScroll className="text-[#8b4513]" />} title="About">
                <TypeAnimation
                  sequence={[
                    `About: ${user.about}\nDepartment: ${user.department}\nEmail: ${user.email}\nPhone: ${user.phone}`,
                    1000,
                  ]}
                  wrapper="p"
                  speed={50}
                  style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
                  repeat={0}
                  className="text-[#4a3728]"
                />
              </ProfileSection>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

const ProfileSection = ({ icon, title, children }) => {
  return (
    <motion.div 
      className="relative rounded sm:p-10 bg-center bg-contain bg-no-repeat"
      initial={{ opacity: 0, y:100, scale: 0.9 }}
      animate={{ opacity: 1, y:0, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <img src='/profile-back.jpg' className='absolute z-0 sm:-top-5 w-[30rem]  object-cover object-center' alt="Profile Background"/>
      <div className='relative z-10 px-8 py-3 sm:py-0 sm:px-10'>
        <div className="flex items-center mb-2">
          {icon}
          <h2 className="ml-2 text-xl font-semibold text-[#4a3728] font-serif">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default UserProfile;

