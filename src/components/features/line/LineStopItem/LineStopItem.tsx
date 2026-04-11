import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { LineStop } from '@/modules/stops/domain/LineDetail';

interface LineStopItemProps {
  stop: LineStop;
  onPress: (stop: LineStop) => void;
}

export const LineStopItem = React.memo(
  ({ stop, onPress }: LineStopItemProps) => {
    const { t } = useTranslation();

    return (
      <Pressable
        className="p-4 rounded-xl bg-surface-container active:bg-surface-container-high"
        onPress={() => onPress(stop)}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Typography variant="title-sm">{stop.name}</Typography>
            {!!stop.postalAddress && (
              <Text
                className="text-xs text-on-surface-variant mt-1"
                numberOfLines={1}
              >
                {stop.postalAddress}
              </Text>
            )}
            <Text className="text-xs text-primary mt-1">
              {t('glossary.stop')} #{stop.stop}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#aaabb0" />
        </View>
      </Pressable>
    );
  }
);

LineStopItem.displayName = 'LineStopItem';
