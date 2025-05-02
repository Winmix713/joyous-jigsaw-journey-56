
import React from 'react';
import SportCard from './SportCard';
import { useNavigate } from 'react-router-dom';

const SportCardsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const sportCards = [
    {
      id: 1,
      title: 'Premier League: London Derby',
      description: 'Arsenal vs Chelsea',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png'
    },
    {
      id: 2,
      title: 'La Liga: El Clásico',
      description: 'Real Madrid vs Barcelona',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png'
    },
    {
      id: 3,
      title: 'Champions League',
      description: 'Bayern Munich vs PSG',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png'
    },
    {
      id: 4,
      title: 'Serie A',
      description: 'Juventus vs Inter Milan',
      imageUrl: '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png'
    }
  ];

  const handleCardClick = (id: number) => {
    navigate(`/match/${id}`);
  };

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4 premier-gradient-text">Featured Matches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sportCards.map((card) => (
          <SportCard
            key={card.id}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SportCardsSection;
