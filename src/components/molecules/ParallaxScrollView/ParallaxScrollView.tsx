import { PropsWithChildren, ReactElement } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  headerContent: ReactElement;
  height?: number;
}>;

export default function ParallaxScrollView({
  children,
  headerContent,
  height = 250,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Animated.View
        className="overflow-hidden bg-white"
        style={[
          headerAnimatedStyle,
          {
            height,
          },
        ]}
      >
        {headerContent}
      </Animated.View>
      <View className="-mt-24 flex-1 gap-4 overflow-hidden py-8">
        {children}
      </View>
    </Animated.ScrollView>
  );
}
