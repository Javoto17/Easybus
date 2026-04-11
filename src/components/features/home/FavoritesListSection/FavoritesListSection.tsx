import { useRouter } from 'expo-router';
import { Button } from 'heroui-native';
import React from 'react';
import { FlatList, View } from 'react-native';

import { Typography } from '@/components/shared';

import type { Stop } from '@/modules/stops/domain/Stop';

import { FavoriteItem } from '../FavoriteItem';

interface FavoritesListSectionProps {
  favorites: Stop[];
}

export const FavoritesListSection = React.memo(
  ({ favorites }: FavoritesListSectionProps) => {
    const router = useRouter();

    const onPressViewAll = React.useCallback(() => {
      router.push('/favorites' as never);
    }, [router]);

    const renderItem = React.useCallback(
      ({ item, index }: { item: Stop; index: number }) => (
        <FavoriteItem stop={item} index={index} />
      ),
      []
    );

    const keyExtractor = React.useCallback((item: Stop) => item.stop, []);

    return (
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Typography variant="headline-md">Favoritos</Typography>
          <Button variant="ghost" size="sm" onPress={onPressViewAll}>
            <Button.Label className="text-primary">Ver todos</Button.Label>
          </Button>
        </View>
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          contentContainerClassName="gap-3 px-5"
        />
      </View>
    );
  }
);

FavoritesListSection.displayName = 'FavoritesListSection';
