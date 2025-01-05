import React, { useEffect, useState } from 'react'

const RegisteredEvents = () => {
    const [events, setEvents]=useState([]);
    const accessToken=localStorage.getItem('access-token')
   const getRegisteredEvents=async()=>{
    try {
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
        })

        const data=await response.json();
    } catch (error) {
        
    }

   }

   useEffect(()=>{
    getRegisteredEvents();
   },[])
  return (
    <div>RegisteredEvents</div>
  )
}

export default RegisteredEvents