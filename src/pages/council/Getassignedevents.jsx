import { Suspense } from 'react'
import EventList from '@/components/Eventlist'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {motion} from 'motion/react'

export default function CouncilEventsPage() {
  return (
    <>
    <img src='/vintage-2.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
    <div className="relative z-20 space-y-6 p-4 md:p-8 mt-20">
      {/* <Card>
        <CardHeader>
          <CardTitle className={'mt-10'}>Your Assigned Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading events...</div>}>
            <EventList />
          </Suspense>
        </CardContent>
      </Card> */}

<motion.h2 
          className="text-xl sm:text-3xl text-center font-semibold text-amber-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Assigned Events
        </motion.h2>

        <div>
        <Suspense fallback={<div>Loading events...</div>}>
            <EventList />
          </Suspense>
        </div>

    
    </div>
    </>
  )
}

