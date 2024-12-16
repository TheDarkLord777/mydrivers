// src/store/useAuthStore.ts
import {create} from 'zustand';
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  userRole: 'user' | 'taxi'|'admin' | null;
  isSigningIn: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setUserRole: (role: 'user' | 'taxi' | 'admin'| null) => void;
  setIsSigningIn: (isSigningIn: boolean) => void;
  setAuthLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userRole: null,
  isSigningIn: false,
  authLoading: true,
  setUser: (user) => set({ user }),
  setUserRole: (role) => set({ userRole: role }),
  setIsSigningIn: (isSigningIn) => set({ isSigningIn }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  reset: () => set({ user: null, userRole: null, isSigningIn: false })
}));