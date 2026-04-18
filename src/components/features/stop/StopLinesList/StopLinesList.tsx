import React from 'react';
import { FlatList, View } from 'react-native';

import { Typography, TypographyVariant } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { Dataline } from '@/modules/stops/domain/StopDataLine';

import { StopLineItem } from '../StopLineItem/StopLineItem';

interface StopLinesListProps {
  lines: Dataline[];
  onPressLine: (line: Dataline) => void;
}

export const StopLinesList = React.memo(
  ({ lines, onPressLine }: StopLinesListProps) => {
    const { t } = useTranslation();

    if (lines.length === 0) return null;

    const keyExtractor = (item: Dataline, index: number) => {
      return `${item.line}-${item.direction}-${index}`;
    };

    const renderLine = ({ item }: { item: Dataline }) => {
      return <StopLineItem line={item} onPress={onPressLine} />;
    };

    return (
      <View className="px-5 mb-6">
        <Typography variant={TypographyVariant.HeadlineMd} className="mb-4">
          {t('stop.linesInStop')}
        </Typography>

        <FlatList
          data={lines}
          keyExtractor={keyExtractor}
          renderItem={renderLine}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    );
  }
);

StopLinesList.displayName = 'StopLinesList';
