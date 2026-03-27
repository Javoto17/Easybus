import React from 'react';
import { Text, TouchableOpacity, View } from '@/tw';

import AvatarLine from '@/components/atoms/AvatarLine/AvatarLine';
import { tv } from '@/styles/tv';

import IconButton from '../IconButton/IconButton';
import AntIcon from '@/components/atoms/AntIcon/AntIcon';

const favoriteButton = tv({
  base: 'text-primary',
  variants: {
    active: {
      true: 'text-yellow-400',
    },
  },
});

interface StopItemProps {
  name: string;
  isFavorite?: boolean;
  code: string;
  lines?: string[];
  onPressFavorite?: () => void;
  onPress?: () => void;
}

const StopItem: React.FC<StopItemProps> = ({
  name,
  code,
  onPressFavorite,
  onPress,
  lines,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex gap-y-1 rounded-lg bg-secondary px-4 py-4 shadow-md">
        <View className="flex flex-row items-center">
          <View className="flex flex-1 flex-col justify-start">
            <Text className="font-poppins text-h400 text-primary">{name}</Text>
          </View>
          <View className="basis-auto items-start justify-center">
            <IconButton
              variant="primary"
              name="star"
              size={24}
              className={'text-yellow-400'}
              onPress={onPressFavorite}
            />
          </View>
        </View>

        <View className="flex flex-row justify-between">
          <View className="flex basis-auto flex-row items-center gap-x-1">
            <AntIcon name="enviromento" size={18} className="text-secondary" />
            <Text className="font-poppins text-body-large text-secondary">
              Código: {code}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-end justify-between gap-x-4 px-1 py-2">
          <View className="flex basis-10/12 flex-row flex-wrap items-center gap-2">
            <Text className="font-poppins text-body-large text-secondary">
              Lineas:
            </Text>
            {lines &&
              lines?.length > 0 &&
              lines?.map((line) => {
                return (
                  <AvatarLine size="small" key={line}>
                    {line}
                  </AvatarLine>
                );
              })}
          </View>
          <View className="flex basis-2/12 items-center justify-end">
            <IconButton
              variant="primary"
              name="arrowright"
              size={28}
              className="text-primary"
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StopItem;
