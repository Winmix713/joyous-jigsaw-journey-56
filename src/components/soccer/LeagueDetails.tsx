
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, FileUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LeagueData, Match } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MatchesTable from './MatchesTable';
import StandingsTable from './StandingsTable';
import FormTable from './FormTable';
import LeagueImport from './LeagueImport';

export default function LeagueDetails() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [activeTab, setActiveTab] = useState('standings');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { 
    leagues, 
    matches, 
    setCurrentLeague 
  } = useAppStore();
  
  const league = leagues.find(l => l.id === leagueId);
  const leagueMatches = matches.filter(m => m.leagueId === leagueId);
  
  useEffect(() => {
    if (leagueId) {
      setCurrentLeague(leagueId);
    }
    
    return () => setCurrentLeague(null);
  }, [leagueId, setCurrentLeague]);
  
  if (!league) {
    return (
      <div className="flex flex-col items-center justify-center h-96 glass-effect">
        <p className="text-lg text-muted-foreground mb-4">League not found</p>
        <Button onClick={() => navigate('/leagues')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leagues
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/leagues')}
            className="hidden sm:flex"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight premier-gradient-text">{league.name}</h1>
            <p className="text-sm text-muted-foreground">{league.season} • {league.teams.length} Teams</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsImportModalOpen(true)}
          >
            <FileUp className="h-4 w-4 mr-2" />
            Import Matches
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/leagues/${leagueId}/edit`)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      <Card className="glass-effect">
        <CardContent className="p-0">
          <Tabs defaultValue="standings" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger 
                value="standings" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
              >
                Standings
              </TabsTrigger>
              <TabsTrigger 
                value="matches" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger 
                value="form" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
              >
                Team Form
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              <TabsContent value="standings" className="m-0 p-0">
                <StandingsTable leagueId={league.id} />
              </TabsContent>
              
              <TabsContent value="matches" className="m-0 p-0">
                <MatchesTable leagueId={league.id} />
              </TabsContent>
              
              <TabsContent value="form" className="m-0 p-0">
                <FormTable leagueId={league.id} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <LeagueImport 
        leagueId={league.id} 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </div>
  );
}
