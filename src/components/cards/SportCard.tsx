
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface SportCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const SportCard: React.FC<SportCardProps> = ({
  title,
  description,
  imageUrl = '/lovable-uploads/357dfb0c-e744-4543-a6a7-41ae072d46fa.png', // Default to the uploaded image
  onClick,
}) => {
  return (
    <Card className="overflow-hidden border-0 rounded-xl bg-black relative w-full h-auto shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <div 
        className="w-full h-36 relative overflow-hidden"
        style={{
          background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : 'linear-gradient(to bottom, #444, #111)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium leading-tight">{title}</h3>
          {description && (
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>
        
        <Button 
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          onClick={onClick}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default SportCard;
