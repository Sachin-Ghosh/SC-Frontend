import UserProfile from '@/components/UserProfile';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
        <p className='flex justify-center items-center min-h-screen gap-5 '><Loader className='animate-spin'/>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
