// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user : User | null;
  setUser : (userJwt : UserJwt) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user : null,
  setUser: (userJwt : UserJwt) => set ({user : {login : userJwt.Login, roles : userJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}}),
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
}));