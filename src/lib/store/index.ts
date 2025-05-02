
import { create } from 'zustand';
import { createUISlice, UISlice } from './slices/ui-slice';
import { createUserSlice, UserSlice } from './slices/user-slice';
import { createBettingSlice, BettingSlice } from './slices/betting-slice';
import { createLeaguesSlice, LeaguesSlice } from './slices/leagues-slice';

// Define the complete AppState type by combining all slice types
export type AppState = UISlice & UserSlice & BettingSlice & LeaguesSlice;

// Create the combined store using Zustand's create function
export const useAppStore = create<AppState>((set, get) => ({
  ...createUISlice(set, get),
  ...createUserSlice(set, get),
  ...createBettingSlice(set, get),
  ...createLeaguesSlice(set, get),
}));
