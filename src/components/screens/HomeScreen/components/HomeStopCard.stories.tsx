import type { Meta, StoryObj } from '@storybook/react';

import HomeStopCard from './HomeStopCard';

const createLine = (line: string) => ({
  headerB: line,
  direction: 'B',
  label: line,
  startTime: '06:00',
  stopTime: '23:59',
  minFreq: '5',
  maxFreq: '12',
  dayType: 'LA',
  line,
});

const meta = {
  title: 'screens/HomeScreen/components/HomeStopCard',
  component: HomeStopCard,
} satisfies Meta<typeof HomeStopCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    stop: {
      pmv: '4618',
      name: 'Avenida de América',
      geometry: { type: 'Point', coordinates: [-3.67, 40.42] },
      stop: '4618',
      dataLine: [createLine('27'), createLine('52'), createLine('N4')],
      arrives: [
        {
          line: '27',
          stop: '4618',
          isHead: '0',
          destination: 'Embajadores',
          deviation: 0,
          bus: 123,
          geometry: { type: 'Point', coordinates: [-3.67, 40.42] },
          estimateArrive: 220,
          DistanceBus: 900,
          positionTypeBus: 'A',
        },
      ],
      postalAddress: 'Calle de Alcalá, 12',
      isFavorite: true,
    },
    onPress: () => {},
    onPressFavorite: () => {},
  },
};
