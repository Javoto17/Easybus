import { View, Text } from 'react-native';
import React from 'react';

import { tv } from '@/styles/tv';

interface AvatarLineProps {
  children: string;
  size: 'small' | 'big';
}

const avatarWrapperTv = tv({
  base: 'flex items-center justify-center rounded-full bg-active',
  variants: {
    size: {
      small: 'h-10 w-10',
      big: 'h-12 w-12',
    },
  },
});

const avatarTextTv = tv({
  base: 'font-bold uppercase text-primary',
  variants: {
    size: {
      small: 'text-body-small',
      big: 'text-body-large',
    },
  },
});

const AvatarLine: React.FC<AvatarLineProps> = ({
  children,
  size = 'small',
}) => {
  return (
    <View
      className={avatarWrapperTv({
        size,
      })}
    >
      <Text
        className={avatarTextTv({
          size,
        })}
      >
        {children}
      </Text>
    </View>
  );
};

export default AvatarLine;
