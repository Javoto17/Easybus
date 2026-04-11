import type { Meta, StoryObj } from '@storybook/react-native';

import type { HomeSearchResult } from '@/modules/stops/application/search/searchHome';

import { SearchResultsSection } from './SearchResultsSection';

const mockLines: HomeSearchResult['lines'] = [
  { line: '27', label: 'Línea 27' },
  { line: '33', label: 'Línea 33' },
];

const mockStops: HomeSearchResult['stops'] = [
  {
    stop: '1234',
    name: 'Plaza Mayor',
    postalAddress: 'Calle Mayor, 1',
    isFavorite: true,
  },
  {
    stop: '5678',
    name: 'Gran Vía',
    postalAddress: 'Gran Vía, 32',
    isFavorite: false,
  },
];

const meta: Meta<typeof SearchResultsSection> = {
  component: SearchResultsSection,
  args: {
    query: '27',
    isLoading: false,
    lines: mockLines,
    stops: mockStops,
    onPressLine: () => {},
    onPressStop: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Loading: Story = {
  args: {
    query: 'buscando',
    isLoading: true,
    lines: [],
    stops: [],
  },
};

export const NoResults: Story = {
  args: {
    query: 'xyz123',
    isLoading: false,
    lines: [],
    stops: [],
  },
};

export const OnlyLines: Story = {
  args: {
    query: 'línea',
    isLoading: false,
    lines: mockLines,
    stops: [],
  },
};

export const OnlyStops: Story = {
  args: {
    query: 'parada',
    isLoading: false,
    lines: [],
    stops: mockStops,
  },
};

export const EmptyQuery: Story = {
  args: {
    query: '',
    isLoading: false,
    lines: mockLines,
    stops: mockStops,
  },
};
