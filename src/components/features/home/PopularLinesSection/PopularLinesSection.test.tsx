import { render } from '@testing-library/react-native';

import { PopularLinesSection } from './PopularLinesSection';

describe('PopularLinesSection', () => {
  it('renders section title', () => {
    const { getByText } = render(<PopularLinesSection />);

    expect(getByText('Líneas populares')).toBeTruthy();
  });

  it('renders all popular lines', () => {
    const { getByText } = render(<PopularLinesSection />);

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('53')).toBeTruthy();
  });
});
