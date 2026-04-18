import { t } from '@/i18n';
import { useNavigation, useRouter } from 'expo-router';
import { Button, Card } from 'heroui-native';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';

import { ScreenLayout, Typography, TypographyVariant, TypographyTone } from '@/components/shared';

const nearbyStops = [
  {
    id: '70',
    name: t('nearby.stops.70'),
    subtitle: `3 ${t('nearby.linesAvailable')}`,
    distance: '260 m',
  },
  {
    id: '73',
    name: t('nearby.stops.73'),
    subtitle: `2 ${t('nearby.linesAvailable')}`,
    distance: '410 m',
  },
  {
    id: '75',
    name: t('nearby.stops.75'),
    subtitle: `5 ${t('nearby.linesAvailable')}`,
    distance: '620 m',
  },
];

const NearbyScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: t('nearby.title'),
      headerLargeTitle: false,
    });
  }, [navigation]);

  return (
    <ScreenLayout
      variant="scroll"
      contentClassName="px-5 pt-6 pb-safe-offset-6"
      className="flex-1"
    >
      <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="mb-2">
        {t('nearby.currentLocation')}
      </Typography>
      <Card className="bg-surface-container-high mb-5" variant="default">
        <Card.Body className="p-4">
          <Typography variant={TypographyVariant.TitleSm}>
            {t('nearby.currentLocationName')}
          </Typography>
          <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="mt-1">
            {t('nearby.updatedRecently')}
          </Typography>
        </Card.Body>
      </Card>

      <Typography variant={TypographyVariant.HeadlineMd}>{t('nearby.nearbyStops')}</Typography>
      <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-2 mb-4">
        {t('nearby.nearbyDescription')}
      </Typography>

      <View className="gap-3 mb-6">
        {nearbyStops.map((stop) => (
          <Pressable
            key={stop.id}
            onPress={() => router.push(`/stop/${stop.id}` as never)}
            className="active:opacity-80"
          >
            <Card className="bg-surface-container" variant="default">
              <Card.Body className="p-4">
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Typography variant={TypographyVariant.TitleSm}>{stop.name}</Typography>
                    <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="mt-1">
                      {stop.subtitle}
                    </Typography>
                  </View>
                  <View className="px-3 py-1.5 rounded-full bg-surface-container-high">
                    <Typography
                      variant={TypographyVariant.LabelSm}
                      tone={TypographyTone.Primary}
                      className="normal-case"
                    >
                      {stop.distance}
                    </Typography>
                  </View>
                </View>
              </Card.Body>
            </Card>
          </Pressable>
        ))}
      </View>

      <Button variant="primary" onPress={() => router.push('/lines' as never)}>
        <Button.Label>{t('nearby.exploreAllLines')}</Button.Label>
      </Button>
    </ScreenLayout>
  );
};

export default NearbyScreen;
