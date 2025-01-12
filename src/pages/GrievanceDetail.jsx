import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import GrievanceDetail from '../components/grievance-detail'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import GrievanceDetail from '@/components/GrievanceDetail'

const GrievanceDetailPage = () => {
  const [grievance, setGrievance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const accessToken = localStorage.getItem('access-token')

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/grievances/${id}/`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        )
        setGrievance(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch grievance details')
      } finally {
        setLoading(false)
      }
    }

    fetchGrievance()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <img 
        src='/registration-back.jpg' 
        className='fixed object-cover h-full w-full' 
        alt="Background" 
      />
      <div className="px-4 py-8 relative z-10  top-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center ysabeau-sc text-amber-900">
            Grievance Details
          </h1>
          {grievance && <GrievanceDetail grievance={grievance} />}
        </div>
      </div>
    </div>
  )
}

export default GrievanceDetailPage

