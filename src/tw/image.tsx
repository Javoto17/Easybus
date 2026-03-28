import { Image as RNImage } from 'react-native';
import Animated from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

export const Image = withUniwind(AnimatedImage);
