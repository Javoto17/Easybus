import { t } from '@/i18n';
import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: '#f6f6fc',
        headerShadowVisible: false,
        headerLargeTitleEnabled: true,
        headerLargeStyle: { backgroundColor: 'transparent' },
        headerBlurEffect: 'systemChromeMaterial',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'EasyBus',
          headerSearchBarOptions: {
            placeholder: t('home.searchPlaceholder'),
            hideWhenScrolling: false,
            hideNavigationBar: false,
          },
        }}
      />
      <Stack.Screen
        name="stop/[id]"
        options={{
          title: t('stop.detail'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="line/[lineId]"
        options={{
          title: t('line.line'),
          headerLargeTitle: false,
          headerBackTitle: t('lines.title'),
        }}
      />
      <Stack.Screen
        name="line/[lineId]/[direction]"
        options={{
          title: t('line.stops'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: t('favorites.title'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="lines"
        options={{
          title: t('lines.title'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="nearby"
        options={{
          title: t('nearby.title'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: t('quickActions.map'),
          headerLargeTitle: false,
        }}
      />
    </Stack>
  );
}
