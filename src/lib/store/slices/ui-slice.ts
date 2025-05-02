
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
> = (set, get, api) => ({
  isDarkMode: true, // Always default to dark mode for Once UI 2.0
  
  // Toggle function that actually doesn't toggle in this version - always stays dark
  toggleDarkMode: () =>
    set({
      isDarkMode: true,
    }),
});
