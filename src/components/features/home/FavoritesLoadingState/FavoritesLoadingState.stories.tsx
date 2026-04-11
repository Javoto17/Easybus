import type { Meta, StoryObj } from '@storybook/react-native';

import { FavoritesLoadingState } from './FavoritesLoadingState';

const meta: Meta<typeof FavoritesLoadingState> = {
  component: FavoritesLoadingState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
