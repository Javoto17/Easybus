import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

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
            <Typography variant={TypographyVariant.TitleSm}>{stop.name}</Typography>
            {!!stop.postalAddress && (
              <Typography
                variant={TypographyVariant.LabelSm}
                tone={TypographyTone.Muted}
                className="mt-1"
                numberOfLines={1}
              >
                {stop.postalAddress}
              </Typography>
            )}
            <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Primary} className="mt-1">
              {t('glossary.stop')} #{stop.stop}
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#c3c6d3" />
        </View>
      </Pressable>
    );
  }
);

LineStopItem.displayName = 'LineStopItem';
