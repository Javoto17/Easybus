import { render } from '@testing-library/react-native';

import { FavoritesListSection } from './FavoritesListSection';

const mockFavorites = [
  {
    stop: '1234',
    name: 'Plaza Mayor',
    postalAddress: 'Calle Mayor, 1',
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
    ],
    pmv: '',
    geometry: { type: 'Point', coordinates: [0, 0] },
  },
];

describe('FavoritesListSection', () => {
  it('renders favorites list', () => {
    const { getByText } = render(
      <FavoritesListSection favorites={mockFavorites} />
    );

    expect(getByText('Favoritos')).toBeTruthy();
    expect(getByText('Plaza Mayor')).toBeTruthy();
  });
});
