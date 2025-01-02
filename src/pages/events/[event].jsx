import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Modal from '@/components/Modal'
import { motion } from "motion/react"
import { Separator } from '@/components/ui/separator'
import { columns } from './data/columns'
import { DataTable } from '@/components/DataTable'
const localizer = momentLocalizer(moment)

const events = [
  {
    name: "Sports Events",
    subEvents: [
      {
        name: "Cricket",
        type: "Sport",
        start: new Date(2023, 8, 15),
        link: 'cricket', // Note: Month is 0-indexed
        end: new Date(2023, 8, 16),
        description: "24-hour coding competition"
      },
      {
        name: "Tug of war",
        type: "Sport",
        link: 'tug-of-war',
        start: new Date(2023, 8, 16),
        end: new Date(2023, 8, 17),
        description: "Robot fighting competition"
      },
      {
        name: "Kabbadi",
        type: "Sport",
        link: 'kabbadi',
        start: new Date(2023, 8, 17),
        end: new Date(2023, 8, 18),
        description: "Quiz on latest technology trends"
      }
    ]
  },
  {
    name: "Cultural Events",
    subEvents: [
      {
        name: "Battle of Bands",
        type: "Cultural",
        link: 'battle-of-bands',
        start: new Date(2023, 9, 20),
        end: new Date(2023, 9, 21),
        description: "Music band competition"
      },
      {
        name: "Street Play",
        type: "Cultural",
        link: 'street-play',
        start: new Date(2023, 9, 21),
        end: new Date(2023, 9, 22),
        description: "Street theater competition"
      },
      {
        name: "Fashion Show",
        type: "Cultural",
        link: 'fashion-show',
        start: new Date(2023, 9, 22),
        end: new Date(2023, 9, 23),
        description: "Themed fashion walk"
      }
    ]
  }
]

// const payments = [
//   {
//     id: "728ed52f",
//     name: "FE-A",
//     cricket: "90",
//     volleyball: "100",
//     total:"190"
//   },
//   {
//     id: "489e1d42",
//     name: "FE-B",
//     cricket: "50",
//     volleyball: "30",
//     total: "80"
//   },
// ]

const SpecificEvent = () => {
  const { event } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  return (
    <>
      <div className="container md:mx-auto py-8 min-h-screen md:px-10 w-full">
        {/* <div className='relative top-16'>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1,transition:{duration: 0.50}}} className=' uppercase monoton text-red-500 text-center text-5xl md:px-10 pb-5'>{event}</motion.div>
        <motion.div initial={{x:-100 , opacity: 0 }} animate={{x:0, opacity: 1 }}  className=' w-full'>
          <Accordion type="single" collapsible className="space-y-4 w-full">
            {events.map((eventCategory, index) => (
              <div className='flex flex-grow w-full' key={index}>
                <AccordionItem className="w-full" value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-semibold grow w-[19rem] md:w-[36rem] lg:w-[70rem] rounded-xl px-2 border-b-none">
                    {eventCategory.name}
                  </AccordionTrigger>
                  <AccordionContent className="w-full flex flex-col">
                    <Card className="mt-2 rounded-xl bg-center bg-cover ">
                      <CardContent className="  m-2 rounded-xl backdrop-blur-sm">
                        <motion.h3 className="text-lg font-semibold my-2">Sub Events</motion.h3>

                        <motion.div initial={{x:-100 , opacity: 0 }} whileInView={{x:0, opacity: 1 }} className="h-[400px] "
                        >
                          <Calendar
                            localizer={localizer}
                            events={eventCategory.subEvents}
                            startAccessor="start"
                            endAccessor="end"
                            titleAccessor="name"
                            views={['month', 'week', 'day']}
                            defaultView='month'
                            defaultDate={eventCategory.subEvents[0].start}
                            onSelectEvent={handleEventClick}
                          />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </motion.div>
        <Separator className="my-4"/>
            <motion.div initial={{x:-100 , opacity: 0}} animate={{x:0, opacity: 1 }} transition={{
                delay: 0.1
            }} className='mt-12'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="">View Score</AccordionTrigger>
                <AccordionContent>
                <div className="w-[12rem] md:w-full">
                <DataTable columns={columns} data={payments} />
                </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            </motion.div>
            </div> */}
            {/* faculty side */}
            <div className='relative top-16'>
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1,transition:{duration: 0.50}}} className=' uppercase monoton text-red-500 text-center text-5xl md:px-10 pb-5'>{event}</motion.div>
             <Accordion type="single" collapsible className="space-y-4 w-full">
             {events.map((event, index)=>(
                <div>
                <div className='flex flex-grow w-full' key={index}>
                <AccordionItem className="w-full" value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-semibold grow w-[19rem] md:w-[36rem] lg:w-[70rem] rounded-xl px-2 border-b-none">
                    {event.name}
                  </AccordionTrigger>
                  <AccordionContent className="w-full flex flex-col">
                    <Card className="mt-2 rounded-xl bg-center bg-cover ">
                      <CardContent className="  m-2 rounded-xl backdrop-blur-sm flex flex-col">
                        <motion.h3 className="text-2xl font-semibold my-2">Sub Events</motion.h3>

                          {event.subEvents.map((subEvents, index)=>(
                            <>
                        <motion.div initial={{x:-100 , opacity: 0 }} whileInView={{x:0, opacity: 1, transition:{delay:index* 0.1} }} className=" flex flex-col hover:bg-slate-500 hover:bg-opacity-15 "
                        >
                            <a href={'/'} className=' text-xl py-3 px-3 hover:underline'>{subEvents.name}</a>
                            <hr/>
                        </motion.div>
                            </>
                          ))}
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </div>
                </div>
             ))}
             </Accordion>
            </div>
      </div>

      {/* {selectedEvent && (
        <Modal isOpen={isOpen} event={event} setIsOpen={setIsOpen} name={selectedEvent.name} description={selectedEvent.description} start={moment(selectedEvent.start).format('DD-MM-YYYY')} link={selectedEvent.link}/>
      )} */}
    </>
  )
}

export default SpecificEvent