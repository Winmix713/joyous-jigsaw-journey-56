
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Bell, Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { MainNavigation } from "./Navigation";

// Define main navigation items
const mainNavItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Leagues",
    path: "/leagues",
    icon: <Trophy className="h-4 w-4 mr-2" />,
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userStats, isDarkMode, toggleDarkMode } = useAppStore();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-lg border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="premier-gradient-text text-xl font-bold">WinMix.hu</span>
          </Link>
          
          {/* Desktop Navigation */}
          <MainNavigation 
            items={mainNavItems} 
            isActive={isActive} 
            className="hidden md:flex" 
          />
        </div>
        
        {/* User Controls */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className="hidden sm:flex bg-muted/50 border-white/10 hover:bg-muted"
          >
            {isDarkMode ? (
              <span className="h-[1.2rem] w-[1.2rem]">🌙</span>
            ) : (
              <span className="h-[1.2rem] w-[1.2rem]">☀️</span>
            )}
          </Button>
          
          <UserMenu 
            userStats={userStats} 
            toggleDarkMode={toggleDarkMode} 
            isDarkMode={isDarkMode} 
          />
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 p-4 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-2">
            {mainNavItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm font-medium rounded-md",
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
