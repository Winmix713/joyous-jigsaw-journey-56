
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import Header from '@/components/Header';
import MainDashboard from '@/components/MainDashboard';
import BetSlip from '@/components/BetSlip';
import FooterSection from '@/components/FooterSection';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary';

/**
 * App komponens - A WinMix.hu alkalmazás fő konténere
 * 
 * Kezeli a sötét/világos témát és az általános alkalmazás layoutot
 */
function App() {
  const { isDarkMode } = useAppStore();
  
  // Dokumentum cím és téma beállítása
  useEffect(() => {
    // Az oldal címének beállítása
    document.title = "WinMix.hu - Premier Betting Platform";
    
    // Sötét téma váltása DOM manipuláción keresztül
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  // Háttér gradiens stílusok előkészítése
  const backgroundGradient = isDarkMode 
    ? "radial-gradient(circle at top right, rgba(155, 135, 245, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.08), transparent 40%)"
    : "radial-gradient(circle at top right, rgba(155, 135, 245, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.15), transparent 40%)";

  return (
    <div className={cn("min-h-screen flex flex-col", isDarkMode ? "dark" : "")}>
      {/* Dekoratív háttér */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/90 z-[-1]"
        style={{ backgroundImage: backgroundGradient }}
      />
      
      {/* Fejléc */}
      <Header />
      
      {/* Fő tartalom - Külön ErrorBoundary-k közé ágyazva a komponensek */}
      <main className="flex-grow">
        <ErrorBoundary fallbackRender={({ error }) => (
          <div className="p-4 m-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
            <h3 className="font-semibold mb-2">Dashboard betöltési hiba</h3>
            <p>{error.message}</p>
          </div>
        )}>
          <MainDashboard />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackRender={({ error }) => (
          <div className="p-4 m-4 border border-amber-500 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
            <h3 className="font-semibold mb-2">Fogadási szelvény hiba</h3>
            <p>{error.message}</p>
          </div>
        )}>
          <BetSlip />
        </ErrorBoundary>
      </main>
      
      {/* Lábléc */}
      <FooterSection />
      
      {/* Toast értesítések */}
      <Toaster />
    </div>
  );
}

export default App;
