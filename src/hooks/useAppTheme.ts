import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Uniwind, useUniwind } from 'uniwind';

import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

export type AppTheme = 'light' | 'dark';
export type AppThemeMode = AppTheme | 'system';

const THEME_STORAGE_KEY = 'theme-preference';

const isAppThemeMode = (value: unknown): value is AppThemeMode => {
  return value === 'light' || value === 'dark' || value === 'system';
};

const storageRepository = generateStorageRepository();

export function useAppTheme() {
  const { hasAdaptiveThemes, theme: runtimeTheme } = useUniwind();
  const themeValue = useSharedValue<AppThemeMode>('system');
  const [themeMode, setThemeMode] = useState<AppThemeMode>('system');

  useEffect(() => {
    let isMounted = true;

    const hydrateTheme = async () => {
      const storedTheme =
        await storageRepository.get<unknown>(THEME_STORAGE_KEY);

      if (!isMounted || !isAppThemeMode(storedTheme)) {
        return;
      }

      setThemeMode(storedTheme);
      Uniwind.setTheme(storedTheme);
      themeValue.value = storedTheme;
    };

    hydrateTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const theme: AppTheme = useMemo(() => {
    if (themeMode === 'system') {
      return runtimeTheme === 'dark' ? 'dark' : 'light';
    }

    return themeMode;
  }, [runtimeTheme, themeMode]);

  const setThemePreference = useCallback((nextThemeMode: AppThemeMode) => {
    setThemeMode(nextThemeMode);
    Uniwind.setTheme(nextThemeMode);
    themeValue.value = nextThemeMode;
    storageRepository.set(THEME_STORAGE_KEY, nextThemeMode);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextThemeMode: AppTheme = theme === 'dark' ? 'light' : 'dark';
    setThemePreference(nextThemeMode);
  }, [setThemePreference, theme]);

  const cycleThemeMode = useCallback(() => {
    if (themeMode === 'system') {
      setThemePreference('light');
      return;
    }

    if (themeMode === 'light') {
      setThemePreference('dark');
      return;
    }

    setThemePreference('system');
  }, [setThemePreference, themeMode]);

  return {
    theme,
    themeMode,
    themeValue,
    hasAdaptiveThemes,
    setThemePreference,
    toggleTheme,
    cycleThemeMode,
  } as const;
}
