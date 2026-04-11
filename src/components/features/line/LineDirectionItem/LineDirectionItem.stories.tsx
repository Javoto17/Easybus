import type { Meta, StoryObj } from '@storybook/react-native';

import type { LineDirection } from '@/modules/stops/domain/LineDetail';

import { LineDirectionItem } from './LineDirectionItem';

const mockDirection: LineDirection = {
  code: 'A1',
  name: 'Plaza de España',
};

const meta: Meta<typeof LineDirectionItem> = {
  component: LineDirectionItem,
  args: {
    direction: mockDirection,
    onPress: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ShortName: Story = {
  args: {
    direction: { code: 'B2', name: 'Sol' },
  },
};

export const LongName: Story = {
  args: {
    direction: { code: 'C3', name: 'Plaza de la Cebada' },
  },
};
