
import { StateCreator } from 'zustand';
import { AppState } from '..';
import { Notification, User } from '@/lib/types';
import { mockUser } from '../mock-data/users';

// Define the User slice state and actions
export interface UserSlice {
  userStats: User & { notifications: Notification[] };
  isAuthenticated: boolean;
  markNotificationAsRead: (id: string) => void;
  login: () => void;
  logout: () => void;
}

// Create the User slice with the state and actions
export const createUserSlice: StateCreator<
  AppState,
  [],
  [],
  UserSlice
> = (set) => ({
  userStats: mockUser,
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

  login: () =>
    set(() => ({
      isAuthenticated: true,
    })),

  logout: () =>
    set(() => ({
      isAuthenticated: false,
    })),
});
