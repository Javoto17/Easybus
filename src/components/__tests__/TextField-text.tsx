import { render, fireEvent } from '@testing-library/react-native';

import TextField from '@/components/atoms/TextField/TextField';

describe('<TextField />', () => {
  it('Render correctly', () => {
    const { getByText } = render(<TextField label="label" />);

    getByText('label');
  });
  it('On change value on write', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <TextField label="label" placeholder="Escribe aquí" />
    );

    const input = getByPlaceholderText('Escribe aquí');

    fireEvent.changeText(input, 'Nuevo valor');

    expect(getByDisplayValue('Nuevo valor')).toBeTruthy();
  });
});
