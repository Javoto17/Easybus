import { t } from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Button, Card } from 'heroui-native';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';

import { LineDirectionsList, LineHeader } from '@/components/features/line';
import { StopErrorState } from '@/components/features/stop';
import { ScreenLayout, Typography } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getLineDetail } from '@/modules/stops/application/line/getLineDetail';
import type {
  LineDetail,
  LineDirection,
} from '@/modules/stops/domain/LineDetail';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

type SectionType =
  | { type: 'header'; line: LineDetail | null; isLoading: boolean }
  | { type: 'directions'; directions: LineDirection[] }
  | { type: 'empty' };

const LineDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const local = useLocalSearchParams<{ lineId: string }>();
  const queryClient = useQueryClient();

  // Invalidar cache cuando la pantalla se enfoca para forzar recarga fresca
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: [`line-${local?.lineId}`],
      });
    }, [local?.lineId, queryClient])
  );

  const {
    data: line,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`line-${local?.lineId}`],
    queryFn: async () => {
      console.log('[LineDetail] Fetching line:', local?.lineId);
      const result = await getLineDetail(stopRepository)(
        local?.lineId as string
      );
      console.log('[LineDetail] API result:', JSON.stringify(result, null, 2));
      return result;
    },
    enabled: !!local?.lineId,
  });

  const onPressDirection = useCallback(
    (direction: LineDirection) => {
      if (!line?.line || !direction?.code) {
        return;
      }

      const directionPath = `/line/${line.line}/${direction.code}?lineLabel=${encodeURIComponent(
        line.label
      )}&directionName=${encodeURIComponent(direction.name)}`;

      router.push(directionPath as never);
    },
    [router, line]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    navigation.setOptions({
      title: line ? `${t('glossary.line')} ${line.line}` : t('glossary.line'),
      headerLargeTitle: false,
      headerBackTitleVisible: true,
      headerBackTitle: t('tabs.lines'),
    });
  }, [navigation, line]);

  if (isError) {
    return <StopErrorState onRetry={onRefresh} />;
  }

  const sections: SectionType[] = [
    { type: 'header', line: line ?? null, isLoading },
    ...(line?.directions?.length
      ? [{ type: 'directions', directions: line.directions } as const]
      : []),
    ...(!line?.directions?.length && !isLoading
      ? [{ type: 'empty' } as const]
      : []),
  ];

  const renderItem = ({ item }: { item: SectionType }) => {
    if (item.type === 'header') {
      return <LineHeader line={item.line} isLoading={item.isLoading} />;
    }

    if (item.type === 'directions') {
      return (
        <LineDirectionsList
          directions={item.directions}
          onPressDirection={onPressDirection}
        />
      );
    }

    if (item.type === 'empty') {
      return (
        <View className="px-5 py-12 items-center">
          <View className="w-20 h-20 rounded-2xl bg-surface-container-high items-center justify-center mb-5">
            <Ionicons name="git-branch-outline" size={32} color="#aaabb0" />
          </View>
          <Typography variant="headline-md" className="mb-2 text-center">
            {t('line.noDirections')}
          </Typography>
          <Text className="text-sm text-on-surface-variant text-center max-w-[280px] mb-5">
            {t('line.noDirectionsDescription')}
          </Text>
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
      ListFooterComponent={
        <View className="px-5 pb-safe-offset-6 pt-2 gap-3">
          <Typography variant="headline-md">{t('line.alertsTitle')}</Typography>

          <Card className="bg-surface-container" variant="default">
            <Card.Body className="p-4">
              <Typography variant="title-sm" className="mb-1">
                Obras cerca de Moncloa
              </Typography>
              <Text className="text-xs text-on-surface-variant">
                Se esperan pequeños retrasos por trabajos en accesos
                principales.
              </Text>
            </Card.Body>
          </Card>

          <Card className="bg-surface-container" variant="default">
            <Card.Body className="p-4">
              <Typography variant="title-sm" className="mb-1">
                Actualización de fin de semana
              </Typography>
              <Text className="text-xs text-on-surface-variant">
                Aumenta la frecuencia nocturna desde las 23:00 en esta línea.
              </Text>
            </Card.Body>
          </Card>
        </View>
      }
      edges={['bottom']}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LineDetailScreen;
