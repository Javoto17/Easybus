import React from 'react';
import { FlatList, View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

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
        <Typography variant={TypographyVariant.HeadlineMd} className="mb-4">
          {t('line.chooseDirection')}
        </Typography>

        <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mb-3">
          {t('line.chooseDirectionDescription')}
        </Typography>

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
