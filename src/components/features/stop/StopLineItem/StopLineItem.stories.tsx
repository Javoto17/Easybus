import type { Meta, StoryObj } from '@storybook/react-native';

import type { Dataline } from '@/modules/stops/domain/StopDataLine';

import { StopLineItem } from './StopLineItem';

const mockLine: Dataline = {
  line: '27',
  headerB: 'Plaza de España',
  direction: 'B',
  label: 'Línea 27',
  startTime: '06:00',
  stopTime: '23:30',
  minFreq: '5',
  maxFreq: '10',
  dayType: 'LA',
};

const meta: Meta<typeof StopLineItem> = {
  component: StopLineItem,
  args: {
    line: mockLine,
    onPress: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutHeaderB: Story = {
  args: {
    line: { ...mockLine, headerB: '', label: 'Línea 27' },
  },
};

export const ShortLine: Story = {
  args: {
    line: { ...mockLine, line: '1', label: 'Línea 1' },
  },
};

export const ThreeDigitLine: Story = {
  args: {
    line: { ...mockLine, line: '133', headerB: 'Línea 133' },
  },
};
