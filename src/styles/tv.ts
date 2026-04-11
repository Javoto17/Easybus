import { VariantProps, createTV } from 'tailwind-variants';

export const twMergeConfig = {
  extend: {
    classGroups: {
      color: [{ text: [] }],
      size: [
        {
          text: [
            'display-lg',
            'headline-md',
            'title-sm',
            'body-md',
            'label-sm',
          ],
        },
      ],
    },
  },
};

export type { VariantProps };

export const tv = createTV({
  twMergeConfig,
});
