import { render } from '@testing-library/react-native';

import { FavoritesEmptyState } from './FavoritesEmptyState';

describe('FavoritesEmptyState', () => {
  it('renders empty state message', () => {
    const { getByText } = render(<FavoritesEmptyState />);

    expect(getByText('Sin favoritos')).toBeTruthy();
    expect(
      getByText('Añade paradas a favoritos para verlas aquí')
    ).toBeTruthy();
  });
});
