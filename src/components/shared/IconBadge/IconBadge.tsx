import React from 'react';
import { View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Icon, type IconColor, type IconName, type IconProps } from '../Icon';

// Container sizes
const containerSizes = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
} as const;

// Icon sizes for containers
const containerIconSizes = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 20,
  xl: 22,
  '2xl': 26,
} as const;

// TV for container variants
const containerVariants = tv({
  base: 'items-center justify-center',
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: 'border',
      ghost: '',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
      rounded: 'rounded-xl',
      none: '',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      tertiary: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Solid variants
    { variant: 'solid', color: 'default', class: 'bg-surface-container-high' },
    { variant: 'solid', color: 'primary', class: 'bg-primary' },
    { variant: 'solid', color: 'secondary', class: 'bg-secondary' },
    { variant: 'solid', color: 'tertiary', class: 'bg-tertiary' },
    { variant: 'solid', color: 'success', class: 'bg-success' },
    { variant: 'solid', color: 'warning', class: 'bg-warning' },
    { variant: 'solid', color: 'danger', class: 'bg-danger' },
    // Soft variants
    { variant: 'soft', color: 'default', class: 'bg-surface-container' },
    { variant: 'soft', color: 'primary', class: 'bg-primary-container' },
    { variant: 'soft', color: 'secondary', class: 'bg-secondary-container' },
    { variant: 'soft', color: 'tertiary', class: 'bg-tertiary-container' },
    { variant: 'soft', color: 'success', class: 'bg-success-container' },
    { variant: 'soft', color: 'warning', class: 'bg-warning-container' },
    { variant: 'soft', color: 'danger', class: 'bg-danger-container' },
    // Outline variants
    {
      variant: 'outline',
      color: 'default',
      class: 'border-outline bg-transparent',
    },
    {
      variant: 'outline',
      color: 'primary',
      class: 'border-primary bg-transparent',
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: 'border-secondary bg-transparent',
    },
    {
      variant: 'outline',
      color: 'tertiary',
      class: 'border-tertiary bg-transparent',
    },
    // Ghost variants
    { variant: 'ghost', color: 'default', class: 'bg-transparent' },
    { variant: 'ghost', color: 'primary', class: 'bg-transparent' },
    { variant: 'ghost', color: 'secondary', class: 'bg-transparent' },
  ],
  defaultVariants: {
    variant: 'soft',
    shape: 'circle',
    color: 'default',
  },
});

// Type definitions
type ContainerColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger';

export interface IconBadgeProps extends Omit<IconProps, 'size' | 'color'> {
  size?: keyof typeof containerSizes;
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
  shape?: 'circle' | 'square' | 'rounded' | 'none';
  color?: ContainerColor;
  containerColor?: ContainerColor;
  containerClassName?: string;
}

/**
 * IconBadge component - wraps an Icon with a styled container
 *
 * @example
 * // Solid circle icon
 * <IconBadge name="location" variant="solid" color="primary" />
 *
 * // Soft square icon
 * <IconBadge name="bus" variant="soft" shape="square" color="secondary" size="lg" />
 *
 * // Outline rounded
 * <IconBadge name="heart" variant="outline" shape="rounded" color="tertiary" />
 */
export const IconBadge = React.memo(
  ({
    name,
    size = 'md',
    variant = 'soft',
    shape = 'circle',
    color = 'default',
    containerColor,
    className,
    containerClassName,
    ...iconProps
  }: IconBadgeProps) => {
    // Determine icon color based on variant and container color
    const getIconColor = (): IconColor => {
      const effectiveColor = containerColor || color;

      if (variant === 'solid') {
        switch (effectiveColor) {
          case 'primary':
            return 'on-primary';
          case 'secondary':
            return 'on-secondary';
          case 'tertiary':
            return 'on-tertiary';
          case 'success':
            return 'on-success';
          case 'warning':
            return 'on-warning';
          case 'danger':
            return 'on-danger';
          default:
            return 'default';
        }
      }
      return effectiveColor as IconColor;
    };

    const containerSizeClass = containerSizes[size];
    const iconSize = containerIconSizes[size];

    return (
      <View
        className={containerVariants({
          variant,
          shape,
          color: containerColor || color,
          className: `${containerSizeClass} ${containerClassName || ''}`,
        })}
      >
        <Icon
          name={name}
          color={getIconColor()}
          {...iconProps}
          size={size}
          className={className}
        />
      </View>
    );
  }
);

IconBadge.displayName = 'IconBadge';
