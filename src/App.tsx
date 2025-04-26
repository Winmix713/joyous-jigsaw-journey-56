
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import BetSlip from '@/components/BetSlip/BetSlip';
import FooterSection from '@/components/Footer/FooterSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Layout/Header';

const App = () => {
  const { isDarkMode } = useAppStore();
  
  useEffect(() => {
    document.title = "WinMix.hu - Online Betting Platform";
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  const backgroundGradient = isDarkMode 
    ? "radial-gradient(circle at top right, rgba(30, 64, 175, 0.05), transparent 40%), radial-gradient(circle at bottom left, rgba(79, 70, 229, 0.05), transparent 40%)"
    : "radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.1), transparent 40%)";

  return (
    <div className={cn("min-h-screen flex flex-col", isDarkMode ? "dark" : "")}>
      <div 
        className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/90 z-[-1]"
        style={{ backgroundImage: backgroundGradient }}
      />
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ErrorBoundary fallbackRender={({ error }) => (
              <div className="p-4 m-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
                <h3 className="font-semibold mb-2">Dashboard betöltési hiba</h3>
                <p>{error.message}</p>
              </div>
            )}>
              {/* MainDashboard will be implemented later */}
              <div>Dashboard Content</div>
            </ErrorBoundary>
          </div>
          
          <div>
            <ErrorBoundary fallbackRender={({ error }) => (
              <div className="p-4 m-4 border border-amber-500 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
                <h3 className="font-semibold mb-2">Fogadási szelvény hiba</h3>
                <p>{error.message}</p>
              </div>
            )}>
              <BetSlip />
            </ErrorBoundary>
          </div>
        </div>
      </main>
      
      <FooterSection />
      <Toaster />
    </div>
  );
};

export default App;
