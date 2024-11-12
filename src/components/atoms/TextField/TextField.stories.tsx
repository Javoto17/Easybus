import type { Meta, StoryObj } from '@storybook/react';
import { default as TextField } from './TextField';

const meta = {
  title: 'atoms/TextField',
  component: TextField,
  parameters: {
    notes: 'Use this example to test the software keyboard related issues.',
  },
} satisfies Meta<typeof TextField>;

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
