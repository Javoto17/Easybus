import React from 'react';
import { Image as RNImage } from 'react-native';
import Animated from 'react-native-reanimated';
import { useCssElement } from 'react-native-css';

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);
type RNImageProps = React.ComponentProps<typeof RNImage>;

type ImageProps = RNImageProps & {
  className?: string;
};

function CSSImage(props: RNImageProps) {
  return <AnimatedExpoImage {...props} />;
}

export const Image = (props: ImageProps) => {
  return useCssElement(CSSImage, props, { className: 'style' });
};
