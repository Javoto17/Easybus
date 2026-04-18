import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

interface StopEmptyStateProps {
  onRefresh?: () => void;
}

export const StopEmptyState = React.memo(
  ({ onRefresh }: StopEmptyStateProps) => {
    const { t } = useTranslation();

    return (
      <View className="px-5 py-12 items-center">
        <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center mb-5">
          <MaterialCommunityIcons name="bus-clock" size={32} color="#c3c6d3" />
        </View>
        <Typography variant={TypographyVariant.HeadlineMd} className="mb-2 text-center">
          {t('stop.noArrivals')}
        </Typography>
        <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="text-center max-w-[280px] mb-5">
          {t('stop.noArrivalsDescription')}
        </Typography>
        {onRefresh && (
          <Button variant="ghost" size="sm" onPress={onRefresh}>
            <Button.Label>{t('stop.noArrivalsAction')}</Button.Label>
          </Button>
        )}
      </View>
    );
  }
);

StopEmptyState.displayName = 'StopEmptyState';
