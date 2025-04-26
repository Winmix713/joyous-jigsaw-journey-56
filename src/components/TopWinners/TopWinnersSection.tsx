
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopWinnersSection = () => {
  return (
    <Card className="bg-gaming-dark border-gaming-gray mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <span>Top Winners</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gaming-blue">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8">
        <p className="text-gray-400">No recent winners</p>
      </CardContent>
    </Card>
  );
};

export default TopWinnersSection;
