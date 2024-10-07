import { View, Text } from 'react-native';
import React from 'react';

interface AvatarLineProps {
  children: string;
}

const AvatarLine: React.FC<AvatarLineProps> = ({ children }) => {
  return (
    <View className="flex h-12 w-12 items-center justify-center rounded-full bg-active">
      <Text className="text-primary text-body-large font-bold uppercase">
        {children}
      </Text>
    </View>
  );
};

export default AvatarLine;
