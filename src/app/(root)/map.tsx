import { useNavigation, useRouter } from 'expo-router';
import { Button } from 'heroui-native';
import React, { useEffect } from 'react';

import { ScreenLayout, Typography, TypographyVariant, TypographyTone } from '@/components/shared';

const MapScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: 'Mapa',
      headerLargeTitle: false,
    });
  }, [navigation]);

  return (
    <ScreenLayout variant="scroll" contentClassName="px-5 pt-8">
      <Typography variant={TypographyVariant.HeadlineMd}>Mapa de paradas</Typography>
      <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-3 mb-6">
        La navegación ya está conectada y la pantalla queda lista para integrar
        el mapa interactivo.
      </Typography>
      <Button variant="primary" onPress={() => router.push('/' as never)}>
        <Button.Label>Volver al inicio</Button.Label>
      </Button>
    </ScreenLayout>
  );
};

export default MapScreen;
