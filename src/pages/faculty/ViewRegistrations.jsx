import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ViewRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('group');
  const { id } = useParams();
  const accessToken = localStorage.getItem('access-token');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/registrations/?sub_event=${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }

        const data = await response.json();
        setRegistrations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [id, accessToken]);

  const filteredRegistrations = registrations.filter(registration => {
    const searchValue = searchTerm.toLowerCase();
    if (activeTab === 'group') {
      return registration.team_name && registration.team_name.toLowerCase().includes(searchValue);
    } else {
      return !registration.team_name && registration.team_members[0].full_name.toLowerCase().includes(searchValue);
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 relative top-20"
    >
      <h1 className="text-2xl font-bold mb-4">View Registrations</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by team name or participant name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'group' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('group')}
        >
          Group Events
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'single' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('single')}
        >
          Single Events
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-amber-100">
            <th className="border p-2">Registration No.</th>
            <th className="border p-2">{activeTab === 'group' ? 'Team Name' : 'Participant Name'}</th>
            <th className="border p-2">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((registration) => (
            <tr key={registration.id} className="hover:bg-gray-100">
              <td className="border p-2">{registration.registration_number}</td>
              <td className="border p-2">
                {activeTab === 'group' 
                  ? registration.team_name 
                  : registration.team_members[0].full_name}
              </td>
              <td className="border p-2">{registration.current_stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ViewRegistrations;

