import {
  LOCALE_STORAGE_KEY,
  type Locale,
  isLocale,
  setLocale as setI18nLocale,
  t as translate,
} from '@/i18n';
import { useCallback, useEffect, useState } from 'react';

import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateLocale = async () => {
      const storedLocale =
        await storageRepository.get<unknown>(LOCALE_STORAGE_KEY);

      if (!isMounted) return;

      const validLocale = isLocale(storedLocale) ? storedLocale : 'es';
      setLocaleState(validLocale);
      setI18nLocale(validLocale);
      setIsReady(true);
    };

    hydrateLocale();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setI18nLocale(newLocale);
    storageRepository.set(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback((key: string, options?: object) => {
    return translate(key, options);
  }, []);

  return {
    t,
    locale,
    setLocale,
    isReady,
    availableLocales: ['es', 'en'] as const,
  };
}
