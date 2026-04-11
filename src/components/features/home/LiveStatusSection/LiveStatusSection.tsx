import { useRouter } from 'expo-router';
import { Card } from 'heroui-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { IconBadge, Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

export const LiveStatusSection = React.memo(() => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="px-5 mb-8">
      <Animated.View entering={FadeInUp.delay(400).duration(400)}>
        <Pressable onPress={() => router.push('/nearby' as never)}>
          <Card className="bg-surface-bright/60">
            <Card.Body className="p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <IconBadge
                    name="time-outline"
                    variant="solid"
                    containerColor="tertiary"
                    size="lg"
                  />
                  <View>
                    <Typography variant="title-sm">
                      {t('liveStatus.title')}
                    </Typography>
                    <Text className="text-sm text-on-surface-variant">
                      {t('liveStatus.subtitle')}
                    </Text>
                  </View>
                </View>
                <View className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              </View>
            </Card.Body>
          </Card>
        </Pressable>
      </Animated.View>
    </View>
  );
});

LiveStatusSection.displayName = 'LiveStatusSection';
