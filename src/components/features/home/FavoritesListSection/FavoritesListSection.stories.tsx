import type { Meta, StoryObj } from '@storybook/react-native';

import { FavoritesListSection } from './FavoritesListSection';

const mockFavorites = [
  {
    stop: '1234',
    name: 'Plaza Mayor',
    postalAddress: 'Calle Mayor, 1',
    customName: 'Mi parada',
    dataLine: [
      {
        line: '1',
        direction: 'Chamartín',
        headerB: 'Línea 1',
        label: 'Línea 1 - Chamartín',
        startTime: '06:00',
        stopTime: '23:00',
        minFreq: '5',
        maxFreq: '10',
        dayType: 'LA',
      },
    ],
    pmv: '',
    geometry: { type: 'Point', coordinates: [0, 0] },
  },
  {
    stop: '5678',
    name: 'Sol',
    postalAddress: 'Puerta del Sol',
    dataLine: [
      {
        line: '2',
        direction: 'Argüelles',
        headerB: 'Línea 2',
        label: 'Línea 2 - Argüelles',
        startTime: '06:00',
        stopTime: '23:00',
        minFreq: '5',
        maxFreq: '10',
        dayType: 'LA',
      },
    ],
    pmv: '',
    geometry: { type: 'Point', coordinates: [0, 0] },
  },
];

const meta: Meta<typeof FavoritesListSection> = {
  component: FavoritesListSection,
  args: {
    favorites: mockFavorites,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const SingleFavorite: Story = {
  args: {
    favorites: [mockFavorites[0]],
  },
};
