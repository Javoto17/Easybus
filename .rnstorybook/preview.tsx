import type { Preview } from '@storybook/react';
import { HeroUINativeProvider } from 'heroui-native';
import { type PropsWithChildren, useEffect } from 'react';
import { Appearance, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Uniwind } from 'uniwind';

const ThemeSyncDecorator = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const applyTheme = () => {
      Uniwind.setTheme(
        Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
      );
    };

    applyTheme();
    const subscription = Appearance.addChangeListener(applyTheme);

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        includeNames: true,
        order: [
          'ControlExamples',
          ['ControlExample'],
          'InteractionExample',
          'DeepControls',
        ],
      },
    },
    hideFullScreenButton: false,
    noSafeArea: false,
    my_param: 'anything',
    layout: 'padded', // fullscreen, centered, padded
    storybookUIVisibility: 'visible', // visible, hidden
    // backgrounds: {
    //   default: Appearance.getColorScheme() === 'dark' ? 'dark' : 'plain',
    //   values: [
    //     { name: 'plain', value: 'white' },
    //     { name: 'dark', value: '#333' },
    //     { name: 'app', value: '#eeeeee' },
    //   ],
    // },
    backgrounds: {
      options: {
        // 👇 Default options
        dark: { name: 'dark', value: '#333' },
        light: { name: 'plain', value: '#fff' },
        // 👇 Add your own
        app: { name: 'app', value: '#eeeeee' },
      },
    },
  },
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: {
      value: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
    },
  },
  decorators: [
    (Story) => {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeSyncDecorator>
            <HeroUINativeProvider
              config={{ devInfo: { stylingPrinciples: false } }}
            >
              <View style={{ flex: 1 }}>
                <Story />
              </View>
            </HeroUINativeProvider>
          </ThemeSyncDecorator>
        </GestureHandlerRootView>
      );
    },
  ],
};

export default preview;
