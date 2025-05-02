
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import NewHeader from '@/components/common/Header/NewHeader';
import BetSlip from '@/components/betting/BetSlip';
import FooterSection from '@/components/FooterSection';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // Document title and theme setting
  useEffect(() => {
    // Set the page title
    document.title = "WinMix.hu - Premier Betting Platform";
    
    // Force dark mode for Once UI 2.0
    document.documentElement.classList.add('dark');
  }, []);
  
  // Once UI 2.0 background gradient styles
  const backgroundGradient = 
    "radial-gradient(circle at top right, rgba(155, 135, 245, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(126, 105, 171, 0.08), transparent 40%)";

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      {/* Once UI decorative background */}
      <div 
        className="fixed inset-0 bg-background z-[-1]"
        style={{ backgroundImage: backgroundGradient }}
      />
      
      {/* Header */}
      <NewHeader />
      
      {/* Main content with Once UI padding */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <FooterSection />
      
      {/* Bet Slip */}
      <BetSlip />
      
      {/* Toast notifications with Once UI styling */}
      <Toaster />
    </div>
  );
}
