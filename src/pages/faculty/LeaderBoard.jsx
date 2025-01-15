import React, { useState, useEffect } from 'react';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { CustomCard } from '../../components/ui/CustomCard';
import { LeaderboardTopCard } from '../../components/LeaderboardTopCard';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/overall-standings`, {
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
        <img src='/maharaj.png' className='fixed top-10 scale-x-[-1] -left-20 z-0 ' alt="Event background" />
        <img src='/leader.png' className='fixed bottom-0 right-0 z-0 h-80 sm:h-[30rem] ' alt="Event background" />
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

  const departments = ["all", ...new Set(leaderboardData?.department_standings.map(dept => dept.department))];

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
      <img src='/maharaj.png' className='fixed top-10 scale-x-[-1] -left-20 z-0 ' alt="Event background" />
      <img src='/leader.png' className='fixed bottom-0 right-0 z-0 h-80 sm:h-[30rem] ' alt="Event background" />
      <div className="min-h-screen relative pt-16">
        <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Departments</h3>
              <p className="text-3xl font-bold text-amber-800">{leaderboardData.department_standings.length}</p>
            </CustomCard>
            <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-amber-800">
                {leaderboardData.department_standings.reduce((acc, curr) => acc + curr.total_events, 0)}
              </p>
            </CustomCard>
            <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Aura Points</h3>
              <p className="text-3xl font-bold text-amber-800">
                {leaderboardData.department_standings.reduce((acc, curr) => acc + curr.total_aura_points, 0)}
              </p>
            </CustomCard>
          </div>

          {/* Department Rankings */}
          <CustomCard className='bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900'>
            <h3 className="text-xl font-semibold mb-6 text-amber-900">Department Rankings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboardData.department_standings
                .sort((a, b) => b.total_aura_points - a.total_aura_points)
                .map((dept, index) => (
                  <LeaderboardTopCard
                    key={dept.department}
                    team={{
                      name: dept.department,
                      score: dept.total_aura_points,
                      rank: index + 1
                    }}
                    index={index}
                  />
                ))}
            </div>
          </CustomCard>

          {/* Detailed Standings */}
          <CustomCard className='bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900'>
            <div className="flex sm:flex-row flex-col justify-between items-center mb-6">
              <h3 className="sm:text-xl font-semibold text-amber-900">Detailed Standings</h3>
              <CustomSelect
                options={departments}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Aura Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Events</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboardData.detailed_standings
                    .filter(standing => selectedDepartment === "all" || standing.department === selectedDepartment)
                    .map((standing, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{standing.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standing.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{standing.division}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{standing.total_aura_points}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{standing.total_events}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CustomCard>
        </div>
      </div>
    </>
  );
}

