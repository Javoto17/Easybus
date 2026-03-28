import type { Meta, StoryObj } from '@storybook/react';

import HomeHeader from './HomeHeader';

const meta = {
  title: 'screens/HomeScreen/components/HomeHeader',
  component: HomeHeader,
} satisfies Meta<typeof HomeHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
