import { View } from '@/tw';
import { Button } from 'heroui-native';

import { Typography, TypographyVariant } from './Typography/Typography';

interface AppErrorScreenProps {
  onRetry: () => void;
}

export function AppErrorScreen({ onRetry }: AppErrorScreenProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface px-6">
      <Typography variant={TypographyVariant.HeadlineMd}>No se pudo conectar</Typography>
      <Typography variant={TypographyVariant.BodyMd} className="text-center">
        Comprueba tu conexión e inténtalo de nuevo.
      </Typography>
      <Button onPress={onRetry}>Reintentar</Button>
    </View>
  );
}
