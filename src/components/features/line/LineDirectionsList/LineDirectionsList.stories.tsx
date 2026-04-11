import type { Meta, StoryObj } from '@storybook/react-native';

import type { LineDirection } from '@/modules/stops/domain/LineDetail';

import { LineDirectionsList } from './LineDirectionsList';

const mockDirections: LineDirection[] = [
  { code: 'A1', name: 'Plaza de España' },
  { code: 'A2', name: 'Callao' },
];

const meta: Meta<typeof LineDirectionsList> = {
  component: LineDirectionsList,
  args: {
    directions: mockDirections,
    onPressDirection: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManyDirections: Story = {
  args: {
    directions: [
      { code: 'A1', name: 'Plaza de España' },
      { code: 'A2', name: 'Callao' },
      { code: 'A3', name: 'Gran Vía' },
      { code: 'A4', name: 'Sol' },
    ],
  },
};
