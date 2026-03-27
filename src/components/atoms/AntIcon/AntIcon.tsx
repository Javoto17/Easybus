import AntDesign from '@expo/vector-icons/AntDesign';
import { useCssElement } from 'react-native-css';

const AntIcon = (
  props: React.ComponentProps<typeof AntDesign> & { className?: string }
) => {
  return useCssElement(AntDesign, props, {
    className: 'style',
  });
};

export default AntIcon;
