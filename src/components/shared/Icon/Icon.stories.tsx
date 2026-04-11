import type { Meta, StoryObj } from '@storybook/react-native';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Shared/Icon',
  argTypes: {
    name: {
      control: 'select',
      options: ['location-outline', 'bus', 'heart', 'star', 'home'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'muted',
        'inverse',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'location-outline',
    size: 'md',
    color: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Icon name="star" size="xs" />
      <Icon name="star" size="sm" />
      <Icon name="star" size="md" />
      <Icon name="star" size="lg" />
      <Icon name="star" size="xl" />
      <Icon name="star" size="2xl" />
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Icon name="heart" color="default" />
      <Icon name="heart" color="primary" />
      <Icon name="heart" color="secondary" />
      <Icon name="heart" color="tertiary" />
      <Icon name="heart" color="success" />
      <Icon name="heart" color="warning" />
      <Icon name="heart" color="danger" />
      <Icon name="heart" color="muted" />
    </>
  ),
};
