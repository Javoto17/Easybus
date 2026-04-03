import { useEffect, useState } from 'react';

type ColorScheme = 'light' | 'dark';

const getColorScheme = (): ColorScheme => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getColorScheme);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    onChange();
    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);

  return colorScheme;
}
