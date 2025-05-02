
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import Header from '@/components/common/Header';
import BetSlip from '@/components/BetSlip';
import FooterSection from '@/components/FooterSection';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDarkMode } = useAppStore();
  
  // Document title and theme setting
  useEffect(() => {
    // Set the page title
    document.title = "WinMix.hu - Premier Betting Platform";
    
    // Toggle dark theme using DOM manipulation
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  // Prepare background gradient styles
  const backgroundGradient = isDarkMode 
    ? "radial-gradient(circle at top right, rgba(155, 135, 245, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.08), transparent 40%)"
    : "radial-gradient(circle at top right, rgba(155, 135, 245, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.15), transparent 40%)";

  return (
    <div className={cn("min-h-screen flex flex-col", isDarkMode ? "dark" : "")}>
      {/* Decorative background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/90 z-[-1]"
        style={{ backgroundImage: backgroundGradient }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <FooterSection />
      
      {/* Bet Slip */}
      <BetSlip />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
