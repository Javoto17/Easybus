import { useRouter } from 'expo-router';
import { Card } from 'heroui-native';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import { POPULAR_LINES, PopularLine } from './popularLines';

const AnimatedView = Animated.createAnimatedComponent(View);

const PopularLineItem = React.memo(
  ({
    item,
    index,
    onPressLine,
  }: {
    item: PopularLine;
    index: number;
    onPressLine: (lineId: string) => void;
  }) => (
    <AnimatedView entering={FadeInUp.delay(index * 100).duration(400)}>
      <Pressable onPress={() => onPressLine(item.number)}>
        <Card className="w-44 bg-surface-container" variant="default">
          <Card.Body className="p-4">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: item.color }}
            >
              <Typography variant={TypographyVariant.TitleSm} tone={TypographyTone.Inverse}>
                {item.number}
              </Typography>
            </View>
            <Card.Title className="text-sm text-on-surface leading-tight">
              {item.name}
            </Card.Title>
          </Card.Body>
        </Card>
      </Pressable>
    </AnimatedView>
  )
);

PopularLineItem.displayName = 'PopularLineItem';

export const PopularLinesSection = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();

  const onPressLine = React.useCallback(
    (lineId: string) => {
      router.push(`/line/${lineId}` as never);
    },
    [router]
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: PopularLine; index: number }) => (
      <PopularLineItem item={item} index={index} onPressLine={onPressLine} />
    ),
    [onPressLine]
  );

  const keyExtractor = React.useCallback((item: PopularLine) => item.id, []);

  return (
    <View className="mt-6 mb-6">
      <Typography variant={TypographyVariant.HeadlineMd} className="px-5 mb-4">
        {t('popular.title')}
      </Typography>
      <FlatList
        horizontal
        data={POPULAR_LINES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-5"
      />
    </View>
  );
});

PopularLinesSection.displayName = 'PopularLinesSection';
