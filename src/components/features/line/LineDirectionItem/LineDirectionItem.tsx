import { Card } from 'heroui-native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '@/components/shared/Icon';

import { useTranslation } from '@/hooks/useTranslation';

import type { LineDirection } from '@/modules/stops/domain/LineDetail';

interface LineDirectionItemProps {
  direction: LineDirection;
  onPress: (direction: LineDirection) => void;
}

export const LineDirectionItem = React.memo(
  ({ direction, onPress }: LineDirectionItemProps) => {
    const { t } = useTranslation();

    return (
      <Pressable onPress={() => onPress(direction)}>
        <Card
          variant="default"
          className="p-4 rounded-xl bg-surface-container active:bg-surface-container-high"
        >
          <Card.Body className="p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-y-1">
                <Card.Title className="text-base text-on-surface">
                  {direction.name}
                </Card.Title>
                <Card.Description className="text-xs text-on-surface-variant">
                  {t('line.directionCode', { code: direction.code })}
                </Card.Description>
              </View>
              <Icon
                name="chevron-forward"
                size="sm"
                color="default"
                className="text-on-surface"
              />
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    );
  }
);

LineDirectionItem.displayName = 'LineDirectionItem';
