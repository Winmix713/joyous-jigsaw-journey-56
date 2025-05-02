
import { StateCreator } from 'zustand';
import { AppState } from '..';
import { CurrentBet, Game, RecentWinner, Tip, TipHistory, Tipster } from '@/lib/types';
import { mockGames, mockRecentWinners, mockTips, mockTipsters } from '../mock-data/betting';

// Define the Betting slice state and actions
export interface BettingSlice {
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
  setCurrentTip: (tip: Partial<BettingSlice['currentTip']>) => void;
  setCurrentBet: (bet: Partial<CurrentBet>) => void;
  followTip: () => void;
  placeBet: () => void;
}

// Create the Betting slice with the state and actions
export const createBettingSlice: StateCreator<
  AppState,
  [],
  [],
  BettingSlice
> = (set, get) => ({
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
});
