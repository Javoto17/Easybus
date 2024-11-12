import type { Meta, StoryObj } from '@storybook/react';
import { default as AvatarLine } from './AvatarLine';

const meta = {
  title: 'atoms/AvatarLine',
  component: AvatarLine,
  parameters: {
    notes: 'Use this example to test the software keyboard related issues.',
  },
} satisfies Meta<typeof AvatarLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '143',
  },
};
