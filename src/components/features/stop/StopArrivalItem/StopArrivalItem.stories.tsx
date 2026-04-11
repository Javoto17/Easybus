import type { Meta, StoryObj } from '@storybook/react-native';

import type { StopArrival } from '@/modules/stops/domain/StopArrival';

import { StopArrivalItem } from './StopArrivalItem';

const mockArrival: StopArrival = {
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
};

const meta: Meta<typeof StopArrivalItem> = {
  component: StopArrivalItem,
  args: {
    arrival: mockArrival,
    index: 0,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Arriving: Story = {
  args: {
    arrival: { ...mockArrival, estimateArrive: 30 },
    index: 0,
  },
};

export const Delayed: Story = {
  args: {
    arrival: { ...mockArrival, deviation: 420, estimateArrive: 600 },
    index: 0,
  },
};

export const SlightlyDelayed: Story = {
  args: {
    arrival: { ...mockArrival, deviation: 120, estimateArrive: 300 },
    index: 0,
  },
};

export const SecondInList: Story = {
  args: {
    arrival: { ...mockArrival, line: '33' },
    index: 1,
  },
};
