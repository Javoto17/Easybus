import type { Meta, StoryObj } from '@storybook/react';
import { default as StopItem } from './StopItem';

const meta = {
  title: 'molecules/StopItem',
  component: StopItem,
  parameters: {
    notes: 'Use this example to test the software keyboard related issues.',
  },
} satisfies Meta<typeof StopItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Type something',
    label: 'label',
    onChange: () => {},
    type: 'text',
  },
};

export const Search: Story = {
  args: {
    placeholder: 'Type something',
    label: 'label',
    onChange: () => {},
    type: 'search',
  },
};
