import type { Meta, StoryObj } from '@storybook/react-native';

import { PopularLinesSection } from './PopularLinesSection';

const meta: Meta<typeof PopularLinesSection> = {
  component: PopularLinesSection,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
