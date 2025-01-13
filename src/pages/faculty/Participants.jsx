import React, { useState, useEffect } from 'react';
import { MdEmojiEmotions } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbMoodEmpty } from 'react-icons/tb';

const Participants = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        if (!eventId) {
          throw new Error('No event ID provided');
        }

        const accessToken = localStorage.getItem('access-token');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/sub_event_registrations/?sub_event_id=${eventId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch registrations: ${response.statusText}`);
        }

        const data = await response.json();
        setRegistrations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching registrations:', err);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  useEffect(() => {
    if (!eventId) {
      navigate('/faculty-dashboard');
    }
  }, [eventId, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.team_members.some(member => 
      member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
    <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
    <img src='/maharaj.png' className='fixed -bottom-10 h-[25rem] w-64 sm:h-auto sm:w-80 right-0' alt="Event background" />
    
    <div className="min-h-screen pt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center flex-col items-center lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Registrations</h1>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by team name, registration number, or participant details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96  px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* Registration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegistrations.map((registration) => (
            <div key={registration.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-amber-900">
                    {registration.team_name || 'No Team Name'}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(registration.status)}`}>
                    {registration.status}
                  </span>
                </div>

                {/* Registration Details */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Registration #:</span> {registration.registration_number}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span> {registration.department}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Year:</span> {registration.year}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Division:</span> {registration.division}
                  </p>
                </div>

                {/* Team Members */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                  <div className="space-y-2">
                    {[...(registration.team_leader ? [registration.team_leader] : []), ...registration.team_members].map((member, index) => (
                      member && (
                        <div key={index} className="flex items-center space-x-2">
                          {member.profile_picture ? (
                            <img 
                              src={`${import.meta.env.VITE_API_URL}${member.profile_picture}`} 
                              alt={member.full_name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-sm">
                                {member.full_name?.charAt(0) || '?'}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.full_name}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      )
                    ))}
                    {registration.team_members.length === 0 && !registration.team_leader && (
                      <p className="text-sm text-gray-500">No team members</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRegistrations.length === 0 && (
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
        )}
      </div>
    </div>
    </>
  );
};

export default Participants;