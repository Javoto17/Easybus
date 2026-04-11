export default {
  expo: {
    name: 'easybus',
    slug: 'easybus',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      bundleIdentifier: 'com.easy.bus',
      supportsTablet: true,
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      config: {
        googleMaps: {
          apiKey: process.env.MAPS_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-font',
        {
          fonts: [
            './src/assets/fonts/InterVariable.ttf',
            './src/assets/fonts/Manrope-Regular.ttf',
            './src/assets/fonts/Manrope-Medium.ttf',
            './src/assets/fonts/Manrope-SemiBold.ttf',
            './src/assets/fonts/Manrope-Bold.ttf',
            './src/assets/fonts/Manrope-Light.ttf',
            './src/assets/fonts/Manrope-ExtraLight.ttf',
            './src/assets/fonts/Manrope-ExtraBold.ttf',
            './src/assets/fonts/SmoochSans-Regular.ttf',
          ],
        },
      ],
      'expo-image',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '8bf42f66-2b2e-4b46-867a-d98dc700874d',
      },
    },
    owner: 'javoto17',
  },
};
