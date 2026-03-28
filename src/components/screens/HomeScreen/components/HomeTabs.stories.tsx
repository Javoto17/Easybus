import type { Meta, StoryObj } from '@storybook/react';

import HomeTabs, { HomeTabValue } from './HomeTabs';

const meta = {
  title: 'screens/HomeScreen/components/HomeTabs',
  component: HomeTabs,
} satisfies Meta<typeof HomeTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 'stops' as HomeTabValue,
    onValueChange: () => {},
  },
};
