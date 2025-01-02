import React from 'react'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar fixed top-0 left-0 right-0 flex justify-between bg-opacity-40 z-40 px-2 sm:px-32">
      <div className='flex gap-2 bg-transparent'>
        <Button variant="ghost" size="icon" className="block lg:hidden bg-transparent border-none hover:bg-transparent">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1">
          <img src='/ucoe.png' alt="UCOE Logo" className='h-16 w-[3.5rem]' />
        </div>
      </div>

      <div className='hidden sm:flex gap-12 justify-between items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="link" 
              className="text-foreground hover:text-primary"
              onMouseEnter={(e) => e.currentTarget.click()}
            >
              Events
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center"
            className="bg-background/80 backdrop-blur-sm rounded border-amber-900"
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
        <Link to={'/'} className='text-foreground hover:text-primary'>Report</Link>
      </div>

      <Button 
        className='bg-amber-900 border-none ysabeau-sc text-xl text-white hover:bg-amber-800'
        onClick={() => navigate('/auth/login')}
      >
        Login
      </Button>
    </nav>
  )
}

export default Header

