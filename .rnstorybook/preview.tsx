import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Preview } from '@storybook/react';
import { HeroUINativeProvider } from 'heroui-native';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Appearance, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Uniwind } from 'uniwind';

const THEME_STORAGE_KEY = '@easybus-theme-preference';

let pendingTheme: 'light' | 'dark' | null = null;
let currentTheme: 'light' | 'dark' | null = null;
let isInitialized = false;

const ThemeApplier = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(isInitialized);
  const frameRequested = useRef(false);

  useEffect(() => {
    if (!isInitialized) {
      setIsReady(true);
      isInitialized = true;
    }
  }, []);

  useEffect(() => {
    if (pendingTheme !== null && pendingTheme !== currentTheme) {
      currentTheme = pendingTheme;
      pendingTheme = null;

      if (!frameRequested.current) {
        frameRequested.current = true;
        requestAnimationFrame(() => {
          frameRequested.current = false;
          if (currentTheme) {
            Uniwind.setTheme(currentTheme);
          }
        });
      }
    }
  });

  useEffect(() => {
    if (!isInitialized) {
      const loadStoredTheme = async () => {
        let storedTheme: 'light' | 'dark' | null = null;

        try {
          const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
          if (stored === 'light' || stored === 'dark') {
            storedTheme = stored;
          }
        } catch (e) {
          console.log('Error loading theme from storage');
        }

        const theme =
          storedTheme ||
          (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');

        currentTheme = theme;
        pendingTheme = theme;
        Uniwind.setTheme(theme);
        isInitialized = true;
        setIsReady(true);
      };

      loadStoredTheme();
    }
  }, []);

  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        includeNames: true,
      },
    },
    layout: 'padded',
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#f9f9ff' },
        dark: { name: 'Dark', value: '#0c0e12' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const bgValue = (context.globals as { backgrounds?: { value?: string } })
        .backgrounds?.value;

      if (bgValue === 'light' || bgValue === 'dark') {
        pendingTheme = bgValue;
      }

      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeApplier>
            <HeroUINativeProvider
              config={{ devInfo: { stylingPrinciples: false } }}
            >
              <View style={{ flex: 1 }}>
                <Story />
              </View>
            </HeroUINativeProvider>
          </ThemeApplier>
        </GestureHandlerRootView>
      );
    },
  ],
};

export default preview;
