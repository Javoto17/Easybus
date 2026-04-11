import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { LineDirection } from '@/modules/stops/domain/LineDetail';

import { LineDirectionItem } from '../LineDirectionItem';

interface LineDirectionsListProps {
  directions: LineDirection[];
  onPressDirection: (direction: LineDirection) => void;
}

export const LineDirectionsList = React.memo(
  ({ directions, onPressDirection }: LineDirectionsListProps) => {
    const { t } = useTranslation();

    if (directions.length === 0) {
      return null;
    }

    return (
      <View className="px-5 mb-6">
        <Typography variant="headline-md" className="mb-4">
          {t('line.chooseDirection')}
        </Typography>

        <Text className="text-sm text-on-surface-variant mb-3">
          {t('line.chooseDirectionDescription')}
        </Text>

        <FlatList
          data={directions}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <LineDirectionItem direction={item} onPress={onPressDirection} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
);

LineDirectionsList.displayName = 'LineDirectionsList';
