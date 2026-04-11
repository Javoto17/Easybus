import { render } from '@testing-library/react-native';

import { LiveStatusSection } from './LiveStatusSection';

describe('LiveStatusSection', () => {
  it('renders live status section', () => {
    const { getByText } = render(<LiveStatusSection />);

    expect(getByText('Tiempo real')).toBeTruthy();
    expect(getByText('Actualizaciones en vivo cada 30s')).toBeTruthy();
  });
});
