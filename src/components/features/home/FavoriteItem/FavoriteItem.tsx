import { Link } from 'expo-router';
import { Card } from 'heroui-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Icon, Typography } from '@/components/shared';

import type { Stop } from '@/modules/stops/domain/Stop';

interface FavoriteItemProps {
  stop: Stop;
  index: number;
}

export const FavoriteItem = React.memo(({ stop, index }: FavoriteItemProps) => (
  <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
    <Link href={`/stop/${stop.stop}`} asChild>
      <Pressable className="mb-3">
        <Card variant="default" className="bg-surface-container">
          <Card.Body className="p-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                {stop.customName && (
                  <Typography
                    variant="label-sm"
                    tone="primary"
                    className="normal-case mb-1"
                  >
                    {stop.customName}
                  </Typography>
                )}
                <Card.Title className="text-base text-on-surface mb-1">
                  {stop.name}
                </Card.Title>
                <Text className="text-xs text-on-surface-variant mb-3">
                  {stop.postalAddress}
                </Text>
                {stop.dataLine && stop.dataLine.length > 0 && (
                  <View className="flex-row flex-wrap gap-2">
                    {stop.dataLine.slice(0, 4).map((line) => (
                      <View
                        key={line.line}
                        className="px-2.5 py-1 rounded-lg bg-secondary-container"
                      >
                        <Typography
                          variant="label-sm"
                          tone="secondary"
                          className="normal-case"
                        >
                          {line.line}
                        </Typography>
                      </View>
                    ))}
                    {stop.dataLine.length > 4 && (
                      <Text className="text-xs text-on-surface-variant self-center">
                        +{stop.dataLine.length - 4}
                      </Text>
                    )}
                  </View>
                )}
              </View>
              <Icon name="chevron-forward" size="sm" color="muted" />
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    </Link>
  </Animated.View>
));

FavoriteItem.displayName = 'FavoriteItem';
