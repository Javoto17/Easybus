import { t } from '@/i18n';
import { Card, Skeleton } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import type { Stop } from '@/modules/stops/domain/Stop';

interface StopHeaderProps {
  stop: Stop | null;
  isLoading: boolean;
  fromLine?: string;
  fromDirection?: string;
  lineLabel?: string;
  directionName?: string;
}

const formatEta = (seconds?: number) => {
  if (seconds === undefined || seconds === null) {
    return '--';
  }

  if (seconds < 60) {
    return 'Llegando';
  }

  return `${Math.floor(seconds / 60)} min`;
};

const getServiceStatus = (deviation?: number) => {
  if (deviation === undefined || deviation === null) {
    return t('glossary.offline');
  }

  if (deviation <= 0) {
    return t('stop.onTime');
  }

  if (deviation <= 300) {
    return 'Leve demora';
  }

  return 'Con demora';
};

export const StopHeader = React.memo(
  ({
    stop,
    isLoading,
    fromLine,
    fromDirection,
    lineLabel,
    directionName,
  }: StopHeaderProps) => {
    if (isLoading) {
      return (
        <View className="px-5 pt-6 pb-4 bg-surface">
          <View className="gap-3 mb-4">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </View>
          <View className="rounded-2xl bg-surface-container-low p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-lg" />
            </View>
            <Skeleton className="h-11 w-1/2 rounded-lg mb-2" />
            <Skeleton className="h-4 w-2/3 rounded-lg mb-3" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </View>
        </View>
      );
    }

    if (!stop) return null;

    const hasLineContext = fromLine && fromDirection;
    const mainArrival = stop.arrives?.[0];
    const etaLabel = formatEta(mainArrival?.estimateArrive);
    const serviceStatus = getServiceStatus(mainArrival?.deviation);
    const directionLabel = mainArrival?.destination || t('line.noDirections');

    return (
      <View className="px-5 pt-6 pb-4 bg-surface">
        <Typography variant="headline-md" className="mb-1">
          {stop.customName || stop.name}
        </Typography>
        <Text className="text-sm text-on-surface-variant mb-4">
          {hasLineContext
            ? `${lineLabel || `${t('glossary.line')} ${fromLine}`} · ${directionName || `${t('glossary.direction')} ${fromDirection}`}`
            : t('stop.stationInfo')}
        </Text>

        <Card
          className="rounded-3xl bg-surface-container-low"
          variant="default"
        >
          <Card.Body className="p-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                {hasLineContext ? (
                  <View className="px-2.5 py-1 rounded-full bg-secondary-container">
                    <Typography
                      variant="label-sm"
                      tone="secondary"
                      className="normal-case"
                    >
                      {lineLabel || `${t('glossary.line')} ${fromLine}`}
                    </Typography>
                  </View>
                ) : null}

                <Typography
                  variant="label-sm"
                  tone="muted"
                  className="normal-case"
                >
                  {t('glossary.stop')} {stop.stop}
                </Typography>
              </View>
              <Typography variant="label-sm" tone="tertiary">
                {serviceStatus}
              </Typography>
            </View>

            <Typography variant="display-lg">{etaLabel}</Typography>

            <Text className="text-sm text-on-surface-variant mt-1 mb-4">
              {t('glossary.realTime')}
            </Text>

            <View className="rounded-2xl bg-surface-container-high px-3 py-3">
              <Typography variant="headline-md">{directionLabel}</Typography>
              <Text className="text-xs text-on-surface-variant mt-1">
                {t('stop.stationEntrance')}
              </Text>
            </View>
          </Card.Body>
        </Card>

        {stop.dataLine && stop.dataLine.length > 0 && (
          <View className="flex-row items-center gap-3 mt-4 mb-2">
            <View className="px-3 py-1.5 rounded-full bg-secondary-container">
              <Typography
                variant="title-sm"
                tone="secondary"
                className="normal-case"
              >
                {stop.dataLine[0].line}
              </Typography>
            </View>
            <Text className="text-xs text-on-surface-variant">
              {t('stop.linesInStop')}
            </Text>
          </View>
        )}

        <Typography variant="label-sm" tone="muted" className="mb-1 mt-1">
          {t('stop.stationEntrance')}
        </Typography>
        <Text className="text-sm text-on-surface-variant leading-5">
          {stop.postalAddress}
        </Text>
      </View>
    );
  }
);

StopHeader.displayName = 'StopHeader';
