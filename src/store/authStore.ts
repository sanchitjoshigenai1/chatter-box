import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string; age: number }) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock API call - replace with actual API
      const mockUser: User = {
        id: '1',
        email,
        name: 'Alex Johnson',
        age: 16,
        level: 5,
        totalPoints: 1250,
        joinedAt: new Date('2024-01-15'),
        preferences: {
          currency: 'USD',
          monthlyBudget: 500,
          savingsGoal: 2000,
          notifications: true,
          theme: 'light',
        },
      };
      
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      set({ user: mockUser, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      // Mock API call
      const mockUser: User = {
        id: Date.now().toString(),
        ...userData,
        level: 1,
        totalPoints: 0,
        joinedAt: new Date(),
        preferences: {
          currency: 'USD',
          monthlyBudget: 200,
          savingsGoal: 500,
          notifications: true,
          theme: 'light',
        },
      };
      
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      set({ user: mockUser, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  updateUser: (userData) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...userData } });
    }
  },
}));