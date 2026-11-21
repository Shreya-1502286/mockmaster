import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { mockApi } from '../mocks/api';
import type { ThemeMode } from '../mocks/types';
import { ThemeContext } from './contexts';

const THEME_STORAGE_KEY = 'mockmaster_theme';

function getInitialTheme(): ThemeMode {
  try {
    const saved = globalThis.localStorage?.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      globalThis.localStorage?.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    let active = true;
    mockApi
      .getCurrentUser()
      .then((user) => {
        if (active && user.settings?.theme) {
          setThemeState(user.settings.theme);
        }
      })
      .catch(() => {
        // fallback to local theme
      });
    return () => {
      active = false;
    };
  }, []);

  const setTheme = useCallback(async (next: ThemeMode) => {
    setThemeState(next);
    setIsSyncing(true);
    try {
      await mockApi.patchMySettings({ theme: next });
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const next: ThemeMode = theme === 'light' ? 'dark' : 'light';
    await setTheme(next);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isSyncing, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
