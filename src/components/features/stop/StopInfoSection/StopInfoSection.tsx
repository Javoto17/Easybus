import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { Stop } from '@/modules/stops/domain/Stop';

interface StopInfoSectionProps {
  stop: Stop;
}

export const StopInfoSection = React.memo(({ stop }: StopInfoSectionProps) => {
  const { t } = useTranslation();

  return (
    <View className="px-5 mb-8">
      <Typography variant={TypographyVariant.HeadlineMd} className="mb-4">
        {t('stop.stationInfo')}
      </Typography>

      <View className="p-4 rounded-xl bg-surface-container">
        <View className="gap-3">
          <View className="flex-row justify-between items-center">
            <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted}>
              {t('stop.stopId')}
            </Typography>
            <Typography variant={TypographyVariant.TitleSm}>{stop.stop}</Typography>
          </View>
          {stop.pmv && (
            <View className="flex-row justify-between items-center">
              <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted}>
                {t('stop.pmvPanel')}
              </Typography>
              <Typography variant={TypographyVariant.TitleSm}>{stop.pmv}</Typography>
            </View>
          )}
          <View className="flex-row justify-between items-center">
            <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted}>
              {t('stop.coordinates')}
            </Typography>
            <Typography variant={TypographyVariant.TitleSm}>
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
