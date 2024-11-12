import { cssInterop } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';

const AntIcon = cssInterop(
  ({ style, ...props }: any) => <AntDesign {...props} style={style} />,
  {
    className: 'style',
  }
);

export default AntIcon;
