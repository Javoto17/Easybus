import type { Meta, StoryObj } from '@storybook/react-native';

import type { Dataline } from '@/modules/stops/domain/StopDataLine';

import { StopLinesList } from './StopLinesList';

const mockLines: Dataline[] = [
  {
    line: '27',
    headerB: 'Plaza de España',
    direction: 'B',
    label: 'Línea 27',
    startTime: '06:00',
    stopTime: '23:30',
    minFreq: '5',
    maxFreq: '10',
    dayType: 'LA',
  },
  {
    line: '33',
    headerB: 'Moncloa',
    direction: 'A',
    label: 'Línea 33',
    startTime: '06:00',
    stopTime: '23:00',
    minFreq: '8',
    maxFreq: '12',
    dayType: 'LA',
  },
];

const meta: Meta<typeof StopLinesList> = {
  component: StopLinesList,
  args: {
    lines: mockLines,
    onPressLine: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManyLines: Story = {
  args: {
    lines: [
      ...mockLines,
      {
        line: '46',
        headerB: 'Plaza Elíptica',
        direction: 'B',
        label: 'Línea 46',
        startTime: '06:00',
        stopTime: '22:30',
        minFreq: '10',
        maxFreq: '15',
        dayType: 'LA',
      },
      {
        line: '65',
        headerB: 'Los Angeles',
        direction: 'A',
        label: 'Línea 65',
        startTime: '06:30',
        stopTime: '22:00',
        minFreq: '12',
        maxFreq: '18',
        dayType: 'LA',
      },
      {
        line: '3',
        headerB: 'Fuencarral',
        direction: 'B',
        label: 'Línea 3',
        startTime: '06:00',
        stopTime: '23:30',
        minFreq: '4',
        maxFreq: '8',
        dayType: 'LA',
      },
    ],
  },
};
