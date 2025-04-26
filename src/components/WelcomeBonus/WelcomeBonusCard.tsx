
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const WelcomeBonusCard = () => {
  return (
    <Card className="bg-gaming-dark border-gaming-gray mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">Welcome Bonus</h3>
        <p className="text-gray-300 mb-4">New to WinMix? Get 500 bonus points on your first deposit!</p>
        <Button className="bg-gaming-blue hover:bg-gaming-blue-dark w-full">Claim Bonus</Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeBonusCard;
