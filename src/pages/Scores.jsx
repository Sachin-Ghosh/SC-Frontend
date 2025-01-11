import React, { useState, useEffect } from 'react';
import { CustomCard } from '../components/ui/CustomCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ScoresPage() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await fetch('https://student-council-backend.onrender.com/api/events/scoreboard/leaderboard/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (!response.ok) throw new Error('Failed to fetch leaderboard data');
        const data = await response.json();
        setLeaderboardData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

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
    <div className="min-h-screen pt-16 relative">
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">
        {/* Department Rankings */}
        <CustomCard className='rounded-xl bg-opacity-80 '>
          <h3 className="text-xl font-semibold mb-6">Department Rankings</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaderboardData.department_rankings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_score" fill="#78350F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        {/* Year Rankings */}
        <CustomCard className='rounded-xl bg-opacity-80 '>
          <h3 className="text-xl font-semibold mb-6">Year Rankings</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaderboardData.year_rankings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_score" fill="#92400E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        {/* Division Rankings */}
        <CustomCard className='rounded-xl bg-opacity-80 '>
          <h3 className="text-xl font-semibold mb-6">Division Rankings</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaderboardData.division_rankings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="division" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_score" fill="#B45309" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        {/* Class Rankings */}
        <CustomCard className='rounded-xl bg-opacity-80 '>
          <h3 className="text-xl font-semibold mb-6">Class Rankings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events Participated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.class_rankings.map((classData, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {classData.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classData.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classData.division}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classData.total_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classData.event_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CustomCard>

        {/* Score Cards for Mobile View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:hidden">
          {leaderboardData.class_rankings.map((classData, index) => (
            <CustomCard key={index} className='rounded-xl bg-opacity-80 '>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Class</span>
                  <span className="text-sm font-bold text-gray-900">
                    {`${classData.year} ${classData.department} ${classData.division}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Score</span>
                  <span className="text-sm font-bold text-amber-600">{classData.total_score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Events</span>
                  <span className="text-sm font-bold text-gray-900">{classData.event_count}</span>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}