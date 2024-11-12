import React, { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { tv } from '@/styles/tv';

import AntIcon from '@/components/atoms/AntIcon/AntIcon';

interface IconButtonProps extends TouchableOpacityProps {
  className?: string;
  name: string;
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

const IconButton = forwardRef<TouchableOpacity, IconButtonProps>(
  ({ className, name, onPress, size, variant, ...props }, ref) => {
    return (
      <TouchableOpacity
        {...props}
        onPress={onPress}
        className={iconTouchableTv({ variant })}
        ref={ref}
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
  }
);

export default IconButton;
