import type { Meta, StoryObj } from '@storybook/react-native';

import { LiveStatusSection } from './LiveStatusSection';

const meta: Meta<typeof LiveStatusSection> = {
  component: LiveStatusSection,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
