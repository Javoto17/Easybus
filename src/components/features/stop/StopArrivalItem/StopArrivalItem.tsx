import { Card } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { StopArrival } from '@/modules/stops/domain/StopArrival';

interface StopArrivalItemProps {
  arrival: StopArrival;
  index: number;
}

// Format seconds to minutes
const formatTime = (seconds: number): string => {
  if (seconds < 60) return 'Llegando';
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
};

// Get status color based on deviation
const getStatusColor = (deviation: number): string => {
  if (deviation <= 0) return '#4ade80'; // On time - green
  if (deviation <= 300) return '#fbbf24'; // Slight delay - yellow
  return '#ff716c'; // Delayed - red
};

export const StopArrivalItem = React.memo(
  ({ arrival, index }: StopArrivalItemProps) => {
    const { t } = useTranslation();
    const isFirst = index === 0;

    return (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
        <Card
          className={
            isFirst ? 'bg-surface-container-high' : 'bg-surface-container'
          }
        >
          <Card.Body className="p-4">
            <View className="flex-row items-start justify-between">
              {/* Left: Line & Destination */}
              <View className="flex-row items-start gap-3 flex-1">
                {/* Line Badge */}
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center ${isFirst ? 'bg-primary' : 'bg-secondary-container'}`}
                >
                  <Typography
                    variant={TypographyVariant.TitleSm}
                    style={{
                      color: isFirst ? '#002c65' : '#c5d4fd',
                    }}
                  >
                    {arrival.line}
                  </Typography>
                </View>

                {/* Destination Info */}
                <View className="flex-1 pt-0.5">
                  <Typography variant={TypographyVariant.TitleSm} className="mb-0.5">
                    {arrival.destination}
                  </Typography>
                  <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted}>
                    {t('stop.arrivalBus', { id: arrival.bus })}
                  </Typography>
                </View>
              </View>

              {/* Right: Arrival Time */}
              <View className="items-end min-w-[80px]">
                <Typography
                  variant={TypographyVariant.HeadlineMd}
                  style={{
                    color: getStatusColor(arrival.deviation),
                  }}
                >
                  {formatTime(arrival.estimateArrive)}
                </Typography>
                {arrival.deviation > 0 && (
                  <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Danger} className="mt-0.5">
                    +{Math.floor(arrival.deviation / 60)} min
                  </Typography>
                )}
              </View>
            </View>
          </Card.Body>
        </Card>
      </Animated.View>
    );
  }
);

StopArrivalItem.displayName = 'StopArrivalItem';
