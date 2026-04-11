import { useMemo } from 'react';

import {
  type TypographyVariant,
  getTypographyClass,
  typography,
} from '@/styles/typography';

interface TypographyStyle {
  className: string;
  style?: {
    fontFamily?: string;
    textTransform?: 'uppercase';
  };
}

export function useTypography(variant: TypographyVariant): TypographyStyle {
  return useMemo(() => {
    switch (variant) {
      case 'display-lg':
        return {
          className: getTypographyClass('display-lg'),
          style: {
            fontFamily: typography.display.lg.font,
          },
        };
      case 'headline-md':
        return {
          className: getTypographyClass('headline-md'),
          style: {
            fontFamily: typography.headline.md.font,
          },
        };
      case 'title-sm':
        return {
          className: getTypographyClass('title-sm'),
          style: {
            fontFamily: typography.title.sm.font,
          },
        };
      case 'label-sm':
        return {
          className: getTypographyClass('label-sm'),
          style: {
            fontFamily: typography.label.sm.font,
            textTransform: 'uppercase',
          },
        };
      case 'body-md':
      default:
        return {
          className: getTypographyClass('body-md'),
          style: {
            fontFamily: typography.body.md.font,
          },
        };
    }
  }, [variant]);
}
