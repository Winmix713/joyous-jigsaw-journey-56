
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Calendar, Users, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SportCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
  date?: string;
  viewerCount?: number;
  leagueName?: string;
  isLive?: boolean;
}

const SportCard: React.FC<SportCardProps> = ({
  title,
  description,
  imageUrl = '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
  onClick,
  date = 'Today, 20:00',
  viewerCount,
  leagueName,
  isLive = false,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden border-0 rounded-xl relative w-full h-auto",
        "shadow-lg hover:shadow-primary/20 transition-all duration-300",
        "transform hover:-translate-y-1 group bg-gaming-card-bg"
      )}
    >
      {/* Image with overlay */}
      <div 
        className="w-full h-40 relative overflow-hidden"
        style={{
          background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : 'linear-gradient(to bottom, #444, #111)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/80 text-white px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
        )}
        
        {/* League badge */}
        {leagueName && (
          <div className="absolute top-3 right-3 bg-black/40 text-white px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm">
            {leagueName}
          </div>
        )}
      </div>
      
      {/* Card content */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-white font-medium leading-tight group-hover:text-primary transition-colors">{title}</h3>
            {description && (
              <p className="text-gray-400 text-sm mt-1">{description}</p>
            )}
          </div>
          
          <Button 
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-primary/20 text-white hover:text-primary transition-colors"
            onClick={onClick}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Match details */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
          )}
          
          {viewerCount !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{viewerCount} watching</span>
            </div>
          )}
          
          {leagueName && (
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              <span>{leagueName}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SportCard;
