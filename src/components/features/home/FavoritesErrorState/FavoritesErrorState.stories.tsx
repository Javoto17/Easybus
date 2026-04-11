import type { Meta, StoryObj } from '@storybook/react-native';

import { FavoritesErrorState } from './FavoritesErrorState';

const meta: Meta<typeof FavoritesErrorState> = {
  component: FavoritesErrorState,
  args: {
    onRetry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
