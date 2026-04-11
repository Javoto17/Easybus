import { fireEvent, render } from '@testing-library/react-native';

import { FavoritesErrorState } from './FavoritesErrorState';

describe('FavoritesErrorState', () => {
  it('renders error message', () => {
    const { getByText } = render(<FavoritesErrorState onRetry={() => {}} />);

    expect(getByText('Error al cargar favoritos')).toBeTruthy();
    expect(getByText('Reintentar')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByText } = render(<FavoritesErrorState onRetry={onRetry} />);

    fireEvent.press(getByText('Reintentar'));
    expect(onRetry).toHaveBeenCalled();
  });
});
