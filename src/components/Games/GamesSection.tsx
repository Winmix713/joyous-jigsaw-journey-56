
import React from 'react';
import GameCategories from './GameCategories';

const GamesSection = () => {
  return (
    <section className="py-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Games</h2>
        <div className="flex gap-2">
          <div className="text-xs bg-gaming-blue text-white px-2 py-1 rounded-md flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            0 Live
          </div>
          <div className="text-xs bg-gaming-gray text-white px-2 py-1 rounded-md">
            0 Upcoming
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <GameCategories />
      </div>
      
      <div className="bg-gaming-dark rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-gaming-gray rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-gray-400">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
        <p className="text-xl text-gray-400">No games found in this category</p>
      </div>
    </section>
  );
};

export default GamesSection;
