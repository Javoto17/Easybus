import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    { name: '@storybook/addon-ondevice-controls' },
    '@storybook/addon-ondevice-actions',
    // '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-notes',
    'storybook-addon-deep-controls',
    './local-addon-example',
  ],
  reactNative: {
    playFn: false,
  },
  features: {
    ondeviceBackgrounds: true,
  },

  framework: '@storybook/react-native',
};

export default main;
