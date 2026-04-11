import { render, screen } from '@testing-library/react-native';

import { IconBadge } from './IconBadge';

describe('IconBadge', () => {
  it('renders with default props', () => {
    render(<IconBadge name="home" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders with solid variant and primary color', () => {
    render(<IconBadge name="bus" variant="solid" color="primary" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });

  it('renders with different shapes', () => {
    const { rerender } = render(<IconBadge name="star" shape="circle" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();

    rerender(<IconBadge name="star" shape="square" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();

    rerender(<IconBadge name="star" shape="rounded" />);
    expect(screen.getByTestId('icon-badge')).toBeTruthy();
  });
});
