import type { Meta, StoryObj } from '@storybook/react-native';

import { StopErrorState } from './StopErrorState';

const meta: Meta<typeof StopErrorState> = {
  component: StopErrorState,
  args: {
    onRetry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
