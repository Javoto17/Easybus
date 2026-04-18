import { t } from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Button, Card } from 'heroui-native';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';

import { LineStopsList } from '@/components/features/line';
import { StopErrorState } from '@/components/features/stop';
import { ScreenLayout, Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getLineStopsByDirection } from '@/modules/stops/application/line/getLineStopsByDirection';
import type { LineStop } from '@/modules/stops/domain/LineDetail';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

type SectionType =
  | {
      type: 'header';
      lineId: string;
      lineLabel: string;
      directionName: string;
      etaLabel: string;
    }
  | { type: 'stops'; stops: LineStop[] }
  | { type: 'empty' };

const LineDirectionStopsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const local = useLocalSearchParams<{
    lineId: string;
    direction: string;
    lineLabel?: string;
    directionName?: string;
  }>();

  const {
    data: stops = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: [`line-${local?.lineId}-direction-${local?.direction}`],
    queryFn: () =>
      getLineStopsByDirection(stopRepository)(
        local?.lineId as string,
        local?.direction as string
      ),
    enabled: !!local?.lineId && !!local?.direction,
  });

  const onPressStop = useCallback(
    (stop: LineStop) => {
      if (!stop?.stop) {
        return;
      }

      router.push(
        `/stop/${stop.stop}?fromLine=${local?.lineId}&fromDirection=${local?.direction}&lineLabel=${encodeURIComponent(local?.lineLabel || '')}&directionName=${encodeURIComponent(local?.directionName || '')}` as never
      );
    },
    [
      router,
      local?.lineId,
      local?.direction,
      local?.lineLabel,
      local?.directionName,
    ]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    const lineLabel =
      local?.lineLabel || `${t('glossary.line')} ${local?.lineId}`;
    const directionTitle =
      local?.directionName ||
      t('line.directionCode', { code: local?.direction ?? '' });

    navigation.setOptions({
      title: directionTitle,
      headerLargeTitle: false,
      headerBackTitle: lineLabel?.substring(0, 10) || 'Línea',
    });
  }, [
    navigation,
    local?.directionName,
    local?.direction,
    local?.lineLabel,
    local?.lineId,
  ]);

  if (isError) {
    return <StopErrorState onRetry={onRefresh} />;
  }

  const sections: SectionType[] = [
    {
      type: 'header',
      lineId: local?.lineId ?? '',
      lineLabel: local?.lineLabel || `${t('glossary.line')} ${local?.lineId}`,
      directionName:
        local?.directionName ||
        t('line.directionCode', { code: local?.direction ?? '' }),
      etaLabel:
        stops.length > 0
          ? `${Math.max(2, Math.min(9, stops.length))} min`
          : '--',
    },
    ...(stops.length > 0 ? [{ type: 'stops', stops } as const] : []),
    ...(stops.length === 0 ? [{ type: 'empty' } as const] : []),
  ];

  const renderItem = ({ item }: { item: SectionType }) => {
    if (item.type === 'header') {
      return (
        <View className="px-5 pt-6 pb-4 bg-surface">
          <Card
            className="rounded-3xl bg-surface-container-low"
            variant="default"
          >
            <Card.Body className="p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="px-2.5 py-1 rounded-full bg-secondary-container">
                  <Typography
                    variant={TypographyVariant.LabelSm}
                    tone={TypographyTone.Secondary}
                    className="normal-case"
                  >
                    {item.lineLabel}
                  </Typography>
                </View>
                <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Tertiary}>
                  {t('stop.onTime')}
                </Typography>
              </View>

              <Typography variant={TypographyVariant.DisplayLg}>{item.etaLabel}</Typography>

              <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-1 mb-4">
                {t('stop.nextStopApprox')}
              </Typography>

              <View className="rounded-2xl bg-surface-container-high px-3 py-3">
                <Typography variant={TypographyVariant.HeadlineMd}>
                  {item.directionName}
                </Typography>
                <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="mt-1">
                  {t('line.routeOverview')}
                </Typography>
              </View>
            </Card.Body>
          </Card>

          <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-4">
            {t('glossary.nextDepartures')}
          </Typography>
        </View>
      );
    }

    if (item.type === 'stops') {
      return <LineStopsList stops={item.stops} onPressStop={onPressStop} />;
    }

    if (item.type === 'empty') {
      return (
        <View className="px-5 py-12 items-center">
          <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center mb-5">
            <Ionicons name="location-outline" size={32} color="#c3c6d3" />
          </View>
          <Typography variant={TypographyVariant.HeadlineMd} className="mb-2 text-center">
            {t('line.noStops')}
          </Typography>
          <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="text-center max-w-[280px] mb-5">
            {t('line.noStopsDirection')}
          </Typography>
          <Button variant="ghost" size="sm" onPress={onRefresh}>
            <Button.Label>{t('common.retry')}</Button.Label>
          </Button>
        </View>
      );
    }

    return null;
  };

  const keyExtractor = (item: SectionType, index: number) => {
    return `${item.type}-${index}`;
  };

  return (
    <ScreenLayout
      variant="flatlist"
      data={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#85adff"
          colors={['#85adff']}
        />
      }
      edges={['bottom']}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LineDirectionStopsScreen;
