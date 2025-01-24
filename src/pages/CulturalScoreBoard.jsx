"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Papa from "papaparse"
import { useSpring, animated } from "react-spring"
import Confetti from "react-confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal } from "lucide-react"

const CSV_URL = "/files/finals.csv"

const Score = () => {
  const [scoreData, setScoreData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const springProps = useSpring({
    to: { opacity: 1, transform: "translateY(0px)" },
    from: { opacity: 0, transform: "translateY(-50px)" },
    reset: true,
    delay: 200,
  })

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
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 10000000) // Stop confetti after 5 seconds
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

  const departments = Object.keys(scoreData[0]).filter((key) => key !== "Events")

  // Sort departments by total score
  const sortedDepartments = [...departments].sort((a, b) => {
    const totalA = Number.parseInt(scoreData.find((row) => row["Events"] === "TOTAL")?.[a] || "0")
    const totalB = Number.parseInt(scoreData.find((row) => row["Events"] === "TOTAL")?.[b] || "0")
    return totalB - totalA
  })

  const winner = sortedDepartments[0]
  const winnerScore = scoreData.find((row) => row["Events"] === "TOTAL")?.[winner] || "0"

  const getEventWinners = (event) => {
    const eventScores = departments.map((dept) => ({
      department: dept,
      score: Number.parseInt(scoreData.find((row) => row["Events"] === event)?.[dept] || "0"),
    }))
    return eventScores.sort((a, b) => b.score - a.score).slice(0, 3)
  }

  return (
    <>
      <img src="/event-background.jpg" className="fixed object-cover h-full w-full" alt="Cultural background" />
      <img src="/banner-1.png" className="fixed -bottom-5 z-0 " alt="Banner" />
      {showConfetti && <Confetti />}
      <div className="space-y-4 md:space-y-8 relative z-20 top-20 w-full flex flex-col justify-center items-center min-h-screen pb-20 px-4">
        <motion.div
          className="mt-4 md:mt-16 w-full max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <animated.div style={springProps} className="text-center mb-8 flex flex-col gap-10">
          <h1 className="text-3xl md:text-7xl font-bold text-amber-900 mb-2">Aurora 2k25</h1>
            <h1 className="text-3xl md:text-5xl font-bold text-amber-900 mb-2">Congratulations!</h1>
            {/* <p className="text-xl md:text-2xl text-amber-700">
              {winner} wins with {winnerScore} points!
            </p> */}
          </animated.div>

          {/* <h2 className="cinzel font-semibold w-full mb-6 text-center text-amber-900 text-2xl sm:text-3xl md:text-4xl">
            Overall Rankings
          </h2> */}

          <div className="relative top-10 flex flex-col gap-10 justify-center items-center w-full">
            {sortedDepartments.map((department, index) => {
              const totalPoints = scoreData.find((row) => row["Events"] === "TOTAL")?.[department] || "0"
              const isTopThree = index < 3
              return (
                <motion.div
                initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            //   whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 1, duration: 0.5 }}

                 key={department} className={`cinzel ${index===0 ? "col-span-1 md:col-span-2 lg:col-span-1 rounded bg-gradient-to-r from-amber-400 to-yellow-300 scale-125" : ""} ${index===1 ? "col-span-1 md:col-span-2 lg:col-span-1 rounded bg-gradient-to-r from-gray-400 to-blue-300 scale-110" : ""} ${index===2 ? "col-span-1 md:col-span-2 lg:col-span-1 rounded bg-gradient-to-r from-amber-800 to-amber-500 scale-105 " : ""} rounded-xl overflow-hidden`}>
                    {/* <div className="flex gap-10 items-center">

                      {isTopThree &&
                        (index === 0 ? (
                          <Trophy className="h-32 w-32 text-amber-900" />
                        ) : index === 1 ? (
                          <Medal className="h-32 w-32 text-gray-600" />
                        ) : (
                          <Medal className="h-32 w-32 text-amber-700" />
                        ))}
                     <span className={`${index==0 ? "text-7xl font-semibold" : "text-3xl"}`}>{department}</span>
                     <span className={`${isTopThree ? "text-3xl" : "text-xl"} font-bold text-center py-4`}>
                    {totalPoints} points
                  </span>
                    </div> */}


                
                <Card
                  key={department}
                  className={`${isTopThree ? "col-span-1 md:col-span-2 lg:col-span-1 p-10 " : ""} w-[100vh] rounded-xl overflow-hidden`}
                >
                  {/* <CardHeader
                    className={`${isTopThree ? "bg-gradient-to-r from-amber-400 to-yellow-300" : "bg-amber-100"}`}
                  >
                    <CardTitle className="flex justify-between items-center">
                      <span className={`${isTopThree ? "text-2xl" : "text-lg"}`}>{department}</span>
                      {isTopThree &&
                        (index === 0 ? (
                          <Trophy className="h-8 w-8 text-amber-900" />
                        ) : index === 1 ? (
                          <Medal className="h-8 w-8 text-gray-600" />
                        ) : (
                          <Medal className="h-8 w-8 text-amber-700" />
                        ))}
                    </CardTitle>
                  </CardHeader> */}
                  <CardContent className={`${isTopThree ? "text-3xl" : "text-xl"} font-bold text-center py-4`}>
                  <div className="flex gap-10 items-center justify-between w-full">
                    <div className={`${isTopThree ? "relative" : "hidden"}`}>

                  <span className={`text-8xl`}>{index+1}</span>

                        {isTopThree &&
                        (index === 0 ? (
                            <Trophy className="h-32 w-32 text-amber-900" />
                        ) : index === 1 ? (
                            <Medal className="h-32 w-32 text-gray-600" />
                        ) : (
                            <Medal className="h-32 w-32 text-amber-400" />
                        ))}
                       
                        
                    </div>
                    <span className={`${isTopThree ? "hidden" : "relative px-10 text-3xl"}`}>{index+1}</span>

                        <span className={`cinzel ${index==0 ? "text-7xl font-semibold" : "text-3xl"} ${index==1 ? "text-6xl font-semibold" : "text-3xl"} ${index==2 ? "text-5xl font-semibold" : "text-3xl"}`}>{department}</span>
                        <span className={`cinzel ${isTopThree ? "text-6xl" : "text-xl"} font-bold text-center py-4`}>
                        {totalPoints} points
                        </span>
                        </div>
                  </CardContent>
                </Card>
                </motion.div>
              )
            })}
          </div>

          {/* <h2 className="cinzel font-semibold w-full my-8 text-center text-amber-900 text-2xl sm:text-3xl md:text-4xl">
            Event Winners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scoreData
              .filter((row) => row["Events"] !== "TOTAL")
              .map((row) => (
                <Card key={row["Events"]} className="overflow-hidden">
                  <CardHeader className="bg-amber-100">
                    <CardTitle>{row["Events"]}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    {getEventWinners(row["Events"]).map((winner, index) => (
                      <div key={winner.department} className="flex justify-between items-center mb-2">
                        <span>{winner.department}</span>
                        <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
                          {winner.score} points
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div> */}
        </motion.div>
      </div>
    </>
  )
}

export default Score

