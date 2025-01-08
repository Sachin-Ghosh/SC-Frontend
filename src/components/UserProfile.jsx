import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaScroll } from 'react-icons/fa';
import { GiBlackKnightHelm, GiKnightBanner } from 'react-icons/gi';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ profile }) => {
  const [data, setData]=useState();
  const navigate=useNavigate();
  useEffect(()=>{
setData(profile.profile)
  },[profile])
 console.log('profile:',profile.profile)
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
            <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-center bg-cover flex w-full items-center justify-center">
              <img src='/profile-frame.png' className='absolute z-0 w-64 h-64' alt="Profile Frame"/>
              <div className='relative z-10'>
                {profile.profile.profile_picture ? (
                  <img className="relative z-10 rounded-full border-4 w-40 h-40 shadow-lg" src={`${import.meta.env.VITE_API_URL}${profile.profile.profile_picture}`} alt={profile.profile.username} />
                ) : (
                  <GiKnightBanner size={70} className='text-amber-950'/>
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
                {profile.profile.full_name}
              </motion.h1>
              <p className="text-sm text-[#8b4513] mt-1">{profile.profile.user_type}</p>
              <div className="flex items-center justify-center ">
                <button className='btn bg-amber-950 text-white hover:bg-amber-900' onClick={()=>{navigate('/profile/update')}}>Edit Profile</button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <ProfileSection icon={<FaScroll className="text-[#8b4513]" />} title="About">
                <TypeAnimation
                  sequence={[
                    `Email: ${profile.profile.email}\nDepartment: ${profile.profile.department || 'Not specified'}\nPhone: ${profile.profile.phone || 'Not provided'}\nYear of Study: ${profile.profile.year_of_study || 'Not specified'}\nGender: ${profile.profile.gender || 'Not specified'}\nBio: ${profile.profile.bio || 'No bio provided'}`,
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
      className="relative rounded sm:p-10 bg-center bg-contain bg-no-repeat flex justify-center "
      initial={{ opacity: 0, y:100, scale: 0.9 }}
      animate={{ opacity: 1, y:0, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* <img src='/event-background.jpg' className='absolute z-0  md:-top-[22rem] lg:-top-[17rem] sm:w-[60rem] sm:h-[60rem] object-cover sm:object-contain object-center' alt="Profile Background"/> */}
      <div className='relative rounded-2xl z-10 px-7 py-10 bg-[url("/event-background.jpg")] bg-cover bg-center sm:py-10 sm:px-10 flex flex-col items-center justify-center w-fit'>
        <div className="flex items-center  mb-2">
          {icon}
          <h2 className="ml-2 text-xl font-semibold text-[#4a3728] font-serif">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default UserProfile;

