// src/app/leaderboard/page.jsx
import React, { useState, useEffect } from 'react';
import { CustomSelect } from '../components/ui/CustomSelect';
import { CustomCard } from '../components/ui/CustomCard';
import { LeaderboardTopCard } from '../components/LeaderboardTopCard';
import { LeaderboardTable } from '../components/LeaderboardTable';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("all");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await fetch('https://student-council-backend.onrender.com/api/events/scoreboard/complete_scoreboard/', {
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

  const events = ["all", ...leaderboardData?.sub_event_scores.map(event => event.name) || []];

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />

      <img src='/maharaj.png' className='fixed top-10 scale-x-[-1] -left-20 z-0 ' alt="Event background" />
    
    <img src='/leader.png' className='fixed bottom-0 right-0 z-0 h-80 sm:h-[30rem] ' alt="Event background" />
    <div className="min-h-screen  relative pt-16">

      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Departments</h3>
            <p className="text-3xl font-bold text-amber-800">{leaderboardData.summary.total_departments}</p>
          </CustomCard>
          <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Sub Events</h3>
            <p className="text-3xl font-bold text-amber-800">{leaderboardData.summary.total_sub_events}</p>
          </CustomCard>
          <CustomCard className="bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Total Points Awarded</h3>
            <p className="text-3xl font-bold text-amber-800">{leaderboardData.summary.total_points_awarded}</p>
          </CustomCard>
        </div>

        {/* Department Rankings */}
        <CustomCard className='bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900'>
          <h3 className="text-xl font-semibold mb-6 text-amber-900">Department Rankings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboardData.department_rankings.map((dept, index) => (
              <LeaderboardTopCard
                key={dept.department}
                team={{
                  name: dept.department,
                  score: dept.total_points,
                  rank: dept.rank
                }}
                index={index}
                
              />
            ))}
          </div>
        </CustomCard>

        {/* Sub Event Scores */}
        <CustomCard className='bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900'>
          <div className="flex sm:flex-row flex-col justify-between items-center mb-6">
            <h3 className="sm:text-xl font-semibold text-amber-900">Sub Event Scores</h3>
            <CustomSelect
              options={events}
              value={selectedEvent}
              onChange={setSelectedEvent}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.sub_event_scores
                  .filter(event => selectedEvent === "all" || event.name === selectedEvent)
                  .map(event => (
                    Object.entries(event.scores).map(([className, data]) => (
                      <tr key={`${event.id}-${className}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          <div className="text-xs text-gray-500">{event.event_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs break-words sm:text-sm text-gray-900">{`${data.year} ${data.department} ${data.division}`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {data.score}
                        </td>
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
          </div>
        </CustomCard>

        {/* Class Totals */}
        <CustomCard className='bg-amber-50 bg-opacity-50 rounded-xl backdrop-blur-sm border border-amber-900'>
          <h3 className="text-center text-md sm:text-xl text-amber-900 font-semibold mb-6">Class Totals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y  divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.class_totals.map((classData, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${classData.year} ${classData.department} ${classData.division}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {classData.total_score}
                    </td>
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