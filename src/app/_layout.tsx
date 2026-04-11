import { View } from '@/tw';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, SplashScreen } from 'expo-router';
import { HeroUINativeProviderRaw } from 'heroui-native/provider-raw';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/useAppTheme';

import StorybookUIRoot from '../../.rnstorybook';
import '../../global.css';

const queryClient = new QueryClient({});

const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

if (isStorybookEnabled) {
  SplashScreen.hideAsync();
}

function RootLayout() {
  const { theme } = useAppTheme();

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <HeroUINativeProviderRaw>
          <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>
              <View className="flex-1">
                <Slot />
              </View>
            </QueryClientProvider>
          </ThemeProvider>
        </HeroUINativeProviderRaw>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const AppEntryPoint = isStorybookEnabled ? StorybookUIRoot : RootLayout;

export default AppEntryPoint;
