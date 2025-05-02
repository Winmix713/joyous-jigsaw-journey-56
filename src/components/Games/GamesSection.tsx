
import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import GameCategories from './GameCategories';
import GamesList from './GamesList';

const GamesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { games } = useAppStore();
  
  const { liveGamesCount, upcomingGamesCount } = useMemo(() => {
    const liveGames = games.filter(game => game.status === "live");
    const upcomingGames = games.filter(game => game.status === "upcoming");
    
    return {
      liveGamesCount: liveGames.length,
      upcomingGamesCount: upcomingGames.length
    };
  }, [games]);
  
  return (
    <section className="py-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold premier-gradient-text">Games</h2>
        <div className="flex gap-2">
          <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            {liveGamesCount} Live
          </div>
          <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
            {upcomingGamesCount} Upcoming
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <GameCategories 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          liveCount={liveGamesCount}
          upcomingCount={upcomingGamesCount}
        />
      </div>
      
      <GamesList category={activeCategory} />
    </section>
  );
};

export default GamesSection;
