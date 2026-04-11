import { I18n } from 'i18n-js';

const en = require('../assets/locales/en.json');
const es = require('../assets/locales/es.json');

export type Locale = 'es' | 'en';

const LOCALE_STORAGE_KEY = 'locale-preference';

const isLocale = (value: unknown): value is Locale => {
  return value === 'es' || value === 'en';
};

const i18n = new I18n({
  es,
  en,
});

i18n.defaultLocale = 'es';
i18n.locale = 'es';
i18n.enableFallback = true;

export function getLocale(): Locale {
  return i18n.locale as Locale;
}

export function setLocale(locale: Locale): void {
  i18n.locale = locale;
}

export function t(key: string, options?: object): string {
  return i18n.t(key, options);
}

export { i18n, LOCALE_STORAGE_KEY, isLocale };
