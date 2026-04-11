export const typography = {
  display: {
    lg: {
      className: 'text-display-lg',
      size: 56,
      weight: 'bold',
      lineHeight: 1,
      font: 'Manrope',
    },
  },
  headline: {
    md: {
      className: 'text-headline-md',
      size: 28,
      weight: 'semibold',
      lineHeight: 1.25,
      font: 'Manrope',
    },
  },
  title: {
    sm: {
      className: 'text-title-sm',
      size: 16,
      weight: 'medium',
      lineHeight: 1.375,
      font: 'Inter',
    },
  },
  body: {
    md: {
      className: 'text-body-md',
      size: 14,
      weight: 'regular',
      lineHeight: 1.625,
      font: 'Inter',
    },
  },
  label: {
    sm: {
      className: 'text-label-sm',
      size: 11,
      weight: 'bold',
      lineHeight: 1,
      letterSpacing: 'wider',
      transform: 'uppercase',
      font: 'Inter',
    },
  },
} as const;

export type TypographyVariant =
  | 'display-lg'
  | 'headline-md'
  | 'title-sm'
  | 'body-md'
  | 'label-sm';

export type TypographyClass =
  | typeof typography.display.lg.className
  | typeof typography.headline.md.className
  | typeof typography.title.sm.className
  | typeof typography.body.md.className
  | typeof typography.label.sm.className;

const typographyClasses: Record<TypographyVariant, TypographyClass> = {
  'display-lg': typography.display.lg.className,
  'headline-md': typography.headline.md.className,
  'title-sm': typography.title.sm.className,
  'body-md': typography.body.md.className,
  'label-sm': typography.label.sm.className,
};

export function getTypographyClass(
  variant: TypographyVariant
): TypographyClass {
  return typographyClasses[variant];
}
