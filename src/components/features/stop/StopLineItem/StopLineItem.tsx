import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Typography } from '@/components/shared';

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
            <View className="w-11 h-11 rounded-xl bg-surface-container-high items-center justify-center">
              <Typography variant="title-sm" tone="primary">
                {line.line}
              </Typography>
            </View>
            <View>
              <Typography variant="title-sm">
                {line.label || `${t('glossary.line')} ${line.line}`}
              </Typography>
              <Text className="text-xs text-on-surface-variant">
                {t('stop.via', { destination: line.headerB || line.label })}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#aaabb0" />
        </View>
      </Pressable>
    );
  }
);

StopLineItem.displayName = 'StopLineItem';
