
import React from 'react';
import Header from '@/components/Layout/Header';
import GamesSection from '@/components/Games/GamesSection';
import TopWinnersSection from '@/components/TopWinners/TopWinnersSection';
import WelcomeBonusCard from '@/components/WelcomeBonus/WelcomeBonusCard';
import TournamentsSection from '@/components/Tournaments/TournamentsSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GamesSection />
            </div>
            <div>
              <TopWinnersSection />
              <WelcomeBonusCard />
              <TournamentsSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
