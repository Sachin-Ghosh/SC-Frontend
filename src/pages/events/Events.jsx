import { GiAcousticMegaphone } from "react-icons/gi";
import { Timeline } from "../../components/Timeline";
import { useSidebar } from "@/components/ui/sidebar";
import HolographicBackground from "@/components/HolographicBackground";

const events = [
  {
    name: "Aurora",
    description: "Annual Sports fest",
    date: "17th Jan",
    img: "sports.jpg",
    link:"aurora"
  },
  {
    name: "Vyro",
    description: "Annual cultural fest",
    date: "20th Feb",
    img: "vyro.jpg",
    link:"vyro"
  },
  {
    name: "Innovate",
    description: "Innovation summit",
    date: "2023-11-05",
    link:"innovate"
  },
  {
    name: "EcoFair",
    description: "Environmental awareness event",
    date: "2023-12-01",
    link:"eco-flair"
  },
]

export default function Events() {
  // const  {state}=useSidebar();
  return (
    <div className={` relative w-full  `}>
      {/* <HolographicBackground /> */}
      <div className="container mx-auto  py-2 px-4 md:px-10 relative top-16 w-full">
        <h1 className="text-xl sm:text-4xl font-bold mb-3 nabla text-center flex gap-4 justify-center items-center">
        <GiAcousticMegaphone size={50} color="red" className="-rotate-[30deg] animate-pulse"/>
          Upcoming Events 
          <GiAcousticMegaphone size={50} color="red" className="-rotate-[30deg] animate-pulse"/>
        </h1>
        <Timeline events={events} />
      </div>
    </div>
  )
}

