const { withTV } = require('tailwind-variants/transformer');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      spacing: {
        margin: '12px',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      fontSize: {
        h100: [
          '32px',
          {
            lineHeight: '40px',
            letterSpacing: '-0.5px',
            fontWeight: '700',
          },
        ],
        h200: [
          '28px',
          {
            lineHeight: '36px',
            letterSpacing: '-0.4px',
            fontWeight: '700',
          },
        ],
        h300: [
          '24px',
          {
            lineHeight: '32px',
            letterSpacing: '-0.3px',
            fontWeight: '600',
          },
        ],
        h400: [
          '20px',
          {
            lineHeight: '28px',
            letterSpacing: '-0.2px',
            fontWeight: '600',
          },
        ],
        h500: [
          '18px',
          {
            lineHeight: '26px',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
        h600: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0px',
            fontWeight: '500',
          },
        ],
        'body-large': [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        'body-base': [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        'body-small': [
          '12px',
          {
            lineHeight: '18px',
            letterSpacing: '0px',
            fontWeight: '400',
          },
        ],
        'caption-default': [
          '10px',
          {
            lineHeight: '14px',
            letterSpacing: '0.1px',
            fontWeight: '400',
          },
        ],
        'caption-small': [
          '8px',
          {
            lineHeight: '12px',
            letterSpacing: '0.2px',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        active: {
          DEFAULT: '#37D0B8',
          light: '#5EE0CB',
          dark: '#2CB49E',
        },
        black: {
          DEFAULT: '#000000',
          light: '#323232',
        },
        gray: {
          light: '#F6F6F6',
          dark: '#CCCCCC',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
      },
      backgroundColor: {
        primary: '#1C1C1C',
        secondary: '#2E2E2E',
        card: '#2E2E2E',
        input: '#2E2E2E',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        active: '#37D0B8',
        'gray-dark': '#999999',
        'gray-light': '#F6F6F6',
        placeholder: '#CCCCCC',
      },
      borderColor: {
        primary: '#CCCCCC',
        active: '#37D0B8',
      },
    },
  },
  plugins: [],
});
