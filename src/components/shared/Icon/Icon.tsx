import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { tv } from 'tailwind-variants';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

// Icon sizes based on HeroUI scale
const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 40,
} as const;

// TV for icon color
const iconColorVariants = tv({
  base: '',
  variants: {
    color: {
      default: 'text-on-surface',
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      muted: 'text-on-surface-variant',
      inverse: 'text-white',
      'on-primary': 'text-on-primary',
      'on-secondary': 'text-on-secondary',
      'on-tertiary': 'text-on-tertiary',
      'on-success': 'text-on-success',
      'on-warning': 'text-on-warning',
      'on-danger': 'text-on-danger',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// Type definitions
export type IconName = keyof typeof Ionicons.glyphMap;
export type IconColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'muted'
  | 'inverse'
  | 'on-primary'
  | 'on-secondary'
  | 'on-tertiary'
  | 'on-success'
  | 'on-warning'
  | 'on-danger';

export interface IconProps {
  name: IconName;
  size?: keyof typeof iconSizes;
  color?: IconColor;
  className?: string;
}

/**
 * Icon component - renders just the icon, no container
 *
 * @example
 * // Basic icon
 * <Icon name="location-outline" />
 *
 * // With size and color
 * <Icon name="heart" color="primary" size="lg" />
 *
 * // Used in a custom container
 * <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
 *   <Icon name="bus" color="on-primary" size="lg" />
 * </View>
 */
export const Icon = React.memo(
  ({ name, size = 'md', color = 'default', className }: IconProps) => {
    const iconSize = iconSizes[size];

    return (
      <StyledIonicons
        name={name}
        size={iconSize}
        className={iconColorVariants({ color, className })}
      />
    );
  }
);

Icon.displayName = 'Icon';

// Re-export for easy access
export { Ionicons };
