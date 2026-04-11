import type { Meta, StoryObj } from '@storybook/react-native';

import type { Stop } from '@/modules/stops/domain/Stop';

import { StopHeader } from './StopHeader';

const mockStop: Stop = {
  stop: '1234',
  name: 'Plaza Mayor',
  postalAddress: 'Calle Mayor, 1, Madrid',
  pmv: 'PMV001',
  geometry: { type: 'Point', coordinates: [-3.7038, 40.4168] },
  dataLine: [
    {
      line: '27',
      headerB: 'Línea 27',
      direction: 'A',
      label: 'Línea 27',
      startTime: '06:00',
      stopTime: '23:30',
      minFreq: '5',
      maxFreq: '10',
      dayType: 'LA',
    },
    {
      line: '33',
      headerB: 'Línea 33',
      direction: 'B',
      label: 'Línea 33',
      startTime: '06:00',
      stopTime: '23:00',
      minFreq: '8',
      maxFreq: '12',
      dayType: 'LA',
    },
  ],
};

const meta: Meta<typeof StopHeader> = {
  component: StopHeader,
  args: {
    stop: mockStop,
    isLoading: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Loading: Story = {
  args: {
    stop: null,
    isLoading: true,
  },
};

export const WithCustomName: Story = {
  args: {
    stop: { ...mockStop, customName: 'Mi parada' },
  },
};

export const WithoutPmv: Story = {
  args: {
    stop: { ...mockStop, pmv: '' },
  },
};
