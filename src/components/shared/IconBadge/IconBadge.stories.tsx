import type { Meta, StoryObj } from '@storybook/react-native';

import { IconBadge } from './IconBadge';

const meta: Meta<typeof IconBadge> = {
  component: IconBadge,
  title: 'Shared/IconBadge',
  argTypes: {
    name: {
      control: 'select',
      options: ['location', 'bus', 'heart', 'star', 'home'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'ghost'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded', 'none'],
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
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconBadge>;

export const Default: Story = {
  args: {
    name: 'location',
    variant: 'soft',
    shape: 'circle',
    size: 'md',
    color: 'default',
  },
};

export const Solid: Story = {
  render: () => (
    <>
      <IconBadge name="heart" variant="solid" color="primary" />
      <IconBadge name="heart" variant="solid" color="secondary" />
      <IconBadge name="heart" variant="solid" color="tertiary" />
      <IconBadge name="heart" variant="solid" color="success" />
      <IconBadge name="heart" variant="solid" color="warning" />
      <IconBadge name="heart" variant="solid" color="danger" />
    </>
  ),
};

export const Soft: Story = {
  render: () => (
    <>
      <IconBadge name="heart" variant="soft" color="primary" />
      <IconBadge name="heart" variant="soft" color="secondary" />
      <IconBadge name="heart" variant="soft" color="tertiary" />
      <IconBadge name="heart" variant="soft" color="success" />
      <IconBadge name="heart" variant="soft" color="warning" />
      <IconBadge name="heart" variant="soft" color="danger" />
    </>
  ),
};

export const Outline: Story = {
  render: () => (
    <>
      <IconBadge name="heart" variant="outline" color="primary" />
      <IconBadge name="heart" variant="outline" color="secondary" />
      <IconBadge name="heart" variant="outline" color="tertiary" />
    </>
  ),
};

export const Shapes: Story = {
  render: () => (
    <>
      <IconBadge name="star" shape="circle" color="primary" />
      <IconBadge name="star" shape="square" color="primary" />
      <IconBadge name="star" shape="rounded" color="primary" />
      <IconBadge name="star" shape="none" color="primary" />
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <IconBadge name="star" size="xs" color="primary" />
      <IconBadge name="star" size="sm" color="primary" />
      <IconBadge name="star" size="md" color="primary" />
      <IconBadge name="star" size="lg" color="primary" />
      <IconBadge name="star" size="xl" color="primary" />
      <IconBadge name="star" size="2xl" color="primary" />
    </>
  ),
};
