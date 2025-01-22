"use client"

import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import Papa from "papaparse"

const CSV_URL = "/files/scores.csv"

const Score = () => {
  const [scoreData, setScoreData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL)
        const csvText = await response.text()
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setScoreData(results.data)
            setIsLoading(false)
          },
          error: (error) => {
            console.error("Papaparse error:", error)
            setIsLoading(false)
          },
        })
      } catch (error) {
        console.error("Failed to fetch CSV data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )

  if (!scoreData.length) return <div className="text-center text-red-500">Failed to load score data.</div>

  const departments = Object.keys(scoreData[0]).filter((key) => key !== "Sports Events")

  // Sort departments by total score
  const sortedDepartments = [...departments].sort((a, b) => {
    const totalA = Number.parseInt(scoreData.find((row) => row["Sports Events"] === "TOTAL")?.[a] || "0")
    const totalB = Number.parseInt(scoreData.find((row) => row["Sports Events"] === "TOTAL")?.[b] || "0")
    return totalB - totalA
  })

  return (
    <>
      <img src="/event-background.jpg" className="fixed object-cover h-full w-full" alt="Cultural background" />
      <img src="/banner-1.png" className="fixed -bottom-5 z-0 " alt="Banner" />
      <div className="space-y-4 md:space-y-8 relative z-20 w-full flex flex-col justify-center items-center min-h-screen pb-20">
        <motion.div
          className="mt-4 md:mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* <ScrollArea className="h-[calc(100vh-8rem)] border top-8 md:h-[calc(100vh-16rem)] w-full overflow-x-auto min-h-screen rounded-lg backdrop-blur-sm"> */}
            <div className="p-4">
              <h2 className="cinzel font-semibold w-full mb-2 md:mb-4 text-center text-amber-900 text-xl sm:text-3xl md:text-5xl">
                Score Board
              </h2>
              <div className="relative overflow-x-auto rounded-xl max-h-[64rem] bg-amber-50/50">
                <Table className="w-full">
                  <TableHeader className="bg-amber-100/50 sticky top-0 z-30">
                    <TableRow>
                      <TableHead className="font-bold text-xl bg-amber-100/50 sticky left-0 z-10">Events\Department</TableHead>
                      {departments.map((dept) => (
                        <TableHead
                          key={dept}
                          className="bg-amber-100/50 text-xl font-semibold text-center border-l break-words w-fit"
                        >
                          {dept}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="relative">
                    {scoreData.map((row, index) => (
                      <TableRow key={index} className={`${index%2===0 ? 'bg-amber-50/50' : 'bg-amber-100/50'} ${index===scoreData.length-1 ? 'sticky bottom-0 z-30 bg-amber-200' : ''} `}>
                        <TableCell className="text-xl bg-amber-50/50 sticky left-0 z-10">
                          {row["Sports Events"]}
                        </TableCell>
                        {departments.map((dept) => (
                          <TableCell key={`${row["Sports Events"]}-${dept}`} className="text-center text-xl border-l">
                            {row[dept] || "--"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold my-4 md:my-8 text-center text-amber-900 font-cinzel">
                Department Rankings
              </h2>
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
                    {sortedDepartments.map((department, index) => {
                      const totalPoints = scoreData.find((row) => row["Sports Events"] === "TOTAL")?.[department] || "0"
                      return (
                        <TableRow key={department}>
                          <TableCell className="text-center font-semibold bg-amber-50/50">{index + 1}</TableCell>
                          <TableCell className="border-l">{department}</TableCell>
                          <TableCell className="border-l text-center bg-amber-50/50">{totalPoints}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          {/* </ScrollArea> */}
        </motion.div>
      </div>
    </>
  )
}

export default Score

