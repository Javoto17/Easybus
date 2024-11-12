import type { Meta, StoryObj } from '@storybook/react';
import { default as StopDetail } from './StopDetail';

const meta = {
  title: 'screens/StopDetail',
  component: StopDetail,
  parameters: {
    notes: 'Use this example to test the software keyboard related issues.',
  },
} satisfies Meta<typeof StopDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
