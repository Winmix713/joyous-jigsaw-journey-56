
import React, { useState, useEffect } from 'react';
import SportCard from './SportCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SportCardsSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCards, setVisibleCards] = useState<number[]>([0, 1, 2, 3]);
  
  const categories = [
    { id: 'all', label: 'All Matches' },
    { id: 'live', label: 'Live' },
    { id: 'upcoming', label: 'Today' },
    { id: 'popular', label: 'Popular' },
  ];
  
  const sportCards = [
    {
      id: 1,
      title: 'Premier League: London Derby',
      description: 'Arsenal vs Chelsea',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Today, 20:00',
      viewerCount: 15420,
      leagueName: 'Premier League',
      isLive: true,
      category: ['all', 'live', 'popular']
    },
    {
      id: 2,
      title: 'La Liga: El Clásico',
      description: 'Real Madrid vs Barcelona',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Tomorrow, 21:00',
      viewerCount: 24150,
      leagueName: 'La Liga',
      isLive: false,
      category: ['all', 'upcoming', 'popular']
    },
    {
      id: 3,
      title: 'Champions League',
      description: 'Bayern Munich vs PSG',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Today, 18:45',
      viewerCount: 18320,
      leagueName: 'Champions League',
      isLive: true,
      category: ['all', 'live', 'upcoming', 'popular']
    },
    {
      id: 4,
      title: 'Serie A',
      description: 'Juventus vs Inter Milan',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Today, 19:30',
      viewerCount: 8750,
      leagueName: 'Serie A',
      isLive: false,
      category: ['all', 'upcoming']
    },
    {
      id: 5,
      title: 'Bundesliga',
      description: 'Bayern Munich vs Dortmund',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Today, 17:30',
      viewerCount: 12850,
      leagueName: 'Bundesliga',
      isLive: true,
      category: ['all', 'live', 'upcoming']
    },
    {
      id: 6,
      title: 'Ligue 1',
      description: 'PSG vs Marseille',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png',
      date: 'Tomorrow, 20:45',
      viewerCount: 9630,
      leagueName: 'Ligue 1',
      isLive: false,
      category: ['all', 'upcoming']
    }
  ];

  // Filter cards based on active category
  const filteredCards = sportCards.filter(card => 
    card.category.includes(activeCategory)
  );

  const handleCardClick = (id: number) => {
    navigate(`/match/${id}`);
  };
  
  const handleNext = () => {
    const maxStartIdx = Math.max(0, filteredCards.length - 4);
    const currentStartIdx = visibleCards[0];
    const newStartIdx = Math.min(currentStartIdx + 1, maxStartIdx);
    setVisibleCards([newStartIdx, newStartIdx + 1, newStartIdx + 2, newStartIdx + 3]);
  };
  
  const handlePrev = () => {
    const currentStartIdx = visibleCards[0];
    const newStartIdx = Math.max(0, currentStartIdx - 1);
    setVisibleCards([newStartIdx, newStartIdx + 1, newStartIdx + 2, newStartIdx + 3]);
  };
  
  // Update visible cards when category changes
  useEffect(() => {
    setVisibleCards([0, 1, 2, 3]);
  }, [activeCategory]);

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-bold premier-gradient-text">Featured Matches</h2>
        
        <div className="flex items-center mt-3 sm:mt-0">
          {/* Category tabs */}
          <div className="flex space-x-1 mr-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "px-3 py-1 text-xs rounded-full",
                  activeCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/30 text-muted-foreground hover:text-white"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
          
          {/* Navigation controls */}
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={handlePrev}
              disabled={visibleCards[0] === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={handleNext}
              disabled={visibleCards[3] >= filteredCards.length - 1 || filteredCards.length <= 4}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCards
            .filter((_, index) => visibleCards.includes(index))
            .map((card) => (
              <div key={card.id} className="animate-fade-in" style={{ animationDelay: `${card.id * 100}ms` }}>
                <SportCard
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                  onClick={() => handleCardClick(card.id)}
                  date={card.date}
                  viewerCount={card.viewerCount}
                  leagueName={card.leagueName}
                  isLive={card.isLive}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="bg-muted/20 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No matches available in this category right now.</p>
        </div>
      )}
    </div>
  );
};

export default SportCardsSection;
