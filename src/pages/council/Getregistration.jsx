
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, Book, School, Users2, Hash } from "lucide-react"
import { TbMoodEmpty } from 'react-icons/tb'
import {motion} from 'motion/react'
import { useNavigate } from 'react-router-dom'

const UserDetailsDialog = ({ user, isOpen, setIsOpen, title }) => {
  if (!user) return null;

  const getUserTypeColor = (userType) => {
    switch(userType) {
      case 'COUNCIL':
        return 'bg-purple-100 text-purple-800';
      case 'STUDENT':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const infoItems = [
    { icon: <Mail className="w-4 h-4" />, label: "Email", value: user.email },
    { icon: <Phone className="w-4 h-4" />, label: "Phone", value: user.phone },
    { icon: <Book className="w-4 h-4" />, label: "Department", value: user.department },
    { icon: <School className="w-4 h-4" />, label: "Year & Division", value: `${user.yearOfStudy} Year - ${user.division}` },
    { icon: <Hash className="w-4 h-4" />, label: "Roll Number", value: user.rollNumber },
    { icon: <Users2 className="w-4 h-4" />, label: "Gender", value: user.gender === 'M' ? 'Male' : 'Female' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src={user.profilePicture || '/api/placeholder/96/96'} 
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <span className={`absolute bottom-0 right-0 px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                {user.userType}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{user.bio || "No bio provided"}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 text-gray-500">
                  {item.icon}
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {user.idCardDocument && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-2">ID Card</p>
              <img 
                src={user.idCardDocument} 
                alt="ID Card"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const fetchTeamData = async (registrationNumber) => {
  const token = localStorage.getItem('access-token')
  if (!token) {
    throw new Error('Authentication required')
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/get_by_registration_number/?registration_number=${registrationNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed')
      }
      if (response.status === 404) {
        throw new Error('Team not found')
      }
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response:', data)

    if (!data) {
      throw new Error('No data received from API')
    }

    const processMemberData = (member) => ({
      name: member?.username || 'Unknown',
      email: member?.email || 'No email provided',
      phone: member?.phone || 'No phone provided',
      department: member?.department || 'Not specified',
      profilePicture: member?.profile_picture || null,
      userType: member?.user_type || 'STUDENT',
      bio: member?.bio || null,
      division: member?.division || 'Not specified',
      rollNumber: member?.roll_number || 'Not specified',
      yearOfStudy: member?.year_of_study || 'Not specified',
      gender: member?.gender || 'Not specified',
      idCardDocument: member?.id_card_document || null
    });

    const leaderData = data.team_leader ? processMemberData(data.team_leader) : {
      name: 'Not assigned',
      email: 'Not assigned',
      phone: 'Not assigned',
      department: 'Not assigned',
      profilePicture: null,
      userType: 'STUDENT',
      bio: null,
      division: 'Not assigned',
      rollNumber: 'Not assigned',
      yearOfStudy: 'Not assigned',
      gender: 'Not assigned',
      idCardDocument: null
    };

    const members = Array.isArray(data.team_members) ? data.team_members.map(member => processMemberData(member)) : [];

    const formattedData = {
      id: data.id,
      registrationId: data.registration_number || registrationNumber,
      teamName: data.team_name || 'Unnamed Team',
      leader: leaderData,
      members: members,
      department: data.department || 'Not specified',
      year: data.year || 'Not specified',
      division: data.division || 'Not specified',
      status: data.status || 'PENDING',
      paymentStatus: data.payment_status || 'PENDING',
      registrationDate: data.registration_date ? 
        new Date(data.registration_date).toLocaleDateString() : 
        'Date not available'
    }

    console.log('Formatted Data:', formattedData)
    return formattedData

  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      stack: error.stack,
    })
    throw error
  }
}



export default function TeamSearch() {
  const [searchRegistrationNumber, setSearchRegistrationNumber] = useState('')
  const [teamData, setTeamData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isLeaderDialogOpen, setIsLeaderDialogOpen] = useState(false)
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'));
  const  navigate=useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await fetchTeamData(searchRegistrationNumber)
      setTeamData(data)
    } catch (err) {
      if (err.message === 'Authentication required') {
        setError('Please login to search for teams')
      } else if (err.message === 'Authentication failed') {
        setError('Your session has expired. Please login again.')
      } else {
        setError('Failed to fetch team data. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrationAction = async (action) => {
    const token = localStorage.getItem('access-token')
    if (!token) {
      setError('Please login to perform this action')
      return
    }

    if (action === 'reject' && !isRejectDialogOpen) {
      setIsRejectDialogOpen(true)
      return
    }

    setActionLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL
      const endpoint = action === 'accept' 
        ? `${API_BASE_URL}/api/events/registrations/${teamData.id}/approve/`
        : `${API_BASE_URL}/api/events/registrations/${teamData.id}/reject/`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: action === 'reject' ? JSON.stringify({ reason: rejectReason }) : null
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} registration`)
      }

      const result = await response.json()
      setSuccessMessage(result.message)
      
      setTeamData(prev => ({
        ...prev,
        status: result.status
      }))

      if (isRejectDialogOpen) {
        setIsRejectDialogOpen(false)
        setRejectReason('')
      }

    } catch (err) {
      setError(`Failed to ${action} registration. Please try again.`)
    } finally {
      setActionLoading(false)
    }
  }


  useEffect(() => {
  if(!(user.user_type==='COUNCIL')){
navigate('/');
  }
    
  }, [user])
  

  return (
    <>
 <img src='/vintage-2.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-amber-900 mb-8">Council Team Search</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center border-b border-gray-300 bg-white bg-opacity-70 py-2 px-2">
            <input
              type="text"
              value={searchRegistrationNumber}
              onChange={(e) => setSearchRegistrationNumber(e.target.value)}
              placeholder="Enter Registration ID"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <Button
              type="submit"
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {teamData ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Team Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Registration ID: {teamData.registrationId}</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Team Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{teamData.teamName}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{teamData.department}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Year & Division</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{teamData.year} - {teamData.division}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{teamData.registrationDate}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      teamData.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      teamData.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {teamData.status}
                    </span>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Team Leader</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div 
                      className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      onClick={() => setIsLeaderDialogOpen(true)}
                    >
                      {teamData.leader.profilePicture && (
                        <img 
                          src={teamData.leader.profilePicture} 
                          alt={teamData.leader.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{teamData.leader.name}</p>
                        <p className="text-xs text-gray-500">{teamData.leader.email}</p>
                      </div>
                    </div>
                  </dd>
                </div>
                {teamData?.members.length > 0 && (
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Team Members</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {teamData.members.map((member, index) => (
                <li 
                  key={index} 
                  className="pl-3 pr-4 py-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedMember(member);
                    setIsMemberDialogOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    {member.profilePicture && (
                      <img 
                        src={member.profilePicture} 
                        alt={member.name}
                        className="h-8 w-8 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
                </dl>
              </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button
                onClick={() => handleRegistrationAction('accept')}
                disabled={actionLoading || teamData.status !== 'PENDING'}
                variant="default"
                className="mr-2"
              >
                {actionLoading ? 'Processing...' : 'Accept Registration'}
              </Button>
              <Button
                onClick={() => handleRegistrationAction('reject')}
                disabled={actionLoading || teamData.status !== 'PENDING'}
                variant="destructive"
              >
                {actionLoading ? 'Processing...' : 'Reject Registration'}
              </Button>
            </div>
          </div>
        ):(
          <>
          <motion.div 
            className="text-center  flex items-center justify-center flex-col py-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TbMoodEmpty size={90} className='text-amber-900'/>

            <h3 className="text-md sm:text-2xl font-semibold text-amber-900 ">No Assigned Events</h3>
            <p className="text-gray-600 text-sm sm:text-md mt-2">You currently have no events assigned to you.</p>
          </motion.div>

          </>
        )}

        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Registration</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejecting this registration:</p>
              <Input
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason"
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRejectDialogOpen(false)
                  setRejectReason('')
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleRegistrationAction('reject')}
                disabled={!rejectReason.trim() || actionLoading}
              >
                {actionLoading ? 'Processing...' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <UserDetailsDialog 
        user={teamData?.leader}
        isOpen={isLeaderDialogOpen}
        setIsOpen={setIsLeaderDialogOpen}
        title="Team Leader Details"
      />

      <UserDetailsDialog 
        user={selectedMember}
        isOpen={isMemberDialogOpen}
        setIsOpen={setIsMemberDialogOpen}
        title="Team Member Details"
      />
      </div>
    </div>
    </>
  )
}