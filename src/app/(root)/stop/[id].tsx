import { t } from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Button, Dialog, Input } from 'heroui-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import {
  StopArrivalsList,
  StopEmptyState,
  StopErrorState,
  StopHeader,
  StopInfoSection,
  StopLinesList,
} from '@/components/features/stop';
import { ScreenLayout } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getStopDetail } from '@/modules/stops/application/detail/getStopDetail';
import { deleteFavorite as deleteFavoriteUseCase } from '@/modules/stops/application/favorites/deleteFavorite';
import { getStopIsFavorite } from '@/modules/stops/application/favorites/getStopIsFavorite';
import { saveFavorite } from '@/modules/stops/application/favorites/saveFavorite';
import type { Stop } from '@/modules/stops/domain/Stop';
import { StopArrival } from '@/modules/stops/domain/StopArrival';
import type { Dataline } from '@/modules/stops/domain/StopDataLine';
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
      stop: Stop | null;
      isLoading: boolean;
      fromLine?: string;
      fromDirection?: string;
      lineLabel?: string;
      directionName?: string;
    }
  | { type: 'arrivals'; arrivals: StopArrival[] }
  | { type: 'lines'; lines: Stop['dataLine'] }
  | { type: 'info'; stop: Stop }
  | { type: 'empty' };

const StopDetailScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customName, setCustomName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const local = useLocalSearchParams<{
    id: string;
    fromLine?: string;
    fromDirection?: string;
    lineLabel?: string;
    directionName?: string;
  }>();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const router = useRouter();

  const {
    data,
    isError: isErrorStop,
    isLoading: isLoadingStop,
    refetch,
  } = useQuery({
    queryKey: [`stop-${local?.id}`],
    queryFn: () => {
      return getStopDetail(
        stopRepository,
        storageRepository
      )(local?.id as string);
    },
    enabled: !!local?.id,
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: () => {
      return deleteFavoriteUseCase(stopRepository)(data?.stop as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${local?.id}-favorite`],
      });
      queryClient.invalidateQueries({
        queryKey: ['stops-favorites'],
      });
    },
  });

  const saveFavoriteMutation = useMutation({
    mutationFn: (name: string) => {
      const stop = data as Stop;
      const stopToSave = name ? { ...stop, customName: name } : stop;

      return saveFavorite(stopRepository)(stopToSave);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${local?.id}-favorite`],
      });
      queryClient.invalidateQueries({
        queryKey: ['stops-favorites'],
      });
    },
  });

  const { data: isFavorite } = useQuery({
    queryKey: [`${local?.id}-favorite`],
    queryFn: () => {
      return getStopIsFavorite(stopRepository)(local?.id as string);
    },
    enabled: !!local?.id,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const onPressRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [`${local?.id}-favorite`],
    });
    queryClient.invalidateQueries({
      queryKey: [`stop-${local?.id}`],
    });
  }, [local?.id, queryClient]);

  const handlePressConfirm = () => {
    saveFavoriteMutation.mutate(customName);
    setModalVisible(false);
    setCustomName('');
  };

  const handlePressCancel = () => {
    setModalVisible(false);
    setCustomName('');
  };

  const { mutate: deleteFavorite } = deleteFavoriteMutation;

  const onPressFavorite = useCallback(() => {
    if (isFavorite) {
      deleteFavorite();
      return;
    }
    setModalVisible(true);
  }, [isFavorite, deleteFavorite]);

  const onPressLine = useCallback(
    (line: Dataline) => {
      if (!line?.line) {
        return;
      }

      router.push(`/line/${line.line}` as never);
    },
    [router]
  );

  useEffect(() => {
    const hasLineContext = local?.fromLine && local?.fromDirection;
    const backTitle = hasLineContext
      ? local?.directionName || `Dir. ${local?.fromDirection}`
      : 'Paradas';

    navigation.setOptions({
      title: data?.customName || data?.name || 'Detalle',
      headerStyle: { backgroundColor: '#0c0e12' },
      headerTintColor: '#f6f6fc',
      headerBackTitle: backTitle?.substring(0, 12) || 'Volver',
      headerRight: () => (
        <View className="flex-row gap-3 mr-4">
          <Pressable onPress={onPressRefresh} className="p-2">
            <Ionicons name="refresh" size={22} color="#85adff" />
          </Pressable>
          <Pressable onPress={onPressFavorite} className="p-2">
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? '#ff716c' : '#85adff'}
            />
          </Pressable>
        </View>
      ),
    });
  }, [
    navigation,
    data,
    isFavorite,
    onPressRefresh,
    onPressFavorite,
    local?.fromLine,
    local?.fromDirection,
    local?.directionName,
  ]);

  if (isErrorStop) {
    return <StopErrorState onRetry={onRefresh} />;
  }

  const stop = data as Stop;
  const arrivals = stop?.arrives || [];
  const lines = stop?.dataLine || [];

  const sections: SectionType[] = [
    {
      type: 'header',
      stop,
      isLoading: isLoadingStop,
      fromLine: local?.fromLine,
      fromDirection: local?.fromDirection,
      lineLabel: local?.lineLabel,
      directionName: local?.directionName,
    },
    ...(arrivals.length > 0 ? [{ type: 'arrivals', arrivals } as const] : []),
    ...(lines.length > 0 ? [{ type: 'lines', lines } as const] : []),
    ...(stop ? [{ type: 'info', stop } as const] : []),
    ...(arrivals.length === 0 && !isLoadingStop
      ? [{ type: 'empty' } as const]
      : []),
  ];

  const renderSection = ({ item }: { item: SectionType }) => {
    switch (item.type) {
      case 'header':
        return (
          <StopHeader
            stop={item.stop}
            isLoading={item.isLoading}
            fromLine={item.fromLine}
            fromDirection={item.fromDirection}
            lineLabel={item.lineLabel}
            directionName={item.directionName}
          />
        );
      case 'arrivals':
        return <StopArrivalsList arrivals={item.arrivals} />;
      case 'lines':
        return <StopLinesList lines={item.lines} onPressLine={onPressLine} />;
      case 'info':
        return <StopInfoSection stop={item.stop} />;
      case 'empty':
        return <StopEmptyState />;
      default:
        return null;
    }
  };

  const keyExtractor = (item: SectionType, index: number) => {
    return `${item.type}-${index}`;
  };

  return (
    <>
      <ScreenLayout
        variant="flatlist"
        data={sections}
        keyExtractor={keyExtractor}
        renderItem={renderSection}
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

      <Dialog isOpen={modalVisible} onOpenChange={setModalVisible}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-surface/80" />
          <Dialog.Content className="bg-surface-container mx-5 rounded-2xl">
            <Dialog.Close />
            <Dialog.Title className="text-headline-md text-on-surface mb-4">
              {t('stop.saveFavorite')}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-on-surface-variant mb-4">
              {t('stop.saveFavoriteDescription')}
            </Dialog.Description>
            <Input
              value={customName}
              onChangeText={setCustomName}
              placeholder={t('stop.customNamePlaceholder')}
            />
            <View className="flex-row justify-end gap-3 mt-6">
              <Button variant="ghost" onPress={handlePressCancel}>
                <Button.Label>{t('common.cancel')}</Button.Label>
              </Button>
              <Button variant="primary" onPress={handlePressConfirm}>
                <Button.Label>{t('common.save')}</Button.Label>
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};

export default StopDetailScreen;
