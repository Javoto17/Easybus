import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import { cssInterop } from 'nativewind';

const AntDesignIcon = cssInterop(
  ({ style, ...props }: any) => (
    <AntDesign {...props} name="left" size={24} style={style} />
  ),
  {
    className: 'style',
  }
);

interface BackButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <AntDesignIcon name="left" className="text-primary" />
    </TouchableOpacity>
  );
};

export default BackButton;
