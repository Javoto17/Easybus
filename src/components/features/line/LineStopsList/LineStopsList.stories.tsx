import type { Meta, StoryObj } from '@storybook/react-native';

import type { LineStop } from '@/modules/stops/domain/LineDetail';

import { LineStopsList } from './LineStopsList';

const mockStops: LineStop[] = [
  { stop: '1234', name: 'Plaza Mayor', postalAddress: 'Calle Mayor, 1' },
  { stop: '1235', name: 'Callao', postalAddress: 'Plaza del Callao' },
  { stop: '1236', name: 'Gran Vía', postalAddress: 'Gran Vía, 32' },
];

const meta: Meta<typeof LineStopsList> = {
  component: LineStopsList,
  args: {
    stops: mockStops,
    onPressStop: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManyStops: Story = {
  args: {
    stops: [
      { stop: '1234', name: 'Plaza Mayor', postalAddress: 'Calle Mayor, 1' },
      { stop: '1235', name: 'Callao', postalAddress: 'Plaza del Callao' },
      { stop: '1236', name: 'Gran Vía', postalAddress: 'Gran Vía, 32' },
      { stop: '1237', name: 'Sol', postalAddress: 'Plaza del Sol' },
      { stop: '1238', name: 'Sevilla', postalAddress: 'Calle Sevilla' },
      {
        stop: '1239',
        name: 'Banco de España',
        postalAddress: 'Paseo del Prado',
      },
      {
        stop: '1240',
        name: 'Atocha',
        postalAddress: 'Plaza del Emperador Carlos V',
      },
    ],
  },
};
