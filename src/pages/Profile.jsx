import UserProfile from '@/components/UserProfile';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaFootballBall } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const accessToken = localStorage.getItem('access-token');

  const getProfile = async () => {
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      console.log(data)
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <UserProfile profile={profile} />
        // <div></div>
      ) : (
        <>
        <img src='/registration-back.jpg' className='fixed object-cover h-full w-full z-0' alt="Event background" />
        <div className='min-h-screen flex justify-center relative z-20 items-center gap-5'>
        {/* <img src='/detail-banner.png' className='fixed -bottom-72 -right-20 w-[40rem] h-[40rem]'/> */}
          <FaFootballBall className="animate-bounce text-amber-600 text-4xl" />
          <span className="text-amber-900 text-2xl">Loading Profile...</span>
        </div>
      </>
      )}
    </div>
  );
};

export default Profile;
