
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TournamentCardProps {
  title: string;
  prizePool: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const TournamentCard = ({ title, prizePool, status }: TournamentCardProps) => {
  return (
    <div className="bg-gaming-dark rounded-lg p-4 flex justify-between items-center mb-2 hover:bg-gaming-gray/50 transition-colors">
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-400">Prize pool: ${prizePool}</p>
      </div>
      <Badge 
        className={
          status === 'ongoing' 
            ? 'bg-gaming-blue hover:bg-gaming-blue-dark'
            : status === 'upcoming'
              ? 'bg-amber-600 hover:bg-amber-700' 
              : 'bg-green-600 hover:bg-green-700'
        }
      >
        {status === 'ongoing' ? 'Ongoing' : status === 'upcoming' ? 'Upcoming' : 'Completed'}
      </Badge>
    </div>
  );
};

export default TournamentCard;
