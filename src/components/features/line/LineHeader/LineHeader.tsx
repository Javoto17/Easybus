import { Skeleton } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import type { LineDetail } from '@/modules/stops/domain/LineDetail';

interface LineHeaderProps {
  line: LineDetail | null;
  isLoading?: boolean;
}

export const LineHeader = React.memo(({ line, isLoading }: LineHeaderProps) => {
  if (isLoading) {
    return (
      <View className="px-5 pt-safe-or-6 pb-4">
        <View className="flex-row items-center gap-3 mb-3">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </View>
        <Skeleton className="h-8 w-3/4 rounded-lg mb-2" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </View>
    );
  }

  if (!line) {
    return null;
  }

  return (
    <View className="px-5 pt-safe-or-6 pb-4">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="px-3 py-1.5 rounded-full bg-secondary-container">
          <Typography
            variant="title-sm"
            tone="secondary"
            className="normal-case"
          >
            {line.line}
          </Typography>
        </View>
        <Typography variant="label-sm" tone="muted">
          Línea activa
        </Typography>
      </View>

      <Typography variant="headline-md" className="mb-2">
        {'hola'}
      </Typography>

      <Typography variant="headline-md" tone="muted">
        Servicio {line.startTime} - {line.stopTime} · Frecuencia {line.minFreq}{' '}
        a {line.maxFreq} min
      </Typography>
    </View>
  );
});

LineHeader.displayName = 'LineHeader';
