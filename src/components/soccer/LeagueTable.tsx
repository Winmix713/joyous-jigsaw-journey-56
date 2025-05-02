
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2, Edit, Eye, Trophy } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LeagueData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatTimeAgo } from '@/lib/utils';
import NewLeagueModal from './NewLeagueModal';

export default function LeagueTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLeagueModalOpen, setIsNewLeagueModalOpen] = useState(false);
  const { leagues, deleteLeague, setCurrentLeague } = useAppStore();
  const navigate = useNavigate();

  const filteredLeagues = useMemo(() => {
    if (!searchQuery.trim()) return leagues;
    
    const query = searchQuery.toLowerCase();
    return leagues.filter(
      league => 
        league.name.toLowerCase().includes(query) || 
        league.season.toLowerCase().includes(query)
    );
  }, [leagues, searchQuery]);

  const handleViewLeague = (leagueId: string) => {
    setCurrentLeague(leagueId);
    navigate(`/leagues/${leagueId}`);
  };

  const handleDeleteLeague = (e: React.MouseEvent, leagueId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this league? This action cannot be undone.')) {
      deleteLeague(leagueId);
    }
  };

  const getBadgeVariant = (status: LeagueData['status']) => {
    switch(status) {
      case 'active': return 'success';
      case 'completed': return 'secondary';
      case 'upcoming': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight premier-gradient-text">Soccer Championships</h1>
        <Button onClick={() => setIsNewLeagueModalOpen(true)} className="premier-button">
          <Plus className="h-4 w-4 mr-2" />
          New League
        </Button>
      </div>
      
      <Card className="glass-effect">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Leagues</span>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leagues.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
              <p className="text-muted-foreground">No leagues created yet.</p>
              <Button 
                onClick={() => setIsNewLeagueModalOpen(true)} 
                variant="outline" 
                className="mt-4"
              >
                Create your first league
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Season</TableHead>
                    <TableHead>Teams</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeagues.map((league) => (
                    <TableRow 
                      key={league.id} 
                      className="cursor-pointer hover:bg-white/5"
                      onClick={() => handleViewLeague(league.id)}
                    >
                      <TableCell className="font-medium">{league.name}</TableCell>
                      <TableCell>{league.season}</TableCell>
                      <TableCell>{league.teams.length}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(league.status) as any} className="capitalize">
                          {league.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatTimeAgo(league.updatedAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewLeague(league.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentLeague(league.id);
                              navigate(`/leagues/${league.id}/edit`);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive" 
                            onClick={(e) => handleDeleteLeague(e, league.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <NewLeagueModal 
        isOpen={isNewLeagueModalOpen} 
        onClose={() => setIsNewLeagueModalOpen(false)} 
      />
    </div>
  );
}
