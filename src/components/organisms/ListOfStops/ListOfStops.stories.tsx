import type { Meta, StoryObj } from '@storybook/react';
import { default as ListOfStops } from './ListOfStops';

const meta = {
  title: 'ListOfStops',
  component: ListOfStops,
  parameters: {
    notes: 'Use this example to test the software keyboard related issues.',
  },
} satisfies Meta<typeof ListOfStops>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: [],
  },
};
