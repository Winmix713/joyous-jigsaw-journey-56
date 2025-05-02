
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import BetSlip from '@/components/BetSlip';
import FooterSection from '@/components/FooterSection';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// Pages
import Index from '@/pages/Index';
import LeagueTable from '@/components/soccer/LeagueTable';
import LeagueDetails from '@/components/soccer/LeagueDetails';
import NotFound from '@/pages/NotFound';

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
    <Router>
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
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/leagues" element={<LeagueTable />} />
              <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <BetSlip />
          </ErrorBoundary>
        </main>
        
        {/* Lábléc */}
        <FooterSection />
        
        {/* Toast értesítések */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
