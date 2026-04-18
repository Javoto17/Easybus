import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

interface FavoritesErrorStateProps {
  onRetry: () => void;
}

export const FavoritesErrorState = React.memo(
  ({ onRetry }: FavoritesErrorStateProps) => {
    const { t } = useTranslation();

    return (
      <View className="px-5 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Typography variant={TypographyVariant.HeadlineMd}>{t('favorites.title')}</Typography>
        </View>
        <Card variant="secondary" className="py-8 bg-surface-container-low">
          <Card.Body className="items-center">
            <View className="w-14 h-14 rounded-full bg-error-container items-center justify-center mb-3">
              <Ionicons
                name="cloud-offline-outline"
                size={24}
                color="#ff716c"
              />
            </View>
            <Typography variant={TypographyVariant.TitleSm} className="mb-1 text-center">
              {t('favorites.error')}
            </Typography>
            <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="text-center px-4 mb-4">
              {t('favorites.errorDescription')}
            </Typography>
            <Button variant="primary" size="sm" onPress={onRetry}>
              <Button.Label>{t('common.retry')}</Button.Label>
            </Button>
          </Card.Body>
        </Card>
      </View>
    );
  }
);

FavoritesErrorState.displayName = 'FavoritesErrorState';
