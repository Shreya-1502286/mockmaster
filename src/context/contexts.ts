import { createContext } from 'react';
import type { ThemeMode, UserPersona } from '../mocks/types';

export interface ThemeContextValue {
  theme: ThemeMode;
  isSyncing: boolean;
  setTheme: (next: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export interface UserContextValue {
  user: UserPersona | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  loginAsPersona: (personaId: string) => Promise<UserPersona>;
  logout: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export const UserContext = createContext<UserContextValue | undefined>(undefined);

