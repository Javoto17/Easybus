import { render } from '@testing-library/react-native';

import SplashScreen from '@/components/SplashScreen/SplashScreen';

describe('<SplashScreen />', () => {
  it('Text renders correctly on SplashScreen', () => {
    const { getByText } = render(<SplashScreen />);

    getByText('Welcome!');
  });
});
