
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
            <Link to={item.path}>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(), 
                  isActive(item.path) && "bg-primary text-primary-foreground",
                  "hover:bg-muted"
                )}
              >
                {item.icon}
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
