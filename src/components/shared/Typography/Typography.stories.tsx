import type { Meta, StoryObj } from '@storybook/react-native';

import {
  Typography,
  TypographyFamily,
  TypographyTone,
  TypographyVariant,
} from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Shared/Typography',
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TypographyVariant),
    },
    tone: {
      control: 'select',
      options: Object.values(TypographyTone),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Playground: Story = {
  args: {
    variant: TypographyVariant.BodyMd,
    tone: TypographyTone.Default,
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Tones: Story = {
  render: () => (
    <>
      <Typography tone={TypographyTone.Default}>Default</Typography>
      <Typography tone={TypographyTone.Muted}>Muted</Typography>
      <Typography tone={TypographyTone.Primary}>Primary</Typography>
      <Typography tone={TypographyTone.Secondary}>Secondary</Typography>
      <Typography tone={TypographyTone.Tertiary}>Tertiary</Typography>
      <Typography tone={TypographyTone.Success}>Success</Typography>
      <Typography tone={TypographyTone.Warning}>Warning</Typography>
      <Typography tone={TypographyTone.Danger}>Danger</Typography>
      <Typography tone={TypographyTone.Inverse}>Inverse</Typography>
    </>
  ),
};

export const FontSizes: Story = {
  render: () => (
    <>
      <Typography variant={TypographyVariant.DisplayLg}>
        Display Large (56px)
      </Typography>
      <Typography variant={TypographyVariant.HeadlineMd}>
        Headline Medium (28px)
      </Typography>
      <Typography variant={TypographyVariant.TitleSm}>
        Title Small (16px)
      </Typography>
      <Typography variant={TypographyVariant.BodyMd}>
        Body Medium (14px)
      </Typography>
      <Typography variant={TypographyVariant.LabelSm}>
        Label Small (11px)
      </Typography>
    </>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <>
      <Typography
        variant={TypographyVariant.DisplayLg}
        tone={TypographyTone.Primary}
        family={TypographyFamily.Heading}
      >
        Manrope Bold (Display)
      </Typography>
      <Typography
        variant={TypographyVariant.HeadlineMd}
        tone={TypographyTone.Primary}
        family={TypographyFamily.Heading}
      >
        Manrope Semibold (Headline)
      </Typography>
      <Typography
        variant={TypographyVariant.TitleSm}
        tone={TypographyTone.Secondary}
        family={TypographyFamily.Body}
      >
        Inter Medium (Title)
      </Typography>
      <Typography
        variant={TypographyVariant.BodyMd}
        family={TypographyFamily.Body}
      >
        Inter Regular (Body)
      </Typography>
      <Typography
        variant={TypographyVariant.LabelSm}
        tone={TypographyTone.Tertiary}
        family={TypographyFamily.Body}
      >
        Inter Bold (Label)
      </Typography>
    </>
  ),
};
