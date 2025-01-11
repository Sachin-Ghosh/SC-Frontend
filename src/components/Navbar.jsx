import React from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LogOut, Menu, UserCircle2, X } from 'lucide-react'
import { GiBlackKnightHelm, GiKnightBanner } from "react-icons/gi";
import { useAuth } from '@/context/authContext'
import { Separator } from './ui/separator'
import { FaCalendarCheck } from 'react-icons/fa'
import { TbReport } from 'react-icons/tb'
import { MdErrorOutline } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const accessToken=localStorage.getItem('access-token');
  const refreshToken=localStorage.getItem('refresh-token');
  const user=JSON.parse(localStorage.getItem('user'));
  console.log(accessToken);
  console.log(refreshToken);

  const handleLogout=async()=>{
    // try {
    //   const response = await fetch(`https://student-council-backend.onrender.com/api/users/logout/`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       refresh_token: refreshToken
    //     }),
    //   });

    //   if (response.ok) {
    //     console.log('Logged out successfully');
    //     localStorage.removeItem('access-token');
    //     localStorage.removeItem('refresh-token');
    //     navigate('/login');
    //   } else {
    //     const errorData = await response.json();
    //     console.error('Logout failed:', errorData);
    //     // Show error message to user
    //   }
    // } catch (error) {
    //   console.error('Error during logout:', error);
    //   // Show error message to user
    // }
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('user');
      navigate('/');
  }

  console.log(user?.user_type)

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side fixed z-50">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 min-h-full w-80 px-3 py-10 bg-[url('/sidebar.jpg')] bg-contain space-y-10">
          <div className='text-3xl flex justify-between pr-5 text-[#8b4513]'>
            <span>AURORA 2025</span>
            <button onClick={() => {document.getElementById('my-drawer-3').click()}}><X/></button>
            
          </div>
          <div className='flex flex-col text-lg px-2 font-semibold gap-7 text-[#4a3728]'>
          {user?.user_type === 'FACULTY' ? (
              <>
              <Link to='/faculty-dashboard' onClick={() => {document.getElementById('my-drawer-3').click()}}>Dashboard</Link>
                <Link to='/view-heats' onClick={() => {document.getElementById('my-drawer-3').click()}}>View Heats</Link>
                <Link to='/leaderboard' onClick={() => {document.getElementById('my-drawer-3').click()}}>Leaderboard</Link>
                <Link to='/scores' onClick={() => {document.getElementById('my-drawer-3').click()}}>Scores</Link>
                
              </>
            ) : (
              <>
                 <Accordion type="single" collapsible className="w-full border-b-amber-900" asChild>
              <AccordionItem value="events">
                <AccordionTrigger className=""> Events</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-4 pl-4">
                    <Link to='/events/sports' className="hover:text-[#8b4513] transition-colors"onClick={() => {document.getElementById('my-drawer-3').click()}}>Sports Events</Link>
                    <Link to='/events/cultural' className="hover:text-[#8b4513] transition-colors" onClick={() => {document.getElementById('my-drawer-3').click()}}>Cultural Events</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link to='/grievances' onClick={() => {document.getElementById('my-drawer-3').click()}} className='pb-6'><a>Report</a></Link>
            <Link to='/profile' onClick={() => {document.getElementById('my-drawer-3').click()}} className='pb-6'><a>Profile</a></Link>
            <Link to='/registered-events' onClick={() => {document.getElementById('my-drawer-3').click()}} className='pb-6'><a>Registered Events</a></Link>
              </>
            )}
         
            
           
            {/* <Link to='/score-board' onClick={() => {document.getElementById('my-drawer-3').click()}} className='pb-6'><a>ScoreBoard</a></Link> */}
            {/* <Link to='/score-board' onClick={() => {document.getElementById('my-drawer-3').click()}} className='pb-6'><a>ScoreBoard</a></Link> */}
          </div>
        </div>
      </div>
      <nav className="navbar fixed top-0 left-0 right-0 flex justify-between bg-opacity-40 z-30 px-2 sm:px-32">
        <div className='flex  bg-transparent'>
          {accessToken && (

          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Menu size={20}/>
            </label>
          </div>
          )}
          <Link to={'/'} className=" bg-opacity-80 ">
            <img src='/aurora.png' alt="UCOE Logo" className='h-10 relative z-20' />
          </Link>
        </div>
          {/* //mid nav */}
          <div className='hidden sm:flex gap-12  justify-between items-center'>
          {accessToken && (
            <>
              {user?.user_type === 'FACULTY' ? (
                <>
                <Link to='/faculty-dashboard' className='text-foreground hover:text-[#8b4513]'>Dashboard</Link>
                  <Link to='/view-heats' className='text-foreground hover:text-[#8b4513]'>View Heats</Link>
                  <Link to='/leaderboard' className='text-foreground hover:text-[#8b4513]'>Leaderboard</Link>
                  <Link to='/scores' className='text-foreground hover:text-[#8b4513]'>Scores</Link>
                  
                </>

              ) : (
                <>
                   <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="link" 
              className="text-foreground hover:text-[#8b4513]"
              onMouseEnter={(e) => e.currentTarget.click()}
            >
              Events
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center"
            className="bg-background/80 backdrop-blur-sm rounded border-[#8b4513]"
            onMouseLeave={(e) => e.currentTarget.closest('.dropdown-menu')?.querySelector('button')?.click()}
          >
            <DropdownMenuItem>
              <Link to="/events/sports" className="w-full">Sports</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/events/cultural" className="w-full">Cultural</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link to='/registered-events' className='text-foreground hover:text-[#8b4513] '>Registered Events</Link>
        <Link to='/score-board' className='hidden sm:block'><a>ScoreBoard</a></Link>
                </>
              )}
            </>
          )}
        {/* {accessToken && (
          <>
       
        </>
      )} */}
      
      </div>

       
{/* end content */}
        <div className=''>
          {accessToken ? (
            <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className=" w-10 sm:w-12 h-10 sm:h-12 flex justify-center items-center rounded-full p-0 px-5 sm:px-1 bg-amber-300 border-2 border-amber-950 hover:bg-amber-200">
             
                <div className="w-10 rounded-full">
                 <GiKnightBanner  className='w-5 sm:w-9 h-5 sm:h-9 text-amber-950'/>
                </div>

            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content backdrop-blur-sm bg-[url('/vintage.jpg')] bg-cover bg-center bg-opacity-70 border text-[#4a3728] border-[#8b4513] rounded-box z-[1] mt-4 w-52 p-2 shadow">
              <div className='px-2 py-2 '><Link to='/profile' className='flex gap-2 items-center w-full' onClick={()=>{}}><UserCircle2/>   Profile</Link></div>
              <hr className='border-amber-900'/>
              <div className='px-2 py-2'><Link to='/grievances' className='text-foreground flex gap-2 items-center w-full'><MdErrorOutline size={30}/> Report</Link></div>
              <hr className='border-amber-900'/>
              <div className='px-2 py-2'><Link to='/my-grievances' className='text-foreground flex gap-2 items-center w-full'><TbReport size={30}/>My Grievances</Link></div>
              <hr className='border-amber-900'/>
              <div className='px-2 py-2 ' onClick={()=>{
                handleLogout();
              }}><a className='flex items-center gap-2 px-2'><LogOut/>Logout</a></div>
            </ul>
          </div>
          ):(
            <div className='flex gap-10 items-center'>
              <Link to='/about' className='text-foreground hover:text-[#8b4513]'>About</Link>
            <Link to={'/auth/login'} className='bg-amber-900 border border-black rounded  px-3 py-2'>Login</Link>
            </div>
          )}
          
        </div>
      </nav>
    </div>
  )
}

export default Header

