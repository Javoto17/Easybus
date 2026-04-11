import type { Meta, StoryObj } from '@storybook/react-native';

import type { LineDetail } from '@/modules/stops/domain/LineDetail';

import { LineHeader } from './LineHeader';

const mockLine: LineDetail = {
  line: '27',
  label: 'Línea 27',
  startTime: '06:00',
  stopTime: '23:30',
  minFreq: '5',
  maxFreq: '10',
  directions: [],
};

const meta: Meta<typeof LineHeader> = {
  component: LineHeader,
  args: {
    line: mockLine,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Loading: Story = {
  args: {
    line: null,
    isLoading: true,
  },
};

export const LongServiceHours: Story = {
  args: {
    line: {
      ...mockLine,
      startTime: '05:00',
      stopTime: '00:00',
    },
  },
};
