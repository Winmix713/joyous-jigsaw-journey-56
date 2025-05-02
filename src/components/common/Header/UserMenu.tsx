
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Notification, User } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  userStats: User & { notifications: Notification[] };
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function UserMenu({ userStats, toggleDarkMode, isDarkMode }: UserMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {userStats.notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <div className="p-2 text-sm">
            {userStats.notifications.length > 0 ? (
              userStats.notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className={cn(!notification.read && "font-medium")}>
                  <div>
                    <p>{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">No notifications</div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="text-sm bg-primary text-primary-foreground">
                {userStats.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-sm bg-primary text-primary-foreground">
                {userStats.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{userStats.username}</p>
              <p className="text-xs text-muted-foreground">
                {userStats.points} points
              </p>
            </div>
          </div>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleDarkMode} className="md:hidden">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
