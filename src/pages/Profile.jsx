import UserProfile from '@/components/UserProfile';
import React from 'react';


const Profile = () => {
  const user = {
    name: "Sir Souvik Mondal",
    title: "Rookie",
    
    about: "A noble knight known for his purity and bravery. ",
    skills: [
      "Jousting",
      "Swordsmanship",
      "Chivalry",
      "Horsemanship",
      "Medieval Lore"
    ],
    achievements: [
      "Victor of the Grand Tournament of Camelot",
      "Recovered the Holy Grail",
      "Slayer of the Dragon of Northumbria"
    ],
    email: "sm6984767@gmail.com",
    department: 'Information Technology',
    phone: '9890780219',
    
    // location: "Nallasop"
  };

  return <UserProfile user={user} />;
};

export default Profile;

