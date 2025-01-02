import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

import { CalendarCog, ChevronUp, Home, Newspaper, User2 } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
  
  export function AppSidebar() {
    const navigate=useNavigate();
    const items = [
        {
          title: "Home",
          url: "dashboard",
          icon: Home,
        },
        {
          title: "News",
          url: "news",
          icon: Newspaper,
        },
        {
          title: "Events",
          url: "events",
          icon: CalendarCog,
        },
      ]
      const events = [
        {
          title: "Aurora",
          url: "aurora",
          icon: Home,
          subevents:[
            {
             name:"Cricket"
            },
            {
             name:"Football"
            },
            {
             name:"Volleyball"
            }
          ]
        },
        {
          title: "Vyro",
          url: "vyro",
          icon: Newspaper,
        },
        {
          title: "EcoFlair",
          url: "eco-flair",
          icon: CalendarCog,
        },
      ]
    return (
        <Sidebar className="backdrop-blur-xl md:backdrop-blur-sm">
        <SidebarContent className="">
          <SidebarGroup className="sm:top-16 py-10">
            <SidebarGroupContent >
              <SidebarMenu >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={`/${item.url}`} className="pl-10  text-xl ">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {events.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <button onClick={()=>navigate(`/events/${item.url}`)} className="pl-10  text-xl ">
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu >
                <DropdownMenuTrigger asChild className="bg-base-100">
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      </Sidebar>
    )
  }
  