
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from '../UserProfile';

const Header = () => {
  return (
    <header className="border-b border-gaming-gray px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gaming-blue flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <Link to="/" className="text-xl font-bold">
            Win<span className="text-gaming-blue">Mix</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gaming-gray px-3 py-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gaming-blue">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-sm font-medium">1250 Points</span>
          </div>
          
          <div className="flex items-center gap-2 bg-gaming-gray px-3 py-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gaming-blue">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="text-sm font-medium">68% Win Rate</span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-white">
            <MoonIcon className="h-5 w-5" />
          </Button>
          
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
