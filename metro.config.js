// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(
  withStorybook(config, {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    experimental_mcp: true,
  }),
  {
    cssEntryFile: './global.css',
    polyfills: { rem: 14 },
    dtsFile: './uniwind-types.d.ts',
  }
);
