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
import { UserCircle2 } from 'lucide-react'
import { GiBlackKnightHelm } from "react-icons/gi";

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side fixed z-50">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 min-h-full w-80 p-10 bg-[url('/sidebar.jpg')] bg-contain space-y-10">
          <div className='text-3xl text-[#8b4513]'>
            AURORA 2025
          </div>
          <div className='flex flex-col text-xl gap-12 text-[#4a3728]'>
            <Accordion type="single" collapsible className="w-full" asChild>
              <AccordionItem value="events">
                <AccordionTrigger>Events</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-4 pl-4">
                    <Link to='/events/sports' className="hover:text-[#8b4513] transition-colors"onClick={() => {document.getElementById('my-drawer-3').click()}}>Sports Events</Link>
                    <Link to='/events/cultural' className="hover:text-[#8b4513] transition-colors" onClick={() => {document.getElementById('my-drawer-3').click()}}>Cultural Events</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link to='/grievances' onClick={() => {document.getElementById('my-drawer-3').click()}}><a>Report</a></Link>
            <Link to='/profile' onClick={() => {document.getElementById('my-drawer-3').click()}}><a>Profile</a></Link>
          </div>
        </div>
      </div>
      <nav className="navbar fixed top-0 left-0 right-0 flex justify-between bg-opacity-40 z-30 px-2 sm:px-32">
        <div className='flex gap-2 bg-transparent'>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <Link to={'/'} className="flex-1">
            <img src='/ucoe.png' alt="UCOE Logo" className='h-16 w-[3.5rem] relative z-20' />
          </Link>
        </div>

        <div className='hidden sm:flex gap-12 justify-between items-center'>
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
          <Link to='/grievances' className='text-foreground hover:text-[#8b4513]'>Report</Link>
          <Link to='/about' className='text-foreground hover:text-[#8b4513]'>About</Link>
        </div>

        <div className=''>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn rounded-full p-0 px-1">
             
                <div className="w-10 rounded-full">
                 <GiBlackKnightHelm  size={40} className='text-amber-950'/>
                </div>

            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content backdrop-blur-sm border text-[#4a3728] border-[#8b4513] rounded-box z-[1] mt-4 w-52 p-2 shadow">
              <li><Link to='/profile' className='' onClick={()=>{}}>Profile</Link></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header

