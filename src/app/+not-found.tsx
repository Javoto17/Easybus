import { Link, Stack } from 'expo-router';
import { Button } from 'heroui-native';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: '#0c0e12' },
          headerTintColor: '#f6f6fc',
        }}
      />
      <View className="flex-1 items-center justify-center bg-surface px-5">
        <View className="w-20 h-20 rounded-2xl bg-surface-container-high items-center justify-center mb-6">
          <Text className="text-4xl">🚌</Text>
        </View>
        <Typography variant="headline-md" className="mb-2 text-center">
          ¿Te has perdido?
        </Typography>
        <Text className="text-base text-on-surface-variant mb-8 text-center">
          Esta pantalla no existe en EasyBus.
        </Text>
        <Link href="/" asChild>
          <Button variant="primary" size="lg">
            <Button.Label>Volver al inicio</Button.Label>
          </Button>
        </Link>
      </View>
    </>
  );
}
