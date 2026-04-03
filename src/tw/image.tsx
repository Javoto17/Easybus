import { Image as ExpoImage } from 'expo-image';
import Animated from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const AnimatedImage = Animated.createAnimatedComponent(ExpoImage);

export const Image = withUniwind(AnimatedImage);
