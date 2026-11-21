import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { mockApi } from '../mocks/api';
import type { UserPersona } from '../mocks/types';
import { UserContext } from './contexts';
import { useTheme } from './useTheme';

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
    let active = true;
    mockApi
      .getCurrentUser()
      .then((current) => {
        if (active) setUser(current);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

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
