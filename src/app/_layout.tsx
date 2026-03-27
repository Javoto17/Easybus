import 'react-native-reanimated';
import Constants from 'expo-constants';

import { Slot } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from '@/tw';

import '../styles/global.css';

const queryClient = new QueryClient({});

function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <View className="flex flex-1 bg-primary">
          <Slot />
        </View>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

let AppEntryPoint = RootLayout;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./../../.storybook').default;
}

export default AppEntryPoint;
