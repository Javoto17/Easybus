import type { Meta, StoryObj } from '@storybook/react-native';

import { FavoriteItem } from './FavoriteItem';

const mockStop = {
  stop: '1234',
  name: 'Plaza Mayor',
  postalAddress: 'Calle Mayor, 1',
  customName: 'Mi parada',
  dataLine: [
    {
      line: '1',
      direction: 'Chamartín',
      headerB: 'Línea 1',
      label: 'Línea 1',
      startTime: '06:00',
      stopTime: '23:00',
      minFreq: '5',
      maxFreq: '10',
      dayType: 'LA',
    },
    {
      line: '2',
      direction: 'Argüelles',
      headerB: 'Línea 2',
      label: 'Línea 2',
      startTime: '06:00',
      stopTime: '23:00',
      minFreq: '5',
      maxFreq: '10',
      dayType: 'LA',
    },
    {
      line: '53',
      direction: 'Sol',
      headerB: 'Línea 53',
      label: 'Línea 53',
      startTime: '06:00',
      stopTime: '23:00',
      minFreq: '5',
      maxFreq: '10',
      dayType: 'LA',
    },
  ],
  pmv: '',
  geometry: { type: 'Point', coordinates: [0, 0] },
};

const meta: Meta<typeof FavoriteItem> = {
  component: FavoriteItem,
  args: {
    stop: mockStop,
    index: 0,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutCustomName: Story = {
  args: {
    stop: { ...mockStop, customName: undefined },
    index: 0,
  },
};

export const ManyLines: Story = {
  args: {
    stop: {
      ...mockStop,
      dataLine: [
        {
          line: '1',
          direction: 'A',
          headerB: 'Línea 1',
          label: 'Línea 1',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
        {
          line: '2',
          direction: 'B',
          headerB: 'Línea 2',
          label: 'Línea 2',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
        {
          line: '3',
          direction: 'C',
          headerB: 'Línea 3',
          label: 'Línea 3',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
        {
          line: '4',
          direction: 'D',
          headerB: 'Línea 4',
          label: 'Línea 4',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
        {
          line: '5',
          direction: 'E',
          headerB: 'Línea 5',
          label: 'Línea 5',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
        {
          line: '6',
          direction: 'F',
          headerB: 'Línea 6',
          label: 'Línea 6',
          startTime: '06:00',
          stopTime: '23:00',
          minFreq: '5',
          maxFreq: '10',
          dayType: 'LA',
        },
      ],
    },
    index: 0,
  },
};
