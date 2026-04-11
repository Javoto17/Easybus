import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

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
          <Typography variant="headline-md">{t('favorites.title')}</Typography>
        </View>
        <Card variant="secondary" className="py-8 bg-surface-container-low">
          <Card.Body className="items-center">
            <View className="w-14 h-14 rounded-2xl bg-error-container items-center justify-center mb-3">
              <Ionicons
                name="cloud-offline-outline"
                size={24}
                color="#ff716c"
              />
            </View>
            <Typography variant="title-sm" className="mb-1 text-center">
              {t('favorites.error')}
            </Typography>
            <Text className="text-xs text-on-surface-variant text-center px-4 mb-4">
              {t('favorites.errorDescription')}
            </Text>
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
