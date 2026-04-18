import React from 'react';
import { View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { StopArrival } from '@/modules/stops/domain/StopArrival';

import { StopArrivalItem } from '../StopArrivalItem/StopArrivalItem';

interface StopArrivalsListProps {
  arrivals: StopArrival[];
}

export const StopArrivalsList = React.memo(
  ({ arrivals }: StopArrivalsListProps) => {
    const { t } = useTranslation();

    if (arrivals.length === 0) return null;

    return (
      <View className="px-5 mb-6">
        {/* Section Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Typography variant={TypographyVariant.HeadlineMd}>
            {t('glossary.nextDepartures')}
          </Typography>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Tertiary}>
              {t('glossary.realTime')}
            </Typography>
          </View>
        </View>

        {/* Arrivals List */}
        <View className="gap-3">
          {arrivals.slice(0, 5).map((arrival, index) => (
            <StopArrivalItem
              key={`${arrival.line}-${arrival.bus}`}
              arrival={arrival}
              index={index}
            />
          ))}
        </View>
      </View>
    );
  }
);

StopArrivalsList.displayName = 'StopArrivalsList';
