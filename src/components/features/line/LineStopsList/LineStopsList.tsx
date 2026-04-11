import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { LineStop } from '@/modules/stops/domain/LineDetail';

import { LineStopItem } from '../LineStopItem';

interface LineStopsListProps {
  stops: LineStop[];
  onPressStop: (stop: LineStop) => void;
}

export const LineStopsList = React.memo(
  ({ stops, onPressStop }: LineStopsListProps) => {
    const { t } = useTranslation();

    const renderStopItem = ({ item }: { item: LineStop }) => {
      return <LineStopItem stop={item} onPress={onPressStop} />;
    };

    const keyExtractor = (item: LineStop) => item.stop;

    return (
      <View className="px-5 pb-safe-offset-4">
        <Typography variant="headline-md" className="mb-4">
          {t('line.routeOverview')}
        </Typography>

        <FlatList
          data={stops}
          keyExtractor={keyExtractor}
          renderItem={renderStopItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />

        <Text className="text-xs text-on-surface-variant mt-3">
          {t('line.totalDistance', {
            distance: Math.max(1, Number((stops.length * 0.8).toFixed(1))),
          })}
        </Text>
      </View>
    );
  }
);

LineStopsList.displayName = 'LineStopsList';
