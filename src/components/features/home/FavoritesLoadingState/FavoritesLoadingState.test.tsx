import { render } from '@testing-library/react-native';

import { FavoritesLoadingState } from './FavoritesLoadingState';

describe('FavoritesLoadingState', () => {
  it('renders loading skeletons', () => {
    const { getByText } = render(<FavoritesLoadingState />);

    expect(getByText('Favoritos')).toBeTruthy();
  });
});
