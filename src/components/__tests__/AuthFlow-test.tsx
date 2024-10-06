import { render } from '@testing-library/react-native';

import AuthFlow from '@/components/screens/AuthFlow/AuthFlow';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('<AuthFlow />', () => {
  it('Text renders correctly on AuthFlow', () => {
    const { getByText } = render(
      <AuthFlow
        authRepository={{
          login: async () => {
            return true;
          },
        }}
      />,
      { wrapper }
    );

    getByText('hola world');
  });
});
