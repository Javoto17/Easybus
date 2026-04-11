import { render, screen } from '@testing-library/react-native';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    render(<Icon name="home" />);
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    render(<Icon name="bus" size="lg" color="primary" />);
    expect(screen.getByTestId('icon')).toBeTruthy();
  });
});
