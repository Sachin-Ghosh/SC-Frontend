import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TbMoodEmpty } from 'react-icons/tb'

const MyGrievance = () => {
  const [grievances, setGrievances] = useState([])
  const [loading, setLoading] = useState(true)
  const accessToken = localStorage.getItem('access-token')

  const fetchGrievance = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/grievances/my-grievances/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json()
      console.log(data)
      setGrievances(data)
    } catch (error) {
      console.error('Error fetching grievances:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrievance()
  }, [])

  const getStatusBadge = (status) => {
    const statusColors = {
      PENDING: "bg-yellow-500",
      RESOLVED: "bg-green-500",
      REJECTED: "bg-red-500"
    }
    return (
      <Badge className={`${statusColors[status]} text-white`}>
        {status}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={30} />
      </div>
    )
  }

  if ( grievances.length === 0) {
    return (
      <>
       <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <img src='/royal-seal.png' className='z-10 fixed h-80 w-80 sm:h-96 sm:w-96 top-80 lg:top-52 lg:left-[36rem]'/>
      <div className='flex flex-col  justify-center items-center relative top-40 sm:top-80'>
      <h1 className="text-4xl sm:text-3xl font-bold mb-6 text-center cinzel-bold text-amber-700">My Grievances</h1>
      <div className='flex items-center justify-center flex-col px-3 top-40 relative z-50'>
                
<span  className='text-amber-900'><TbMoodEmpty size={100}/></span>
        <h1 className='relative z-50 text-2xl text-amber-900'>No Registered Events Yet</h1>
      </div>
        
      </div>
      </>
    )
  }

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <img src='/royal-seal.png' className='z-10 fixed h-80 opacity-40 w-80 sm:h-96 sm:w-96 top-80 lg:top-52 lg:left-[36rem]'/>
      <div className="container mx-auto py-8 px-4 relative z-20 top-24">
        <h1 className="text-4xl sm:text-3xl font-bold mb-6 text-center cinzel-bold text-amber-700">My Grievances</h1>
        
        <div className="hidden md:block px-12 relative z-20 ">
          <ScrollArea className="h-[calc(100vh-200px)] rounded-md border ">
            <Table className="bg-amber-100/50 backdrop-blur-sm">
              <TableHeader className="sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg">
                <TableRow>
                  <TableHead className="sticky top-0 bg-background">ID</TableHead>
                  <TableHead className="sticky top-0 bg-background">Title</TableHead>
                  <TableHead className="sticky top-0 bg-background">Type</TableHead>
                  <TableHead className="sticky top-0 bg-background">Description</TableHead>
                  <TableHead className="sticky top-0 bg-background">Submission Date</TableHead>
                  <TableHead className="sticky top-0 bg-background">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {grievances.map((grievance) => (
                  <TableRow key={grievance.id}>
                    <TableCell>{grievance.id}</TableCell>
                    <TableCell className="font-medium"><Link to={`/my-grievances/${grievance.id}`}>{grievance.title}</Link></TableCell>
                    <TableCell>{grievance.grievance_type}</TableCell>
                    <TableCell className="max-w-xs truncate">{grievance.description}</TableCell>
                    <TableCell>
                      {format(new Date(grievance.submission_date), 'PPp')}
                    </TableCell>
                    <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)] md:hidden">
          <div className="grid grid-cols-1 gap-4 relative z-20">
            {grievances.map((grievance) => (
              <Card key={grievance.id} className="border-2 backdrop-blur-sm border-amber-800 bg-white bg-opacity-45 shadow rounded-xl">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg"> <Link to={`/my-grievances/${grievance.id}`}>#{grievance.id} {grievance.title}</Link></CardTitle>
                    {getStatusBadge(grievance.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Type:</span> {grievance.grievance_type}
                    </div>
                    <div>
                      <span className="font-semibold">Description:</span>
                      <p className="text-sm text-muted-foreground">{grievance.description}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Submitted:</span>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(grievance.submission_date), 'PPp')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default MyGrievance

