import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { mockApi } from '../mocks/api';
import type { UserPersona } from '../mocks/types';
import { useTheme } from './ThemeContext';

interface UserContextValue {
  user: UserPersona | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  loginAsPersona: (personaId: string) => Promise<UserPersona>;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();

  const refreshUser = useCallback(async () => {
    try {
      const current = await mockApi.getCurrentUser();
      setUser(current);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const loginAsPersona = useCallback(
    async (personaId: string) => {
      const nextUser = await mockApi.loginAsPersona(personaId);
      setUser(nextUser);
      if (nextUser.settings?.theme) {
        await setTheme(nextUser.settings.theme);
      }
      return nextUser;
    },
    [setTheme]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, refreshUser, loginAsPersona, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}

