import type { Meta, StoryObj } from '@storybook/react-native';

import type { LineStop } from '@/modules/stops/domain/LineDetail';

import { LineStopItem } from './LineStopItem';

const mockStop: LineStop = {
  stop: '1234',
  name: 'Plaza Mayor',
  postalAddress: 'Calle Mayor, 1',
};

const meta: Meta<typeof LineStopItem> = {
  component: LineStopItem,
  args: {
    stop: mockStop,
    onPress: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutAddress: Story = {
  args: {
    stop: { stop: '5678', name: 'Sol', postalAddress: '' },
  },
};

export const LongName: Story = {
  args: {
    stop: {
      stop: '9012',
      name: 'Plaza de la Constitución',
      postalAddress: 'Avenida de la Constitución, 42',
    },
  },
};
