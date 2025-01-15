"use client"

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area'

const EVENTS = [
  "Cricket", "Football", "Volleyball", "Kabbadi boys", "Kabbadi Girls",
  "Throw Ball Girls", "Tug Of War", "100m - 200m Boys", "Relay Girls Boys",
  "Mixed Relay", "Long Jump Boys", "Track Event", "Box Cricket", "Dodge Ball",
  "Carrom B/g", "Chess B/g", "table tennis B/g", "dart B/g", "Badminton B/g"
];

const Score = () => {
  const [scoreData, setScoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const getScore = async () => {
  //   try {
  //     const accessToken = localStorage.getItem('access-token')
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/scoreboard/complete_scoreboard/`, {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     })
  //     const data = await response.json();
  //     setScoreData(data)
  //   } catch (error) {
  //     console.error("Failed to fetch score data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    // getScore();
  }, [])

  // if (isLoading) return (
  //   <div className="flex justify-center items-center h-screen">
  //     <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-amber-500"></div>
  //   </div>
  // )

  // if (!scoreData) return <div className="text-center text-red-500">Failed to load score data.</div>

  const allDepartments = ['FE-A','FE-B','FE-C','FE-D','FE-E','FE-F' ,'SE-COM-A','SE-COM-B','SE-AI-C','SE-AI-D','SE-IT', 'SE-DE','TE-COM-A','TE-COM-B','TE-AI-C','TE-AI-D','TE-IT','TE-DE','BE-COM-A','BE-COM-B','BE-AI-C','BE-AI-D','BE-IT','BE-DE'];
  // const allFetchedDepartments= [...new Set([...scoreData?.class_totals?.map(ct => ct?.department), 'AIML', 'DE', 'IT'])];
  return (
    <>
      <img src='/event-background.jpg' className='fixed object-cover h-full w-full' alt="Cultural background" />
      <img src='/banner-1.png' className='fixed -bottom-5 z-0 ' alt="Banner" />
      <div className="space-y-4 md:space-y-8 relative z-20 w-full flex flex-col justify-center items-center min-h-screen pb-20">
        
        <motion.div 
          className='  mt-4 md:mt-16'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ScrollArea className="h-[calc(100vh-8rem)] border top-8 md:h-[calc(100vh-16rem)] w-full overflow-x-auto min-h-screen rounded-lg  backdrop-blur-sm">
            <div className="p-2 md:p-4">
              <h2 className="cinzel font-semibold mb-2 md:mb-4 text-center text-amber-900 text-xl sm:text-3xl md:text-5xl">Score Board</h2>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold bg-amber-100/50 sticky left-0 z-10 ">Events</TableHead>
                      {allDepartments.map(dept => (
                        <TableHead 
                          key={dept} 
                          className=" bg-amber-100/50 text-xs font-semibold text-center border-l break-words w-fit"
                        >
                          {dept}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {EVENTS.map((eventName) => (
                      <TableRow key={eventName}>
                        <TableCell className="text-xs  bg-amber-50/50 sticky left-0 z-10 ">
                          {eventName}
                        </TableCell>
                        {allDepartments.map(department => {
                          const subEvent = scoreData?.sub_event_scores.find(
                            se => se.name.toLowerCase() === eventName.toLowerCase()
                          );
                          const score = subEvent?.scores[department]?.score;
                          return (
                            <TableCell 
                              key={`${eventName}-${department}`}
                              className="text-center border-l  "
                            >
                              {score || '--'}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 border-amber-200">
                      <TableCell className="font-bold  bg-amber-100/50 sticky left-0 z-10 ">
                        Total Score
                      </TableCell>
                      {allDepartments.map(department => {
                        const totalScore = scoreData?.class_totals?.find(ct => ct.department === department)?.total_score;
                        return (
                          <TableCell 
                            key={`total-${department}`}
                            className="font-bold text-center break-words border-l px-2 md:px-6 bg-amber-50/50 "
                          >
                            {totalScore || '-'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold my-4 md:my-8 text-center text-amber-900 font-cinzel">Department Rankings</h2>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-amber-100/50">
                    <TableRow>
                      <TableHead className="text-center w-20 md:w-32">Rank</TableHead>
                      <TableHead className="border-l">Department</TableHead>
                      <TableHead className="border-l text-center w-28 md:w-40">Total Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allDepartments.map(department => {
                      const ranking = scoreData?.department_rankings?.find(r => r.department === department);
                      return (
                        <TableRow key={department}>
                          <TableCell className="text-center font-semibold bg-amber-50/50">{ranking?.rank || '--'}</TableCell>
                          <TableCell className="border-l">{department}</TableCell>
                          <TableCell className="border-l text-center bg-amber-50/50">{ranking?.total_points || '--'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </div>
    </>
  )
}

export default Score

