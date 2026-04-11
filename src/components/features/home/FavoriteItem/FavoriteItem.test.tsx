import { render } from '@testing-library/react-native';

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
  ],
  pmv: '',
  geometry: { type: 'Point', coordinates: [0, 0] },
};

describe('FavoriteItem', () => {
  it('renders stop name and address', () => {
    const { getByText } = render(<FavoriteItem stop={mockStop} index={0} />);

    expect(getByText('Plaza Mayor')).toBeTruthy();
    expect(getByText('Calle Mayor, 1')).toBeTruthy();
    expect(getByText('Mi parada')).toBeTruthy();
  });

  it('renders line numbers', () => {
    const { getByText } = render(<FavoriteItem stop={mockStop} index={0} />);

    expect(getByText('1')).toBeTruthy();
  });
});
