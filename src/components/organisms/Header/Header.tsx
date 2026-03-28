import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from '@/tw';
import { useCSSVariable } from 'uniwind';

import IconButton from '@/components/molecules/IconButton/IconButton';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface HeaderProps extends NativeStackHeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const { options, navigation } = props ?? {};
  const { headerRight, title } = options ?? {};

  const insets = useSafeAreaInsets();
  const safeTopValue = useCSSVariable('--safe-top') ?? insets.top;

  return (
    <View
      className="bg-primary"
      style={{ paddingTop: safeTopValue }}
    >
      <View className="mx-4 my-1 flex h-16 flex-row gap-x-1">
        <View className="basis-2/12 items-start justify-center">
          <IconButton
            variant="primary"
            onPress={() => navigation.goBack()}
            name="left"
            className="text-primary"
            size={20}
          />
        </View>
        <View className="flex basis-7/12 flex-col items-center justify-center">
          <Text className="text-center text-body-large font-semibold text-primary">
            {title}
          </Text>
        </View>
        <View className="flex basis-3/12 items-end justify-center">
          {headerRight &&
            headerRight({
              canGoBack: navigation?.canGoBack(),
            })}
        </View>
      </View>
    </View>
  );
};

export default Header;
