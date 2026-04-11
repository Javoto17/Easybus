import { render } from '@testing-library/react-native';

import { QuickActionsSection } from './QuickActionsSection';

describe('QuickActionsSection', () => {
  it('renders all quick actions', () => {
    const { getByText } = render(<QuickActionsSection />);

    expect(getByText('Cercanas')).toBeTruthy();
    expect(getByText('Favoritos')).toBeTruthy();
    expect(getByText('Líneas')).toBeTruthy();
    expect(getByText('Mapa')).toBeTruthy();
  });
});
