
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import GamesSection from '@/components/Games/GamesSection';
import TopWinnersSection from '@/components/TopWinners/TopWinnersSection';
import WelcomeBonusCard from '@/components/WelcomeBonus/WelcomeBonusCard';
import TournamentsSection from '@/components/Tournaments/TournamentsSection';
import SportCardsSection from '@/components/cards/SportCardsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* New Sport Cards Section at the top */}
      <SportCardsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <GamesSection />
          
          {/* Soccer Championship Analysis Card */}
          <Card className="mt-6 glass-effect border-white/10 bg-gradient-to-br from-primary/20 to-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Soccer Championship Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analyze soccer league standings, track team performance, and manage match results with our comprehensive Soccer Championship Analysis tools.
              </p>
              <Button asChild className="premier-button">
                <Link to="/leagues">
                  View Leagues
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <TopWinnersSection />
          <WelcomeBonusCard />
          <TournamentsSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
