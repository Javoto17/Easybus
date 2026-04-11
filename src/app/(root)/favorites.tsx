import { t } from '@/i18n';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import {
  FavoriteItem,
  FavoritesEmptyState,
  FavoritesErrorState,
  FavoritesLoadingState,
} from '@/components/features/home';
import { ScreenLayout, Typography } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getStopsFavorites } from '@/modules/stops/application/favorites/getStopsFavorites';
import type { Stop } from '@/modules/stops/domain/Stop';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

type SectionType =
  | { type: 'header' }
  | { type: 'loading' }
  | { type: 'error'; onRetry: () => void }
  | { type: 'empty' }
  | { type: 'list'; favorites: Stop[] };

const FavoritesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stops-favorites'],
    queryFn: getStopsFavorites(stopRepository),
    staleTime: 1000 * 60 * 5,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['stops-favorites'] });
    setRefreshing(false);
  }, [queryClient]);

  useEffect(() => {
    navigation.setOptions({
      title: t('favorites.title'),
      headerLargeTitle: false,
    });
  }, [navigation]);

  const sections: SectionType[] = [
    { type: 'header' },
    ...(isLoading ? [{ type: 'loading' } as const] : []),
    ...(isError ? [{ type: 'error', onRetry: onRefresh } as const] : []),
    ...(favorites.length === 0 && !isLoading && !isError
      ? [{ type: 'empty' } as const]
      : []),
    ...(favorites.length > 0 ? [{ type: 'list', favorites } as const] : []),
  ];

  const renderFavorite = ({ item, index }: { item: Stop; index: number }) => {
    return <FavoriteItem stop={item} index={index} />;
  };

  const keyExtractorFavorite = (item: Stop) => item.stop;

  const renderSection = ({ item }: { item: SectionType }) => {
    if (item.type === 'header') {
      return (
        <View className="px-5 pt-6 pb-4">
          <Typography variant="label-sm" tone="muted" className="mb-2">
            {t('home.brand')}
          </Typography>
          <Typography variant="headline-md">{t('favorites.title')}</Typography>
          <Text className="text-sm text-on-surface-variant mt-2">
            {t('favorites.subtitle')}
          </Text>
        </View>
      );
    }

    if (item.type === 'loading') {
      return <FavoritesLoadingState />;
    }

    if (item.type === 'error') {
      return <FavoritesErrorState onRetry={item.onRetry} />;
    }

    if (item.type === 'empty') {
      return <FavoritesEmptyState />;
    }

    return (
      <View className="px-5 pb-safe-offset-6">
        <FlatList
          data={item.favorites}
          renderItem={renderFavorite}
          keyExtractor={keyExtractorFavorite}
          scrollEnabled={false}
          contentContainerClassName=""
        />
        <Text className="text-xs text-on-surface-variant mt-3">
          {t('favorites.addMore')}
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: SectionType, index: number) =>
    `${item.type}-${index}`;

  return (
    <ScreenLayout
      variant="flatlist"
      data={sections}
      keyExtractor={keyExtractor}
      renderItem={renderSection}
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

export default FavoritesScreen;
