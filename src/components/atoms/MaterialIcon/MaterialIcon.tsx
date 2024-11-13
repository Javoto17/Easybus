import { cssInterop } from 'nativewind';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MaterialIcon = cssInterop(
  ({ style, ...props }: any) => (
    <MaterialCommunityIcons {...props} style={style} />
  ),
  {
    className: 'style',
  }
);

export default MaterialIcon;
