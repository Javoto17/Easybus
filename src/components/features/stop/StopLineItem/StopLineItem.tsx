import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import type { Dataline } from '@/modules/stops/domain/StopDataLine';

interface StopLineItemProps {
  line: Dataline;
  onPress: (line: Dataline) => void;
}

export const StopLineItem = React.memo(
  ({ line, onPress }: StopLineItemProps) => {
    const { t } = useTranslation();

    return (
      <Pressable
        className="p-4 rounded-xl bg-surface-container active:bg-surface-container-high"
        onPress={() => onPress(line)}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-surface-container-high items-center justify-center">
              <Typography variant={TypographyVariant.TitleSm} tone={TypographyTone.Primary}>
                {line.line}
              </Typography>
            </View>
            <View>
              <Typography variant={TypographyVariant.TitleSm}>
                {line.label || `${t('glossary.line')} ${line.line}`}
              </Typography>
              <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted}>
                {t('stop.via', { destination: line.headerB || line.label })}
              </Typography>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#c3c6d3" />
        </View>
      </Pressable>
    );
  }
);

StopLineItem.displayName = 'StopLineItem';
