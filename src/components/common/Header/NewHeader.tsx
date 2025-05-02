
import { Link } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { Bell, Home, User, Users, Table, BarChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { 
    label: "Főoldal", 
    path: "/",
    icon: <Home className="h-4 w-4 mr-1" />
  },
  { 
    label: "Csapatok", 
    path: "/teams",
    icon: <Users className="h-4 w-4 mr-1" />
  },
  { 
    label: "Mérkőzések", 
    path: "/matches",
    icon: <Table className="h-4 w-4 mr-1" />
  },
  { 
    label: "Statisztika", 
    path: "/statistics",
    icon: <BarChart className="h-4 w-4 mr-1" />
  },
  { 
    label: "Rendszer", 
    path: "/system",
    icon: <Settings className="h-4 w-4 mr-1" />
  }
];

export function NewHeader() {
  const { userStats } = useAppStore();
  
  return (
    <header className="w-full bg-background/40 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="text-primary text-lg font-bold">W</span>
          </div>
          <span className="font-bold text-xl">
            Win<span className="text-primary">Mix</span>.hu
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-white/5 transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Controls */}
        <div className="flex items-center space-x-2">
          {/* Points */}
          <div className="bg-primary/10 border border-primary/20 rounded-md px-3 py-1">
            <span className="text-sm font-semibold text-primary">1250 Points</span>
          </div>
          
          {/* Win Rate */}
          <div className="bg-primary/10 border border-primary/20 rounded-md px-3 py-1">
            <span className="text-sm font-semibold text-primary">68% Win Rate</span>
          </div>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="text-foreground bg-white/5 border border-white/10 rounded-full">
            <span className="h-[1.2rem] w-[1.2rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </span>
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-foreground bg-white/5 border border-white/10 rounded-full relative">
            <Bell className="h-5 w-5" />
            {userStats.notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
          
          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-white/5 border border-white/10 rounded-full flex items-center gap-1 px-2">
                <Avatar className="h-7 w-7 border border-primary/30">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {userStats.username.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="mr-1">Profile</span>
                <span className="text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border-white/5">
              <div className="flex items-center justify-start gap-2 p-2 border-b border-white/5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm bg-primary/20 text-primary">
                    {userStats.username.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{userStats.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {userStats.points} points
                  </p>
                </div>
              </div>
              <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default NewHeader;
