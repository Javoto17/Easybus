import { Skeleton } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

export const FavoritesLoadingState = React.memo(() => {
  const { t } = useTranslation();

  return (
    <View className="px-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Typography variant={TypographyVariant.HeadlineMd}>{t('favorites.title')}</Typography>
      </View>
      <Skeleton className="h-28 rounded-2xl mb-3 bg-surface-container" />
      <Skeleton className="h-28 rounded-2xl bg-surface-container" />
    </View>
  );
});

FavoritesLoadingState.displayName = 'FavoritesLoadingState';
