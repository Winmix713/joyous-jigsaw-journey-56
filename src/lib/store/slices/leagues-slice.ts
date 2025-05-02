
import { StateCreator } from 'zustand';
import { AppState } from '..';
import { LeagueData, Match, TeamData } from '@/lib/types';
import { createNewLeague } from '@/lib/league-calculator';
import { generateId } from '@/lib/utils';
import { loadLeagues, loadMatches } from '../mock-data/leagues';

// Define the Leagues slice state and actions
export interface LeaguesSlice {
  leagues: LeagueData[];
  matches: Match[];
  currentLeagueId: string | null;
  createLeague: (name: string, season: string, teams: TeamData[]) => string;
  updateLeague: (id: string, updates: Partial<LeagueData>) => void;
  deleteLeague: (id: string) => void;
  setCurrentLeague: (id: string | null) => void;
  addMatches: (matches: Match[]) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  deleteMatch: (id: string) => void;
}

// Create the Leagues slice with the state and actions
export const createLeaguesSlice: StateCreator<
  AppState,
  [],
  [],
  LeaguesSlice
> = (set) => ({
  leagues: loadLeagues(),
  matches: loadMatches(),
  currentLeagueId: null,

  // League actions
  createLeague: (name, season, teams) => {
    const newLeague = createNewLeague(name, season, teams);
    
    set((state) => {
      const updatedLeagues = [...state.leagues, newLeague];
      // Save to localStorage
      localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
      
      return { 
        leagues: updatedLeagues,
        currentLeagueId: newLeague.id
      };
    });
    
    return newLeague.id;
  },
  
  updateLeague: (id, updates) => {
    set((state) => {
      const updatedLeagues = state.leagues.map(league => 
        league.id === id ? { ...league, ...updates, updatedAt: new Date().toISOString() } : league
      );
      
      // Save to localStorage
      localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
      
      return { leagues: updatedLeagues };
    });
  },
  
  deleteLeague: (id) => {
    set((state) => {
      const updatedLeagues = state.leagues.filter(league => league.id !== id);
      const updatedMatches = state.matches.filter(match => match.leagueId !== id);
      
      // Save to localStorage
      localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
      localStorage.setItem('matches', JSON.stringify(updatedMatches));
      
      return { 
        leagues: updatedLeagues,
        matches: updatedMatches,
        currentLeagueId: state.currentLeagueId === id ? null : state.currentLeagueId
      };
    });
  },
  
  setCurrentLeague: (id) => {
    set({ currentLeagueId: id });
  },
  
  // Match actions
  addMatches: (matches) => {
    set((state) => {
      const updatedMatches = [...state.matches, ...matches];
      
      // Save to localStorage
      localStorage.setItem('matches', JSON.stringify(updatedMatches));
      
      return { matches: updatedMatches };
    });
  },
  
  updateMatch: (id, updates) => {
    set((state) => {
      const updatedMatches = state.matches.map(match => 
        match.id === id ? { ...match, ...updates } : match
      );
      
      // Save to localStorage
      localStorage.setItem('matches', JSON.stringify(updatedMatches));
      
      return { matches: updatedMatches };
    });
  },
  
  deleteMatch: (id) => {
    set((state) => {
      const updatedMatches = state.matches.filter(match => match.id !== id);
      
      // Save to localStorage
      localStorage.setItem('matches', JSON.stringify(updatedMatches));
      
      return { matches: updatedMatches };
    });
  }
});
