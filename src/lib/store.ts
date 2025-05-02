
import { create } from 'zustand';
import { Tip, Notification, User, TipHistory, Tipster, Game, RecentWinner, CurrentBet } from './types';
import { mockTips, mockNotifications, mockTipsters } from './mock-data';

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

  // Actions
  markNotificationAsRead: (id: string) => void;
  setCurrentTip: (tip: Partial<AppState['currentTip']>) => void;
  setCurrentBet: (bet: Partial<CurrentBet>) => void;
  followTip: () => void;
  placeBet: () => void;
  toggleDarkMode: () => void;
  login: () => void;
  logout: () => void;
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
}));
