import { Ionicons } from '@expo/vector-icons';
import { Button } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

interface StopErrorStateProps {
  onRetry: () => void;
}

export const StopErrorState = React.memo(({ onRetry }: StopErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-surface items-center justify-center px-5">
      <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center mb-6">
        <Ionicons name="alert-circle" size={32} color="#ff716c" />
      </View>
      <Typography variant={TypographyVariant.HeadlineMd} className="mb-2 text-center">
        {t('stop.errorTitle')}
      </Typography>
      <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mb-6 text-center">
        {t('stop.errorDescription')}
      </Typography>
      <Button variant="primary" onPress={onRetry}>
        <Button.Label>{t('common.retry')}</Button.Label>
      </Button>
    </View>
  );
});

StopErrorState.displayName = 'StopErrorState';
