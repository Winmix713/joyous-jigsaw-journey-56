
import { create } from 'zustand';
import { Tip, Notification, User, TipHistory, Tipster, Game, RecentWinner, CurrentBet, LeagueData, Match, TeamData } from './types';
import { mockTips, mockNotifications, mockTipsters } from './mock-data';
import { createNewLeague } from './league-calculator';
import { generateId } from './utils';

interface AppState {
  userStats: User & { notifications: Notification[] };
  tips: Tip[];
  games: Game[];
  currentBet: CurrentBet;
  currentTip: {
    tipId: string | null;
    stake: number;
    selectedPrediction: string | null;
  };
  tipHistory: TipHistory[];
  topTipsters: Tipster[];
  recentWinners: RecentWinner[];
  isDarkMode: boolean;
  isAuthenticated: boolean;

  // Soccer Championship Analysis Data
  leagues: LeagueData[];
  matches: Match[];
  currentLeagueId: string | null;

  // Actions
  markNotificationAsRead: (id: string) => void;
  setCurrentTip: (tip: Partial<AppState['currentTip']>) => void;
  setCurrentBet: (bet: Partial<CurrentBet>) => void;
  followTip: () => void;
  placeBet: () => void;
  toggleDarkMode: () => void;
  login: () => void;
  logout: () => void;

  // League Actions
  createLeague: (name: string, season: string, teams: TeamData[]) => string;
  updateLeague: (id: string, updates: Partial<LeagueData>) => void;
  deleteLeague: (id: string) => void;
  setCurrentLeague: (id: string | null) => void;
  
  // Match Actions
  addMatches: (matches: Match[]) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  deleteMatch: (id: string) => void;
}

// Mock data for games and recent winners
const mockGames: Game[] = [
  {
    id: "game1",
    title: "Premier League: London Derby",
    description: "Arsenal vs Chelsea",
    image: "/placeholder.jpg",
    status: "live",
    startTime: new Date().toISOString(),
    category: "football",
    participants: [
      { id: "arsenal", name: "Arsenal" },
      { id: "chelsea", name: "Chelsea", isPopular: true }
    ],
    odds: { arsenal: 2.1, chelsea: 3.5 },
    minBet: 10,
    maxBet: 1000
  },
  {
    id: "game2",
    title: "La Liga Showdown",
    description: "Barcelona vs Real Madrid",
    image: "/placeholder.jpg",
    status: "upcoming",
    startTime: new Date(Date.now() + 86400000).toISOString(),
    category: "football",
    participants: [
      { id: "barcelona", name: "Barcelona", isPopular: true },
      { id: "realmadrid", name: "Real Madrid" }
    ],
    odds: { barcelona: 1.9, realmadrid: 2.8 },
    minBet: 10,
    maxBet: 2000
  }
];

const mockRecentWinners: RecentWinner[] = [
  {
    id: "winner1",
    username: "SportsBetter",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    gameTitle: "Premier League: London Derby",
    amount: 100,
    winningAmount: 350
  },
  {
    id: "winner2",
    username: "LuckyGambler",
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    gameTitle: "NBA Championship",
    amount: 200,
    winningAmount: 480
  }
];

// Sample teams for initial leagues
const mockTeams: TeamData[] = [
  { id: "arsenal", name: "Arsenal" },
  { id: "chelsea", name: "Chelsea" },
  { id: "liverpool", name: "Liverpool" },
  { id: "mancity", name: "Manchester City" },
  { id: "manutd", name: "Manchester United" },
  { id: "tottenham", name: "Tottenham" }
];

// Create a sample league
const sampleLeague = createNewLeague("Premier League", "2023-2024", mockTeams);

// Create some sample matches
const sampleMatches: Match[] = [
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

// Load leagues and matches from localStorage if available
const loadLeagues = (): LeagueData[] => {
  try {
    const storedLeagues = localStorage.getItem('leagues');
    return storedLeagues ? JSON.parse(storedLeagues) : [sampleLeague];
  } catch (error) {
    console.error('Failed to load leagues from localStorage:', error);
    return [sampleLeague];
  }
};

const loadMatches = (): Match[] => {
  try {
    const storedMatches = localStorage.getItem('matches');
    return storedMatches ? JSON.parse(storedMatches) : sampleMatches;
  } catch (error) {
    console.error('Failed to load matches from localStorage:', error);
    return sampleMatches;
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  userStats: {
    id: '1',
    username: 'TipMaster',
    points: 1250,
    winRate: 68,
    totalTips: 42,
    successfulTips: 28,
    followers: 156,
    expertise: ['Football', 'NBA'],
    notifications: mockNotifications,
  },
  tips: mockTips,
  games: mockGames,
  currentBet: {
    gameId: null,
    selectedParticipantId: null,
    amount: 100
  },
  currentTip: {
    tipId: null,
    stake: 100,
    selectedPrediction: null,
  },
  tipHistory: [],
  topTipsters: mockTipsters,
  recentWinners: mockRecentWinners,
  isDarkMode: true,
  isAuthenticated: true,
  
  // Soccer Championship Analysis state
  leagues: loadLeagues(),
  matches: loadMatches(),
  currentLeagueId: null,

  markNotificationAsRead: (id) =>
    set((state) => ({
      userStats: {
        ...state.userStats,
        notifications: state.userStats.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      },
    })),

  setCurrentTip: (tip) =>
    set((state) => ({
      currentTip: { ...state.currentTip, ...tip },
    })),
    
  setCurrentBet: (bet) =>
    set((state) => ({
      currentBet: { ...state.currentBet, ...bet },
    })),

  followTip: () => {
    const { currentTip, tips, userStats, tipHistory } = get();
    const { tipId, stake, selectedPrediction } = currentTip;

    if (!tipId || !selectedPrediction || stake <= 0) {
      console.warn('Invalid tip placement attempt');
      return;
    }

    const tip = tips.find((t) => t.id === tipId);
    if (!tip) {
      console.warn('Tip not found');
      return;
    }

    const newHistoryItem: TipHistory = {
      id: `tip-${Date.now()}`,
      tipId,
      userId: userStats.id,
      stake,
      prediction: selectedPrediction,
      odds: tip.prediction.odds,
      status: 'pending',
      placedAt: new Date().toISOString(),
      potentialReturn: stake * tip.prediction.odds,
    };

    set({
      tipHistory: [newHistoryItem, ...tipHistory],
      userStats: {
        ...userStats,
        points: userStats.points - stake,
      },
      currentTip: {
        tipId: null,
        stake: 100,
        selectedPrediction: null,
      },
    });
  },
  
  placeBet: () => {
    const { currentBet, userStats, games } = get();
    
    if (!currentBet.gameId || !currentBet.selectedParticipantId || currentBet.amount <= 0) {
      console.warn('Invalid bet placement attempt');
      return;
    }
    
    const game = games.find(g => g.id === currentBet.gameId);
    if (!game) {
      console.warn('Game not found');
      return;
    }
    
    // Process the bet - in a real app this would be an API call
    set({
      userStats: {
        ...userStats,
        points: userStats.points - currentBet.amount
      },
      // Reset current bet
      currentBet: {
        gameId: null,
        selectedParticipantId: null,
        amount: 100
      }
    });
  },

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  login: () =>
    set(() => ({
      isAuthenticated: true,
    })),

  logout: () =>
    set(() => ({
      isAuthenticated: false,
    })),

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
}));
