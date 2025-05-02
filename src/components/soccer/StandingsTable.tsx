
import { useMemo } from 'react';
import { Trophy } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Standing } from '@/lib/types';
import { LeagueStatsCalculator } from '@/lib/league-calculator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface StandingsTableProps {
  leagueId: string;
}

export default function StandingsTable({ leagueId }: StandingsTableProps) {
  const { leagues, matches } = useAppStore();
  
  // Calculate standings using our utility
  const standings = useMemo(() => {
    const league = leagues.find(l => l.id === leagueId);
    if (!league) return [];
    
    const leagueMatches = matches.filter(m => m.leagueId === leagueId);
    const calculator = new LeagueStatsCalculator(leagueId, league.teams, leagueMatches);
    return calculator.calculateStandings();
  }, [leagueId, leagues, matches]);
  
  // Check if we have played matches
  const hasPlayedMatches = useMemo(() => {
    return matches.some(m => m.leagueId === leagueId && m.status === 'played');
  }, [leagueId, matches]);
  
  if (!hasPlayedMatches) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Trophy className="h-12 w-12 mb-4 text-muted-foreground opacity-20" />
        <h3 className="text-lg font-semibold mb-2">No standings available</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Add match results to generate the league table. You can import matches or add them manually.
        </p>
      </div>
    );
  }
  
  const getPositionClass = (position: number) => {
    // Champions League spots (top 4)
    if (position <= 4) return "border-l-4 border-green-500";
    // Europa League spots (5-6)
    if (position <= 6) return "border-l-4 border-blue-500";
    // Relegation spots (bottom 3)
    if (position >= standings.length - 2) return "border-l-4 border-red-500";
    return "";
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Pos</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center w-12">P</TableHead>
            <TableHead className="text-center w-12">W</TableHead>
            <TableHead className="text-center w-12">D</TableHead>
            <TableHead className="text-center w-12">L</TableHead>
            <TableHead className="text-center w-12">GF</TableHead>
            <TableHead className="text-center w-12">GA</TableHead>
            <TableHead className="text-center w-12">GD</TableHead>
            <TableHead className="text-center w-12">Pts</TableHead>
            <TableHead className="w-24">Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((standing) => (
            <TableRow 
              key={standing.teamId}
              className={cn(
                "hover:bg-white/5", 
                getPositionClass(standing.position)
              )}
            >
              <TableCell className="font-semibold">{standing.position}</TableCell>
              <TableCell>{standing.teamName}</TableCell>
              <TableCell className="text-center">{standing.played}</TableCell>
              <TableCell className="text-center">{standing.won}</TableCell>
              <TableCell className="text-center">{standing.drawn}</TableCell>
              <TableCell className="text-center">{standing.lost}</TableCell>
              <TableCell className="text-center">{standing.goalsFor}</TableCell>
              <TableCell className="text-center">{standing.goalsAgainst}</TableCell>
              <TableCell className="text-center">
                {standing.goalDifference > 0 ? '+' : ''}
                {standing.goalDifference}
              </TableCell>
              <TableCell className="text-center font-bold">{standing.points}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {standing.form.slice().reverse().map((result, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "w-6 h-6 flex items-center justify-center text-xs font-semibold rounded", 
                        result === 'W' ? "bg-green-500/40 text-green-100" :
                        result === 'D' ? "bg-gray-500/40 text-gray-100" :
                        "bg-red-500/40 text-red-100"
                      )}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
