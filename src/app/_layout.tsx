import 'react-native-reanimated';
import Constants from 'expo-constants';

import { Slot } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import '../styles/global.css';

function RootLayout() {
  useReactQueryDevTools(queryClient);

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

let AppEntryPoint = RootLayout;

if (Constants.expoConfig.extra.storybookEnabled === 'true') {
  AppEntryPoint = require('./../../.storybook').default;
}

export default AppEntryPoint;
