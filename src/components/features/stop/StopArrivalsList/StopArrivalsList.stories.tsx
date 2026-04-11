import type { Meta, StoryObj } from '@storybook/react-native';

import type { StopArrival } from '@/modules/stops/domain/StopArrival';

import { StopArrivalsList } from './StopArrivalsList';

const mockArrivals: StopArrival[] = [
  {
    line: '27',
    stop: '1234',
    isHead: '1',
    destination: 'Plaza de España',
    deviation: 0,
    bus: 1234,
    geometry: { type: 'Point', coordinates: [0, 0] },
    estimateArrive: 180,
    DistanceBus: 500,
    positionTypeBus: 'GPS',
  },
  {
    line: '33',
    stop: '1234',
    isHead: '1',
    destination: 'Moncloa',
    deviation: 60,
    bus: 2345,
    geometry: { type: 'Point', coordinates: [0, 0] },
    estimateArrive: 360,
    DistanceBus: 1000,
    positionTypeBus: 'GPS',
  },
  {
    line: '27',
    stop: '1234',
    isHead: '1',
    destination: 'Plaza de España',
    deviation: 0,
    bus: 3456,
    geometry: { type: 'Point', coordinates: [0, 0] },
    estimateArrive: 720,
    DistanceBus: 2000,
    positionTypeBus: 'GPS',
  },
];

const meta: Meta<typeof StopArrivalsList> = {
  component: StopArrivalsList,
  args: {
    arrivals: mockArrivals,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManyArrivals: Story = {
  args: {
    arrivals: [
      ...mockArrivals,
      {
        line: '46',
        stop: '1234',
        isHead: '1',
        destination: 'Plaza Elíptica',
        deviation: 300,
        bus: 4567,
        geometry: { type: 'Point', coordinates: [0, 0] },
        estimateArrive: 900,
        DistanceBus: 3000,
        positionTypeBus: 'GPS',
      },
      {
        line: '33',
        stop: '1234',
        isHead: '1',
        destination: 'Moncloa',
        deviation: 0,
        bus: 5678,
        geometry: { type: 'Point', coordinates: [0, 0] },
        estimateArrive: 1200,
        DistanceBus: 4000,
        positionTypeBus: 'GPS',
      },
    ],
  },
};
