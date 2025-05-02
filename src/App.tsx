
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

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
  return (
    <Router>
      <MainLayout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leagues" element={<LeagueTable />} />
            <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </MainLayout>
    </Router>
  );
}

export default App;
