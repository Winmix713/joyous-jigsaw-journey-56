
import { LeagueData, Match, TeamData } from '@/lib/types';
import { createNewLeague } from '@/lib/league-calculator';
import { generateId } from '@/lib/utils';

// Sample teams for initial leagues
export const mockTeams: TeamData[] = [
  { id: "arsenal", name: "Arsenal" },
  { id: "chelsea", name: "Chelsea" },
  { id: "liverpool", name: "Liverpool" },
  { id: "mancity", name: "Manchester City" },
  { id: "manutd", name: "Manchester United" },
  { id: "tottenham", name: "Tottenham" }
];

// Create a sample league
export const sampleLeague = createNewLeague("Premier League", "2023-2024", mockTeams);

// Create some sample matches
export const sampleMatches: Match[] = [
  {
    id: generateId(),
    leagueId: sampleLeague.id,
    homeTeamId: "arsenal",
    awayTeamId: "chelsea",
    homeScore: 2,
    awayScore: 1,
    date: new Date(2023, 8, 15).toISOString(),
    status: "played",
    round: 1
  },
  {
    id: generateId(),
    leagueId: sampleLeague.id,
    homeTeamId: "liverpool",
    awayTeamId: "mancity",
    homeScore: 0,
    awayScore: 0,
    date: new Date(2023, 8, 15).toISOString(),
    status: "played",
    round: 1
  },
  {
    id: generateId(),
    leagueId: sampleLeague.id,
    homeTeamId: "manutd",
    awayTeamId: "tottenham",
    homeScore: null,
    awayScore: null,
    date: new Date(2023, 9, 1).toISOString(),
    status: "scheduled",
    round: 2
  }
];

// Load leagues and matches from localStorage helper functions
export const loadLeagues = (): LeagueData[] => {
  try {
    const storedLeagues = localStorage.getItem('leagues');
    return storedLeagues ? JSON.parse(storedLeagues) : [sampleLeague];
  } catch (error) {
    console.error('Failed to load leagues from localStorage:', error);
    return [sampleLeague];
  }
};

export const loadMatches = (): Match[] => {
  try {
    const storedMatches = localStorage.getItem('matches');
    return storedMatches ? JSON.parse(storedMatches) : sampleMatches;
  } catch (error) {
    console.error('Failed to load matches from localStorage:', error);
    return sampleMatches;
  }
};
