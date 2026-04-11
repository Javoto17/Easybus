import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { IconBadge, type IconName, Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

const AnimatedView = Animated.createAnimatedComponent(View);

interface QuickActionConfig {
  id: string;
  label: string;
  icon: IconName;
  color: 'primary' | 'danger' | 'secondary' | 'tertiary';
  route: string;
}

interface QuickActionItemProps {
  item: QuickActionConfig;
  index: number;
  onPressAction: (route: string) => void;
}

const QuickActionItem = React.memo(
  ({ item, index, onPressAction }: QuickActionItemProps) => (
    <AnimatedView
      entering={FadeInUp.delay(index * 100).duration(400)}
      className="items-center"
    >
      <Pressable
        className="items-center gap-2"
        onPress={() => onPressAction(item.route)}
      >
        <IconBadge
          name={item.icon}
          variant="solid"
          containerColor={item.color}
          shape="rounded"
          size="2xl"
        />
        <Typography variant="label-sm" tone="muted" className="normal-case">
          {item.label}
        </Typography>
      </Pressable>
    </AnimatedView>
  )
);

QuickActionItem.displayName = 'QuickActionItem';

export const QuickActionsSection = React.memo(() => {
  const { t } = useTranslation();
  const router = useRouter();

  const QUICK_ACTIONS = [
    {
      id: 'nearby',
      label: t('quickActions.nearby'),
      icon: 'location-outline' as const,
      color: 'primary' as const,
      route: '/nearby',
    },
    {
      id: 'favorites',
      label: t('quickActions.favorites'),
      icon: 'heart-outline' as const,
      color: 'danger' as const,
      route: '/favorites',
    },
    {
      id: 'lines',
      label: t('quickActions.lines'),
      icon: 'bus-outline' as const,
      color: 'secondary' as const,
      route: '/lines',
    },
    {
      id: 'map',
      label: t('quickActions.map'),
      icon: 'map-outline' as const,
      color: 'tertiary' as const,
      route: '/map',
    },
  ] as const;

  const onPressAction = React.useCallback(
    (route: string) => {
      router.push(route as never);
    },
    [router]
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: QuickActionConfig; index: number }) => (
      <QuickActionItem
        item={item}
        index={index}
        onPressAction={onPressAction}
      />
    ),
    [onPressAction]
  );

  const keyExtractor = React.useCallback(
    (item: QuickActionConfig) => item.id,
    []
  );

  return (
    <View className="pt-4 pb-6">
      <FlatList
        horizontal
        data={QUICK_ACTIONS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-5"
      />
    </View>
  );
});

QuickActionsSection.displayName = 'QuickActionsSection';
