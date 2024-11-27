// src/store/useAuthStore.ts
import {create} from 'zustand';
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isSigningIn: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setIsSigningIn: (isSigningIn: boolean) => void;
  setAuthLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSigningIn: false,
  authLoading: true,
  setUser: (user) => set({ user }),
  setIsSigningIn: (isSigningIn) => set({ isSigningIn }),
  setAuthLoading: (authLoading) => set({ authLoading }),
}));