import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Card } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

export const FavoritesEmptyState = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();

  const onExploreNearby = () => {
    router.push('/nearby' as never);
  };

  return (
    <View className="px-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Typography variant={TypographyVariant.HeadlineMd}>{t('favorites.title')}</Typography>
      </View>
      <Card variant="secondary" className="py-8 bg-surface-container-low">
        <Card.Body className="items-center">
          <View className="w-14 h-14 rounded-full bg-surface-container-high items-center justify-center mb-3">
            <Ionicons
              name="heart-outline"
              size={24}
              color="#c3c6d3"
            />
          </View>
          <Typography variant={TypographyVariant.TitleSm} className="mb-1">
            {t('favorites.empty')}
          </Typography>
          <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="text-center px-4 mb-4">
            {t('favorites.emptyDescription')}
          </Typography>
          <Button variant="primary" size="sm" onPress={onExploreNearby}>
            <Button.Label>{t('favorites.emptyAction')}</Button.Label>
          </Button>
        </Card.Body>
      </Card>
    </View>
  );
});

FavoritesEmptyState.displayName = 'FavoritesEmptyState';
