import { Ionicons } from '@expo/vector-icons';
import { Button } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

interface StopErrorStateProps {
  onRetry: () => void;
}

export const StopErrorState = React.memo(({ onRetry }: StopErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-surface items-center justify-center px-5">
      <View className="w-20 h-20 rounded-2xl bg-surface-container-high items-center justify-center mb-6">
        <Ionicons name="alert-circle" size={32} color="#ff716c" />
      </View>
      <Typography variant="headline-md" className="mb-2 text-center">
        {t('stop.errorTitle')}
      </Typography>
      <Text className="text-sm text-on-surface-variant mb-6 text-center">
        {t('stop.errorDescription')}
      </Text>
      <Button variant="primary" onPress={onRetry}>
        <Button.Label>{t('common.retry')}</Button.Label>
      </Button>
    </View>
  );
});

StopErrorState.displayName = 'StopErrorState';
