
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, PlusCircle, MinusCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TeamData } from '@/lib/types';
import { generateId } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NewLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewLeagueModal({ isOpen, onClose }: NewLeagueModalProps) {
  const [leagueName, setLeagueName] = useState('');
  const [season, setSeason] = useState(new Date().getFullYear().toString());
  const [teams, setTeams] = useState<TeamData[]>([
    { id: generateId(), name: '' },
    { id: generateId(), name: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createLeague } = useAppStore();
  const navigate = useNavigate();

  const handleAddTeam = () => {
    setTeams([...teams, { id: generateId(), name: '' }]);
  };

  const handleRemoveTeam = (index: number) => {
    if (teams.length <= 2) return; // Minimum 2 teams required
    const newTeams = [...teams];
    newTeams.splice(index, 1);
    setTeams(newTeams);
  };

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leagueName.trim()) {
      alert('League name is required');
      return;
    }
    
    if (!season.trim()) {
      alert('Season is required');
      return;
    }
    
    // Validate team names
    const invalidTeams = teams.filter(team => !team.name.trim());
    if (invalidTeams.length > 0) {
      alert('All teams must have names');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create league and navigate to it
      const leagueId = createLeague(leagueName, season, teams);
      onClose();
      navigate(`/leagues/${leagueId}`);
    } catch (error) {
      console.error('Failed to create league:', error);
      alert('Failed to create league. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setLeagueName('');
    setSeason(new Date().getFullYear().toString());
    setTeams([
      { id: generateId(), name: '' },
      { id: generateId(), name: '' },
    ]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-effect max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Soccer League</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="league-name">League Name</Label>
            <Input
              id="league-name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              placeholder="e.g., Premier League"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="season">Season</Label>
            <Input
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              placeholder="e.g., 2023-2024"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Teams</span>
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={handleAddTeam}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Team
              </Button>
            </Label>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {teams.map((team, index) => (
                <div key={team.id} className="flex items-center gap-2">
                  <Input
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(index, e.target.value)}
                    placeholder={`Team ${index + 1}`}
                    required
                  />
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleRemoveTeam(index)}
                    disabled={teams.length <= 2}
                    className="shrink-0 text-destructive"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="premier-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create League'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
