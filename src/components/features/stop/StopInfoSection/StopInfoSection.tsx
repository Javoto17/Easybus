import React from 'react';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { Stop } from '@/modules/stops/domain/Stop';

interface StopInfoSectionProps {
  stop: Stop;
}

export const StopInfoSection = React.memo(({ stop }: StopInfoSectionProps) => {
  const { t } = useTranslation();

  return (
    <View className="px-5 mb-8">
      <Typography variant="headline-md" className="mb-4">
        {t('stop.stationInfo')}
      </Typography>

      <View className="p-4 rounded-xl bg-surface-container">
        <View className="gap-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-on-surface-variant">
              {t('stop.stopId')}
            </Text>
            <Typography variant="title-sm">{stop.stop}</Typography>
          </View>
          {stop.pmv && (
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-on-surface-variant">
                {t('stop.pmvPanel')}
              </Text>
              <Typography variant="title-sm">{stop.pmv}</Typography>
            </View>
          )}
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-on-surface-variant">
              {t('stop.coordinates')}
            </Text>
            <Typography variant="title-sm">
              {stop.geometry?.coordinates?.[1].toFixed(5)},{' '}
              {stop.geometry?.coordinates?.[0].toFixed(5)}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
});

StopInfoSection.displayName = 'StopInfoSection';
