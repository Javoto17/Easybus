import { View } from '@/tw';
import type { Meta, StoryObj } from '@storybook/react';

import HomeEmptyState from './HomeEmptyState';
import HomeLoadingState from './HomeLoadingState';

const meta = {
  title: 'screens/HomeScreen/components/HomeStates',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  render: () => {
    return <HomeLoadingState />;
  },
};

export const Empty: Story = {
  render: () => {
    return (
      <View className="flex-1">
        <HomeEmptyState onPressSearch={() => {}} />
      </View>
    );
  },
};
