import { Text, View } from '@/tw';
import { Button } from 'heroui-native';
import React from 'react';

import StyledIonicons from '@/components/atoms/StyledIonicons/StyledIonicons';

interface HomeHeaderProps {
  onPressMenu?: () => void;
  onPressNotifications?: () => void;
  onPressSettings?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onPressMenu,
  onPressNotifications,
  onPressSettings,
}) => {
  return (
    <View className="px-margin pt-safe-top pb-3">
      <View className="flex-row items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          className="rounded-full"
          onPress={onPressMenu}
        >
          <StyledIonicons
            name="menu-outline"
            size={22}
            className="text-foreground"
          />
        </Button>

        <View className="border-border bg-surface/80 rounded-2xl border px-4 py-2">
          <Text className="font-poppins text-h500 text-foreground font-semibold">
            EasyBus
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            className="rounded-full"
            onPress={onPressNotifications}
          >
            <StyledIonicons
              name="notifications-outline"
              size={20}
              className="text-muted"
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            className="rounded-full"
            onPress={onPressSettings}
          >
            <StyledIonicons
              name="settings-outline"
              size={20}
              className="text-muted"
            />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
