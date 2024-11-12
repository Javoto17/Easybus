import { createTV, VariantProps } from 'tailwind-variants';

export const twMergeConfig = {
  extend: {
    classGroups: {
      color: [{ text: ['primary'] }],
    },
  },
};

export type { VariantProps };

export const tv = createTV({
  twMergeConfig,
});
