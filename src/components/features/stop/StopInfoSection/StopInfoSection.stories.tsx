import type { Meta, StoryObj } from '@storybook/react-native';

import type { Stop } from '@/modules/stops/domain/Stop';

import { StopInfoSection } from './StopInfoSection';

const mockStop: Stop = {
  stop: '1234',
  name: 'Plaza Mayor',
  postalAddress: 'Calle Mayor, 1, Madrid',
  pmv: 'PMV001',
  geometry: { type: 'Point', coordinates: [-3.7038, 40.4168] },
  dataLine: [],
};

const meta: Meta<typeof StopInfoSection> = {
  component: StopInfoSection,
  args: {
    stop: mockStop,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithPmv: Story = {
  args: {
    stop: { ...mockStop, pmv: 'PMV001' },
  },
};

export const WithoutPmv: Story = {
  args: {
    stop: { ...mockStop, pmv: '' },
  },
};
