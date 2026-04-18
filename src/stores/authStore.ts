import { create } from 'zustand';

interface AuthState {
  token: string | null;
  expiresAt: Date | null;
  setAuth: (token: string, expiresAt: Date) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  expiresAt: null,
  setAuth: (token, expiresAt) => set({ token, expiresAt }),
  clearAuth: () => set({ token: null, expiresAt: null }),
}));

export const selectIsAuthenticated = (state: AuthState): boolean =>
  !!state.token && !!state.expiresAt && state.expiresAt > new Date();
