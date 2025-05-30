
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}

const CategoryButton = ({ label, icon, active = false, count, onClick }: CategoryProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-md transition-colors",
        active 
          ? "bg-gaming-blue text-white" 
          : "hover:bg-gaming-gray text-gray-300"
      )}
      onClick={onClick}
    >
      {icon && <span className="text-gaming-blue">{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span className={cn(
          "text-xs py-0.5 px-2 rounded-full ml-1",
          active ? "bg-white/20" : "bg-gaming-gray"
        )}>
          {count}
        </span>
      )}
    </button>
  );
};

const GameCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  return (
    <div className="flex flex-wrap gap-2">
      <CategoryButton 
        label="All" 
        active={activeCategory === 'all'}
        onClick={() => setActiveCategory('all')}
      />
      <CategoryButton 
        label="Live" 
        active={activeCategory === 'live'}
        count={0}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        }
        onClick={() => setActiveCategory('live')}
      />
      <CategoryButton 
        label="Upcoming" 
        active={activeCategory === 'upcoming'}
        count={0}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        }
        onClick={() => setActiveCategory('upcoming')}
      />
      <CategoryButton 
        label="Sports" 
        active={activeCategory === 'sports'}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M5.8 20.2 9 17l-.9-3.2-3.2-.9-3 3"></path>
            <path d="m8.3 10.4 3.2.9.9 3.2 3.2.9 3-3"></path>
            <path d="m18.2 3.8-3 3 .9 3.2 3.2.9 3-3"></path>
            <path d="m15.7 13.4-3.2-.9-.9-3.2-3.2-.9-3 3"></path>
          </svg>
        }
        onClick={() => setActiveCategory('sports')}
      />
      <CategoryButton 
        label="eSports" 
        active={activeCategory === 'esports'}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M6 11h4a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1z"></path>
            <path d="M15 10h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1z"></path>
            <path d="M9 6V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"></path>
            <path d="M9 18v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3"></path>
            <path d="M9 22h6"></path>
            <path d="M9 10v4a2 2 0 0 0 2 2h2"></path>
            <path d="M13 22v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"></path>
            <path d="M18 16h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"></path>
            <path d="M21 12v-2a1 1 0 0 0-1-1h-2"></path>
          </svg>
        }
        onClick={() => setActiveCategory('esports')}
      />
    </div>
  );
};

export default GameCategories;
