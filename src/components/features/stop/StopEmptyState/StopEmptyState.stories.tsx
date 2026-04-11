import type { Meta, StoryObj } from '@storybook/react-native';

import { StopEmptyState } from './StopEmptyState';

const meta: Meta<typeof StopEmptyState> = {
  component: StopEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
