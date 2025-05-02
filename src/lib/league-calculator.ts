
import { LeagueData, Match, Standing, TeamData, TeamForm } from "./types";
import { generateId } from "./utils";

export class LeagueStatsCalculator {
  private matches: Match[];
  private teams: TeamData[];
  private leagueId: string;

  constructor(leagueId: string, teams: TeamData[], matches: Match[]) {
    this.leagueId = leagueId;
    this.teams = teams;
    this.matches = matches;
  }

  public calculateStandings(): Standing[] {
    // Initialize standings
    const standings: Record<string, Standing> = {};
    
    // Initialize each team in standings
    this.teams.forEach(team => {
      standings[team.id] = {
        teamId: team.id,
        teamName: team.name,
        position: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        form: []
      };
    });

    // Process all played matches
    const playedMatches = this.matches
      .filter(m => m.status === 'played' && m.homeScore !== null && m.awayScore !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (const match of playedMatches) {
      if (match.homeScore === null || match.awayScore === null) continue;

      const homeTeam = standings[match.homeTeamId];
      const awayTeam = standings[match.awayTeamId];

      if (!homeTeam || !awayTeam) continue;

      // Update played matches
      homeTeam.played += 1;
      awayTeam.played += 1;

      // Update goals
      homeTeam.goalsFor += match.homeScore;
      homeTeam.goalsAgainst += match.awayScore;
      awayTeam.goalsFor += match.awayScore;
      awayTeam.goalsAgainst += match.homeScore;

      // Update results and points
      if (match.homeScore > match.awayScore) {
        // Home team won
        homeTeam.won += 1;
        homeTeam.points += 3;
        awayTeam.lost += 1;
        
        // Update form
        if (homeTeam.form.length >= 5) homeTeam.form.shift();
        if (awayTeam.form.length >= 5) awayTeam.form.shift();
        homeTeam.form.push('W');
        awayTeam.form.push('L');
      } else if (match.homeScore < match.awayScore) {
        // Away team won
        homeTeam.lost += 1;
        awayTeam.won += 1;
        awayTeam.points += 3;
        
        // Update form
        if (homeTeam.form.length >= 5) homeTeam.form.shift();
        if (awayTeam.form.length >= 5) awayTeam.form.shift();
        homeTeam.form.push('L');
        awayTeam.form.push('W');
      } else {
        // Draw
        homeTeam.drawn += 1;
        awayTeam.drawn += 1;
        homeTeam.points += 1;
        awayTeam.points += 1;
        
        // Update form
        if (homeTeam.form.length >= 5) homeTeam.form.shift();
        if (awayTeam.form.length >= 5) awayTeam.form.shift();
        homeTeam.form.push('D');
        awayTeam.form.push('D');
      }

      // Update goal difference
      homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
      awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
    }

    // Convert to array and sort
    const standingsArray = Object.values(standings);
    
    // Sort by points (desc), goal difference (desc), goals for (desc)
    standingsArray.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    // Assign positions
    standingsArray.forEach((team, index) => {
      team.position = index + 1;
    });

    return standingsArray;
  }

  public calculateTeamForm(teamId: string): TeamForm | null {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return null;

    const teamMatches = this.matches
      .filter(m => (m.homeTeamId === teamId || m.awayTeamId === teamId) && 
                  m.status === 'played' && 
                  m.homeScore !== null && 
                  m.awayScore !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    const lastMatches = teamMatches.map(match => {
      const wasHome = match.homeTeamId === teamId;
      const opponentId = wasHome ? match.awayTeamId : match.homeTeamId;
      const opponentTeam = this.teams.find(t => t.id === opponentId);
      
      let result: 'W' | 'D' | 'L';
      if (match.homeScore === match.awayScore) {
        result = 'D';
      } else if (wasHome) {
        result = match.homeScore! > match.awayScore! ? 'W' : 'L';
      } else {
        result = match.awayScore! > match.homeScore! ? 'W' : 'L';
      }

      return {
        matchId: match.id,
        opponent: opponentTeam?.name || 'Unknown',
        result,
        homeScore: match.homeScore!,
        awayScore: match.awayScore!,
        wasHome
      };
    });

    return {
      teamId,
      teamName: team.name,
      lastMatches
    };
  }

  // Helper function to validate match data
  public validateMatch(match: Partial<Match>): string[] {
    const errors: string[] = [];

    if (!match.homeTeamId) errors.push('Home team is required');
    if (!match.awayTeamId) errors.push('Away team is required');
    if (match.homeTeamId === match.awayTeamId) errors.push('Home and away teams must be different');
    if (match.round === undefined || match.round < 1) errors.push('Valid round number is required');
    if (!match.date) errors.push('Match date is required');

    const homeTeam = this.teams.find(t => t.id === match.homeTeamId);
    const awayTeam = this.teams.find(t => t.id === match.awayTeamId);

    if (match.homeTeamId && !homeTeam) errors.push('Home team not found in league');
    if (match.awayTeamId && !awayTeam) errors.push('Away team not found in league');

    return errors;
  }

  // Create a new match
  public createMatch(matchData: Omit<Match, 'id'>): Match {
    return {
      id: generateId(),
      ...matchData
    };
  }
}

// Helper function to create a new league
export function createNewLeague(name: string, season: string, teams: TeamData[]): LeagueData {
  const timestamp = new Date().toISOString();
  return {
    id: generateId(),
    name,
    season,
    status: 'active',
    teams,
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

// Parse CSV data for matches
export function parseMatchesCsv(csvText: string, leagueId: string): { matches: Match[], errors: string[] } {
  const lines = csvText.split('\n');
  if (lines.length <= 1) {
    return { matches: [], errors: ['CSV file is empty or invalid'] };
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const requiredFields = ['home', 'away', 'round', 'date'];
  
  // Check if all required fields are present
  const missingFields = requiredFields.filter(field => !headers.some(h => h.includes(field)));
  if (missingFields.length > 0) {
    return { matches: [], errors: [`Missing required fields: ${missingFields.join(', ')}`] };
  }

  // Map headers to our expected format
  const homeTeamIndex = headers.findIndex(h => h.includes('home') && !h.includes('score'));
  const awayTeamIndex = headers.findIndex(h => h.includes('away') && !h.includes('score'));
  const homeScoreIndex = headers.findIndex(h => h.includes('home') && h.includes('score'));
  const awayScoreIndex = headers.findIndex(h => h.includes('away') && h.includes('score'));
  const roundIndex = headers.findIndex(h => h.includes('round'));
  const dateIndex = headers.findIndex(h => h.includes('date'));
  const venueIndex = headers.findIndex(h => h.includes('venue'));

  const matches: Match[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',').map(v => v.trim());
    if (values.length < requiredFields.length) {
      errors.push(`Line ${i + 1}: Not enough values`);
      continue;
    }

    const homeTeamId = homeTeamIndex >= 0 ? values[homeTeamIndex] : '';
    const awayTeamId = awayTeamIndex >= 0 ? values[awayTeamIndex] : '';
    const homeScore = homeScoreIndex >= 0 && values[homeScoreIndex] !== '' 
      ? parseInt(values[homeScoreIndex], 10) 
      : null;
    const awayScore = awayScoreIndex >= 0 && values[awayScoreIndex] !== '' 
      ? parseInt(values[awayScoreIndex], 10) 
      : null;
    const round = roundIndex >= 0 ? parseInt(values[roundIndex], 10) : 1;
    const date = dateIndex >= 0 ? new Date(values[dateIndex]).toISOString() : new Date().toISOString();
    const venue = venueIndex >= 0 ? values[venueIndex] : undefined;
    
    if (!homeTeamId || !awayTeamId) {
      errors.push(`Line ${i + 1}: Missing team information`);
      continue;
    }

    const status = (homeScore !== null && awayScore !== null) ? 'played' : 'scheduled';

    matches.push({
      id: generateId(),
      leagueId,
      homeTeamId,
      awayTeamId,
      homeScore,
      awayScore,
      date,
      status,
      round,
      venue
    });
  }

  return { matches, errors };
}
