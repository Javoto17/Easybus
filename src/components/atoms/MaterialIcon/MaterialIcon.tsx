import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCssElement } from 'react-native-css';

const MaterialIcon = (
  props: React.ComponentProps<typeof MaterialCommunityIcons> & {
    className?: string;
  }
) => {
  return useCssElement(MaterialCommunityIcons, props, {
    className: 'style',
  });
};

export default MaterialIcon;
