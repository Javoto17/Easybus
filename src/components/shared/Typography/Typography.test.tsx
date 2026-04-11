import { render, screen } from '@testing-library/react-native';

import { Typography, TypographyTone, TypographyVariant } from './Typography';

describe('Typography', () => {
  it('renders with default props', () => {
    render(<Typography>Default text</Typography>);
    expect(screen.getByText('Default text')).toBeTruthy();
  });

  it('renders with variant display-lg', () => {
    render(
      <Typography variant={TypographyVariant.DisplayLg}>
        Display Text
      </Typography>
    );
    expect(screen.getByText('Display Text')).toBeTruthy();
  });

  it('renders with variant headline-md', () => {
    render(
      <Typography variant={TypographyVariant.HeadlineMd}>
        Headline Text
      </Typography>
    );
    expect(screen.getByText('Headline Text')).toBeTruthy();
  });

  it('renders with variant title-sm', () => {
    render(
      <Typography variant={TypographyVariant.TitleSm}>Title Text</Typography>
    );
    expect(screen.getByText('Title Text')).toBeTruthy();
  });

  it('renders with variant body-md', () => {
    render(
      <Typography variant={TypographyVariant.BodyMd}>Body Text</Typography>
    );
    expect(screen.getByText('Body Text')).toBeTruthy();
  });

  it('renders with variant label-sm', () => {
    render(
      <Typography variant={TypographyVariant.LabelSm}>Label Text</Typography>
    );
    expect(screen.getByText('Label Text')).toBeTruthy();
  });

  it('renders with tone muted', () => {
    render(<Typography tone={TypographyTone.Muted}>Muted text</Typography>);
    expect(screen.getByText('Muted text')).toBeTruthy();
  });

  it('renders with tone primary', () => {
    render(<Typography tone={TypographyTone.Primary}>Primary text</Typography>);
    expect(screen.getByText('Primary text')).toBeTruthy();
  });

  it('renders with tone secondary', () => {
    render(
      <Typography tone={TypographyTone.Secondary}>Secondary text</Typography>
    );
    expect(screen.getByText('Secondary text')).toBeTruthy();
  });

  it('renders with tone tertiary', () => {
    render(
      <Typography tone={TypographyTone.Tertiary}>Tertiary text</Typography>
    );
    expect(screen.getByText('Tertiary text')).toBeTruthy();
  });

  it('renders with tone success', () => {
    render(<Typography tone={TypographyTone.Success}>Success text</Typography>);
    expect(screen.getByText('Success text')).toBeTruthy();
  });

  it('renders with tone warning', () => {
    render(<Typography tone={TypographyTone.Warning}>Warning text</Typography>);
    expect(screen.getByText('Warning text')).toBeTruthy();
  });

  it('renders with tone danger', () => {
    render(<Typography tone={TypographyTone.Danger}>Danger text</Typography>);
    expect(screen.getByText('Danger text')).toBeTruthy();
  });

  it('renders with tone inverse', () => {
    render(<Typography tone={TypographyTone.Inverse}>Inverse text</Typography>);
    expect(screen.getByText('Inverse text')).toBeTruthy();
  });

  it('renders with custom className', () => {
    render(<Typography className="custom-class">Custom text</Typography>);
    expect(screen.getByText('Custom text')).toBeTruthy();
  });

  it('renders with other TextProps', () => {
    render(
      <Typography testID="typography-test" numberOfLines={1}>
        Limited text
      </Typography>
    );
    expect(screen.getByTestId('typography-test')).toBeTruthy();
  });
});
