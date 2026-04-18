import React from 'react';
import { FlatList, View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

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
        <Typography variant={TypographyVariant.HeadlineMd} className="mb-4">
          {t('line.routeOverview')}
        </Typography>

        <FlatList
          data={stops}
          keyExtractor={keyExtractor}
          renderItem={renderStopItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />

        <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted} className="mt-3">
          {t('line.totalDistance', {
            distance: Math.max(1, Number((stops.length * 0.8).toFixed(1))),
          })}
        </Typography>
      </View>
    );
  }
);

LineStopsList.displayName = 'LineStopsList';
