import type { Meta, StoryObj } from '@storybook/react';

import HomeSearchBar from './HomeSearchBar';

const meta = {
  title: 'screens/HomeScreen/components/HomeSearchBar',
  component: HomeSearchBar,
} satisfies Meta<typeof HomeSearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: '4618',
    onChange: () => {},
    onSubmit: () => {},
  },
};
