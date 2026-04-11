import type { Meta, StoryObj } from '@storybook/react-native';

import { FavoritesEmptyState } from './FavoritesEmptyState';

const meta: Meta<typeof FavoritesEmptyState> = {
  component: FavoritesEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
