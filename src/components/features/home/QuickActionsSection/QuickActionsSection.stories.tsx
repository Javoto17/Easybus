import type { Meta, StoryObj } from '@storybook/react-native';

import { QuickActionsSection } from './QuickActionsSection';

const meta: Meta<typeof QuickActionsSection> = {
  component: QuickActionsSection,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
