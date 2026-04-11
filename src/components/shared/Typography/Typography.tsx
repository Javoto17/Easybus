import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

import { type VariantProps, tv } from '@/styles/tv';

export enum TypographyVariant {
  DisplayLg = 'display-lg',
  HeadlineMd = 'headline-md',
  TitleSm = 'title-sm',
  BodyMd = 'body-md',
  LabelSm = 'label-sm',
}

export enum TypographyTone {
  Default = 'default',
  Muted = 'muted',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Inverse = 'inverse',
}

export enum TypographyFamily {
  Heading = 'heading',
  Body = 'body',
}

const typographyStyles = tv({
  base: 'text-on-surface',
  variants: {
    variant: {
      [TypographyVariant.DisplayLg]: 'text-display-lg',
      [TypographyVariant.HeadlineMd]: 'text-headline-md ',
      [TypographyVariant.TitleSm]: 'text-title-sm',
      [TypographyVariant.BodyMd]: 'text-body-md',
      [TypographyVariant.LabelSm]: 'text-label-sm',
    },
    tone: {
      [TypographyTone.Default]: 'text-on-surface',
      [TypographyTone.Muted]: 'text-on-surface-variant',
      [TypographyTone.Primary]: 'text-primary',
      [TypographyTone.Secondary]: 'text-secondary',
      [TypographyTone.Tertiary]: 'text-tertiary',
      [TypographyTone.Success]: 'text-success',
      [TypographyTone.Warning]: 'text-warning',
      [TypographyTone.Danger]: 'text-danger',
      [TypographyTone.Inverse]: 'text-white',
    },
    family: {
      [TypographyFamily.Heading]: 'font-display',
      [TypographyFamily.Body]: 'font-sans',
    },
  },
  defaultVariants: {
    variant: TypographyVariant.BodyMd,
    tone: TypographyTone.Default,
    family: TypographyFamily.Body,
  },
});

type TypographyVariants = VariantProps<typeof typographyStyles>;

export interface TypographyProps extends TextProps, TypographyVariants {
  className?: string;
}

export const Typography = ({
  variant,
  tone,
  family,
  className,
  ...props
}: TypographyProps) => {
  const classString = typographyStyles({
    variant,
    tone,
    className,
    family,
  });

  return <Text {...props} className={classString} />;
};

Typography.displayName = 'Typography';
