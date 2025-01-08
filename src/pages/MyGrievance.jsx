import React, { useEffect } from 'react'

const MyGrievance = () => {
    const fetchGrievance=async()=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/grievances/my-grievances/`);
        const data=await response.json();
        console.log(data);
    }

    useEffect(()=>{
        fetchGrievance();
    },[])
  return (
    <div>MyGrievance</div>
  )
}

export default MyGrievance