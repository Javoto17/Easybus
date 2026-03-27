import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { tv } from '@/styles/tv';
import { TouchableOpacity } from '@/tw';

import AntIcon from '@/components/atoms/AntIcon/AntIcon';

interface IconButtonProps extends TouchableOpacityProps {
  className?: string;
  name: React.ComponentProps<typeof AntIcon>['name'];
  size: number;
  variant?: 'primary';
}

const iconTouchableTv = tv({
  variants: {
    variant: {
      primary: 'flex flex-row items-center justify-center px-2 py-2',
    },
  },
});

const iconButtonTv = tv({
  variants: {},
});

const IconButton = ({
  className,
  name,
  onPress,
  size,
  variant,
  ...props
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={iconTouchableTv({ variant })}
    >
      <AntIcon
        className={iconButtonTv({
          class: className,
        })}
        size={size}
        name={name}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
