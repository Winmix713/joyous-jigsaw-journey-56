
import React from 'react';
import { cn } from '@/lib/utils';
import { Flame, Clock, Trophy, Gamepad2 } from 'lucide-react';

interface CategoryProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  count?: number;
  onClick: () => void;
}

const CategoryButton = ({ label, icon, active = false, count, onClick }: CategoryProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-md transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted text-muted-foreground"
      )}
      onClick={onClick}
    >
      <span className={active ? "text-primary-foreground" : "text-primary"}>{icon}</span>
      <span>{label}</span>
      {count !== undefined && (
        <span className={cn(
          "text-xs py-0.5 px-2 rounded-full ml-1",
          active ? "bg-white/20" : "bg-muted"
        )}>
          {count}
        </span>
      )}
    </button>
  );
};

interface GameCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  liveCount: number;
  upcomingCount: number;
}

const GameCategories = ({ 
  activeCategory, 
  setActiveCategory,
  liveCount,
  upcomingCount
}: GameCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <CategoryButton 
        label="All" 
        icon={<Trophy className="w-4 h-4" />}
        active={activeCategory === 'all'}
        onClick={() => setActiveCategory('all')}
      />
      <CategoryButton 
        label="Live" 
        active={activeCategory === 'live'}
        count={liveCount}
        icon={<Flame className="w-4 h-4" />}
        onClick={() => setActiveCategory('live')}
      />
      <CategoryButton 
        label="Upcoming" 
        active={activeCategory === 'upcoming'}
        count={upcomingCount}
        icon={<Clock className="w-4 h-4" />}
        onClick={() => setActiveCategory('upcoming')}
      />
      <CategoryButton 
        label="Sports" 
        active={activeCategory === 'sports'}
        icon={<Trophy className="w-4 h-4" />}
        onClick={() => setActiveCategory('sports')}
      />
      <CategoryButton 
        label="eSports" 
        active={activeCategory === 'esports'}
        icon={<Gamepad2 className="w-4 h-4" />}
        onClick={() => setActiveCategory('esports')}
      />
    </div>
  );
};

export default GameCategories;
