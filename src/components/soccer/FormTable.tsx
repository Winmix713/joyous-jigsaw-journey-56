
import { useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { LeagueStatsCalculator } from '@/lib/league-calculator';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormTableProps {
  leagueId: string;
}

export default function FormTable({ leagueId }: FormTableProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const { leagues, matches } = useAppStore();
  
  const league = leagues.find(l => l.id === leagueId);
  const leagueMatches = matches.filter(m => m.leagueId === leagueId);
  
  // Calculate team forms
  const teamForms = useMemo(() => {
    if (!league) return [];
    
    const calculator = new LeagueStatsCalculator(leagueId, league.teams, leagueMatches);
    return league.teams.map(team => calculator.calculateTeamForm(team.id)).filter(Boolean);
  }, [leagueId, league, leagueMatches]);
  
  // Selected team form (detailed view)
  const selectedTeamForm = useMemo(() => {
    if (!selectedTeamId) return null;
    return teamForms.find(form => form?.teamId === selectedTeamId);
  }, [selectedTeamId, teamForms]);
  
  // Check if we have played matches
  const hasPlayedMatches = useMemo(() => {
    return leagueMatches.some(m => m.status === 'played');
  }, [leagueMatches]);
  
  const getResultColor = (result: 'W' | 'D' | 'L') => {
    switch(result) {
      case 'W': return "bg-green-500/40 text-green-100";
      case 'D': return "bg-gray-500/40 text-gray-100";
      case 'L': return "bg-red-500/40 text-red-100";
    }
  };
  
  if (!hasPlayedMatches) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-center">
          No form data available. Form information will appear once matches have been played.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamForms.map(form => form && (
          <Card 
            key={form.teamId} 
            className={cn(
              "cursor-pointer hover:bg-white/5 transition-colors",
              selectedTeamId === form.teamId && "border-primary"
            )}
            onClick={() => setSelectedTeamId(form.teamId)}
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">{form.teamName}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex gap-2">
                {form.lastMatches.slice().reverse().map((match, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center text-sm font-semibold rounded",
                      getResultColor(match.result)
                    )}
                  >
                    {match.result}
                  </div>
                ))}
                
                {/* Add empty slots if less than 5 matches */}
                {Array.from({ length: Math.max(0, 5 - form.lastMatches.length) }).map((_, idx) => (
                  <div 
                    key={`empty-${idx}`}
                    className="w-10 h-10 flex items-center justify-center rounded bg-muted/20"
                  >
                    -
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedTeamForm && (
        <Card className="glass-effect mt-8">
          <CardHeader>
            <CardTitle>{selectedTeamForm.teamName} - Detailed Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTeamForm.lastMatches.map((match, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div 
                    className={cn(
                      "w-10 h-10 flex-shrink-0 flex items-center justify-center text-sm font-semibold rounded",
                      getResultColor(match.result)
                    )}
                  >
                    {match.result}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {match.wasHome ? selectedTeamForm.teamName : match.opponent} vs {match.wasHome ? match.opponent : selectedTeamForm.teamName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {match.homeScore} - {match.awayScore} • {match.wasHome ? 'Home' : 'Away'}
                    </p>
                  </div>
                </div>
              ))}
              
              {selectedTeamForm.lastMatches.length === 0 && (
                <p className="text-muted-foreground">
                  No recent match data available for this team.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
