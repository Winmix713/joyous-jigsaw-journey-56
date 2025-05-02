
import { useState, useMemo } from 'react';
import { CalendarDays, Calendar, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/lib/store';
import { Match } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface MatchesTableProps {
  leagueId: string;
}

export default function MatchesTable({ leagueId }: MatchesTableProps) {
  const [filter, setFilter] = useState<'all' | 'played' | 'scheduled'>('all');
  const [roundFilter, setRoundFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [homeScore, setHomeScore] = useState<string>('');
  const [awayScore, setAwayScore] = useState<string>('');
  
  const { leagues, matches, updateMatch } = useAppStore();
  const league = leagues.find(l => l.id === leagueId);
  const leagueMatches = matches.filter(m => m.leagueId === leagueId);
  
  // Get unique rounds
  const rounds = useMemo(() => {
    const uniqueRounds = Array.from(new Set(leagueMatches.map(m => m.round))).sort((a, b) => a - b);
    return uniqueRounds;
  }, [leagueMatches]);
  
  // Filter matches based on criteria
  const filteredMatches = useMemo(() => {
    return leagueMatches.filter(match => {
      // Status filter
      if (filter === 'played' && match.status !== 'played') return false;
      if (filter === 'scheduled' && match.status === 'played') return false;
      
      // Round filter
      if (roundFilter !== 'all' && match.round !== parseInt(roundFilter)) return false;
      
      // Team filter
      if (teamFilter !== 'all' && match.homeTeamId !== teamFilter && match.awayTeamId !== teamFilter) return false;
      
      return true;
    }).sort((a, b) => {
      // Sort by round first, then by date
      if (a.round !== b.round) return a.round - b.round;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [leagueMatches, filter, roundFilter, teamFilter]);
  
  const openMatchModal = (match: Match) => {
    setSelectedMatch(match);
    setHomeScore(match.homeScore !== null ? match.homeScore.toString() : '');
    setAwayScore(match.awayScore !== null ? match.awayScore.toString() : '');
    setIsMatchModalOpen(true);
  };
  
  const closeMatchModal = () => {
    setSelectedMatch(null);
    setIsMatchModalOpen(false);
    setHomeScore('');
    setAwayScore('');
  };
  
  const handleSaveMatch = () => {
    if (!selectedMatch) return;
    
    const parsedHomeScore = homeScore === '' ? null : parseInt(homeScore, 10);
    const parsedAwayScore = awayScore === '' ? null : parseInt(awayScore, 10);
    
    // Both scores must be either valid numbers or both null
    if ((parsedHomeScore === null && parsedAwayScore !== null) || 
        (parsedHomeScore !== null && parsedAwayScore === null)) {
      alert('Both scores must be entered');
      return;
    }
    
    const status = parsedHomeScore !== null && parsedAwayScore !== null ? 'played' : 'scheduled';
    
    updateMatch(selectedMatch.id, {
      homeScore: parsedHomeScore,
      awayScore: parsedAwayScore,
      status
    });
    
    closeMatchModal();
  };
  
  const getTeamName = (teamId: string) => {
    return league?.teams.find(t => t.id === teamId)?.name || 'Unknown Team';
  };
  
  const getStatusIcon = (status: Match['status']) => {
    switch(status) {
      case 'played': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'canceled': return <X className="h-4 w-4 text-red-500" />;
      case 'postponed': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <TabsList className="bg-muted/30">
          <TabsTrigger
            value="all"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'data-[state=active]:bg-primary' : ''}
          >
            All Matches
          </TabsTrigger>
          <TabsTrigger
            value="played"
            onClick={() => setFilter('played')}
            className={filter === 'played' ? 'data-[state=active]:bg-primary' : ''}
          >
            Played
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            onClick={() => setFilter('scheduled')}
            className={filter === 'scheduled' ? 'data-[state=active]:bg-primary' : ''}
          >
            Scheduled
          </TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
          <Select defaultValue="all" onValueChange={setRoundFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Round" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rounds</SelectItem>
              {rounds.map((round) => (
                <SelectItem key={round} value={round.toString()}>
                  Round {round}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select defaultValue="all" onValueChange={setTeamFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {league?.teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredMatches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <CalendarDays className="h-12 w-12 mb-4 text-muted-foreground opacity-20" />
          <h3 className="text-lg font-semibold mb-2">No matches found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            {filter === 'all' 
              ? "There are no matches in this league yet. Import matches or add them manually."
              : `No ${filter} matches match your current filters.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((match) => (
            <Card 
              key={match.id}
              className="overflow-hidden hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => openMatchModal(match)}
            >
              <div className="bg-muted/50 py-2 px-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Round {match.round} • {format(new Date(match.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <div>{getStatusIcon(match.status)}</div>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{getTeamName(match.homeTeamId)}</div>
                    <div className="w-8 h-8 bg-muted/50 rounded flex items-center justify-center font-bold">
                      {match.homeScore !== null ? match.homeScore : '-'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{getTeamName(match.awayTeamId)}</div>
                    <div className="w-8 h-8 bg-muted/50 rounded flex items-center justify-center font-bold">
                      {match.awayScore !== null ? match.awayScore : '-'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Match Edit Modal */}
      {selectedMatch && (
        <Dialog open={isMatchModalOpen} onOpenChange={setIsMatchModalOpen}>
          <DialogContent className="sm:max-w-[425px] glass-effect">
            <DialogHeader>
              <DialogTitle>Edit Match Result</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Round {selectedMatch.round} • {format(new Date(selectedMatch.date), 'MMMM d, yyyy')}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{getTeamName(selectedMatch.homeTeamId)}</div>
                    <Input
                      type="number"
                      min="0"
                      className="w-16 h-10 text-center"
                      value={homeScore}
                      onChange={(e) => setHomeScore(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{getTeamName(selectedMatch.awayTeamId)}</div>
                    <Input
                      type="number"
                      min="0"
                      className="w-16 h-10 text-center"
                      value={awayScore}
                      onChange={(e) => setAwayScore(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeMatchModal}>
                Cancel
              </Button>
              <Button onClick={handleSaveMatch}>
                Save Result
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
