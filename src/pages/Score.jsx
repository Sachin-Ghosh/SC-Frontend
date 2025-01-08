import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from 'framer-motion';

const EVENTS = [
  "Cricket", "Football", "Volleyball", "Kabbadi boys", "Kabbadi Girls",
  "Throw Ball Girls", "Tug Of War", "100m - 200m Boys", "Relay Girls Boys",
  "Mixed Relay", "Long Jump Boys", "Track Event", "Box Cricket", "Dodge Ball",
  "Carrom B/g", "Chess B/g", "table tennis B/g", "dart B/g", "Badminton B/g"
];

const Score = () => {
  const [scoreData, setScoreData] = useState(null);
  const accessToken = localStorage.getItem('access-token')

  const getScore = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/scoreboard/complete_scoreboard/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await response.json();
    console.log(data)
    setScoreData(data)
  }

  useEffect(() => {
    getScore();
  }, [])

  if (!scoreData) return <div>Loading...</div>

  const departments = Array.from(new Set(scoreData.class_totals.map(ct => ct.department)));

  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Cultural background" />
      <img src='/banner-1.png' className='fixed -bottom-5 z-0'/>
      <div className="space-y-8 relative z-20 top-20 px-4 flex flex-col justify-center items-center min-h-screen pb-20">
        <motion.div 
          className="text-4xl md:text-5xl ysabeau-sc text-center mb-8 text-[#966742] fixed z-20 top-36"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src='/frame.png' className='absolute -top-[3rem] sm:-top-16 -z-10 w-full '/>
          <h1 className='ysabeau-sc relative z-40'>Score Board</h1>
        </motion.div>
        
        <div className='w-full mt-32 relative top-32'>
          <div className="overflow-x-auto border rounded-lg bg-white/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-bold bg-amber-100/50 sticky left-0 z-10">Events</TableHead>
                  {departments.map(dept => (
                    <TableHead 
                      key={dept} 
                      className="whitespace-nowrap font-semibold text-center border-l px-6"
                    >
                      {dept}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {EVENTS.map((eventName, idx) => (
                  <TableRow key={eventName} className="border-b">
                    <TableCell className="font-medium whitespace-nowrap bg-amber-50/50 sticky left-0 z-10">
                      {eventName}
                    </TableCell>
                    {departments.map(department => {
                      const subEvent = scoreData.sub_event_scores.find(
                        se => se.name.toLowerCase() === eventName.toLowerCase()
                      );
                      const score = subEvent?.scores[`${department}`]?.score;
                      return (
                        <TableCell 
                          key={`${eventName}-${department}`}
                          className="text-center border-l px-6"
                        >
                          {score || '-'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-amber-200">
                  <TableCell className="font-bold whitespace-nowrap bg-amber-100/50 sticky left-0 z-10">
                    Total Score
                  </TableCell>
                  {departments.map(department => (
                    <TableCell 
                      key={`total-${department}`}
                      className="font-bold text-center border-l px-6 bg-amber-50/50"
                    >
                      {scoreData.class_totals.find(ct => ct.department === department)?.total_score || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className='w-full max-w-4xl mb-8'>
          <h2 className="text-xl font-semibold mb-4 text-center text-amber-900 cinzel-bold">Department Rankings</h2>
          <div className="border rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-center w-32">Rank</TableHead>
                  <TableHead className="border-l">Department</TableHead>
                  <TableHead className="border-l text-center w-40">Total Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoreData.department_rankings.sort((a, b) => a.rank - b.rank).map(ranking => (
                  <TableRow key={ranking.department} className="border-b">
                    <TableCell className="text-center font-semibold">{ranking.rank}</TableCell>
                    <TableCell className="border-l">{ranking.department}</TableCell>
                    <TableCell className="border-l text-center">{ranking.total_points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Score

