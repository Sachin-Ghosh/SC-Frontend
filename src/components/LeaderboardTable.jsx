

import React from 'react';
import { CustomBadge } from './ui/CustomBadge';

export const LeaderboardTable = ({ teams }) => (
  <div className="w-full overflow-hidden shadow-sm rounded-lg border">
    {/* Desktop version */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-4 w-[100px]">Rank</th>
            <th className="text-left p-4">Team</th>
            <th className="text-left p-4">Event</th>
            <th className="text-right p-4">Score</th>
            <th className="text-right p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{index + 1}</td>
              <td className="p-4">{team.name}</td>
              <td className="p-4">{team.event}</td>
              <td className="p-4 text-right">{team.score}</td>
              <td className="p-4 text-right">
                <CustomBadge
                  variant={
                    team.status === "top" ? "green" :
                    team.status === "at risk" ? "yellow" : "red"
                  }
                >
                  {team.status === "top" ? "Top" :
                   team.status === "at risk" ? "At Risk" : "Eliminated"}
                </CustomBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile version */}
    <div className="md:hidden">
      {teams.map((team, index) => (
        <div key={team.id} className="border-b p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">#{index + 1} {team.name}</div>
            <CustomBadge
              variant={
                team.status === "top" ? "green" :
                team.status === "at risk" ? "yellow" : "red"
              }
            >
              {team.status === "top" ? "Top" :
               team.status === "at risk" ? "At Risk" : "Eliminated"}
            </CustomBadge>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Event:</span>
              <span>{team.event}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Score:</span>
              <span>{team.score}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);