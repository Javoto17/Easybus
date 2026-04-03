import { View } from '@/tw';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { HeroUINativeProviderRaw } from 'heroui-native/provider-raw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppTheme, useAppTheme } from '@/hooks/useAppTheme';

import StorybookUIRoot from '../../.rnstorybook';
import '../../global.css';

const queryClient = new QueryClient({});

function RootLayout() {
  const { theme, themeValue } = useAppTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProviderRaw>
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <QueryClientProvider client={queryClient}>
            <View className="flex-1">
              <Slot />
            </View>
          </QueryClientProvider>
        </ThemeProvider>
      </HeroUINativeProviderRaw>
    </GestureHandlerRootView>
  );
}

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

const AppEntryPoint = isStorybookEnabled ? StorybookUIRoot : RootLayout;

export default AppEntryPoint;
