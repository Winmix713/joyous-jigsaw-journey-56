
import { StateCreator } from 'zustand';
import { AppState } from '..';

// Define the UI slice state and actions
export interface UISlice {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the UI slice with the state and actions
export const createUISlice: StateCreator<
  AppState,
  [],
  [],
  UISlice
> = (set) => ({
  isDarkMode: true,
  
  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
});
