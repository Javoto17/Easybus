/** @type {import('tailwindcss').Config} */
module.exports = {
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
        'primary-bg': '#121212',
        'primary-bg-hover': '#2A2A2A',
        'secondary-bg': '#E0E0E0',
        'secondary-bg-hover': '#E74C3C',
        'primary-text': '#FFFFFF',
        'secondary-text': '#B0B0B0',
        active: '#00D1FF',
        border: '#333333',
        success: '#27AE60',
        error: '#E74C3C',
      },
    },
  },
  plugins: [],
};
