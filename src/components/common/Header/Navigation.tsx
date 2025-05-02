
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface MainNavigationProps {
  items: NavigationItem[];
  isActive: (path: string) => boolean;
  className?: string;
}

export function MainNavigation({ items, isActive, className }: MainNavigationProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.path}>
            {/* Fix: Replace Link wrapping NavigationMenuLink with direct styling */}
            <NavigationMenuLink 
              asChild
              className={cn(
                navigationMenuTriggerStyle(), 
                isActive(item.path) && "bg-primary text-primary-foreground",
                "hover:bg-muted"
              )}
            >
              <Link to={item.path}>
                {item.icon}
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
