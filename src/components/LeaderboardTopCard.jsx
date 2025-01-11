import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { CustomBadge } from './ui/CustomBadge';
import { CustomProgress } from './ui/CustomProgress';
import { CustomCard } from './ui/CustomCard';

export const LeaderboardTopCard = ({ team, index }) => (
  <CustomCard
    className={`${
      index === 0 ? 'bg-yellow-50' : 
      index === 1 ? 'bg-gray-50' : 
      'bg-orange-50'
    } bg-opacity-90 border border-yellow-600 rounded-xl` }
  >
    <div className="flex items-center justify-between mb-2">
      <span>
        {index === 0 ? <Trophy className="h-4 w-4 text-yellow-500" /> :
         index === 1 ? <Award className="h-4 w-4 text-gray-500" /> :
         <Award className="h-4 w-4 text-orange-500" />}
      </span>
      <CustomBadge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
        {`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Place`}
      </CustomBadge>
    </div>
    <div className="sm:text-2xl text-amber-950 font-bold">{team.name}</div>
    <p className="text-xs text-gray-500">Score: {team.score}</p>
    <CustomProgress value={team.score} className="mt-2" />
  </CustomCard>
);
