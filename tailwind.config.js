const defaultTheme = require('tailwindcss/defaultTheme');

const sizesList = {
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  7.5: '1.875rem',
  8: '2rem',
  8.5: '2.125rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  13: '3.125rem',
  14: '3.25rem',
  14.5: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  17: '4.25rem',
  18: '4.5rem',
  19: '4.75rem',
  20: '5rem',
  21: '5.25rem',
  22: '5.5rem',
  23: '5.75rem',
  24: '6rem',
  25: '6.25rem',
  26: '6.5rem',
  27: '6.75rem',
  28: '7rem',
  29: '7.25rem',
  30: '7.5rem',
  31: '7.75rem',
  32: '8rem',
  33: '8.25rem',
  34: '8.5rem',
  36: '9rem',
  37: '9.25rem',
  38: '9.5rem',
  38.5: '9.625rem',
  39: '9.75rem',
  40: '10rem',
  42: '10.5rem',
  44: '11rem',
  46: '11.5rem',
  50: '12.5rem',
  52: '13rem',
  54: '13.5rem',
  56: '14rem',
  58: '14.5rem',
  60: '15rem',
  62: '15.5rem',
  64: '16rem',
  65: '16.25rem',
  66: '16.5rem',
  70: '17.5rem',
  72: '18rem',
  74: '18.5rem',
  82: '20.5rem',
  80: '20rem',
  84: '21rem',
  86: '21.5rem',
  89: '22.25rem',
  90: '22.5rem',
  94: '23.5rem',
  96: '24rem',
  98: '24.5rem',
  100: '25rem',
  101: '25.25rem',
  102: '25.5rem',
  103: '25.75rem',
  104: '26rem',
  105: '26.25rem',
  106: '26.5rem',
  108: '27rem',
  110: '28rem',
  112: '28rem',
  114: '28.5rem',
  115: '28.75rem',
  116: '29rem',
  118: '29.5rem',
  120: '30rem',
  125: '31.25rem',
  128: '32rem',
  130: '32.5rem',
  132: '33rem',
  134: '33.5rem',
  136: '34rem',
  138: '34.5rem',
  140: '35rem',
  142: '35.5rem',
  144: '36rem',
  150: '37.5rem',
  152: '38rem',
  154: '38.5rem',
  156: '39rem',
  158: '39.5rem',
  160: '40rem',
  170: '42.5rem',
  176: '44rem',
  180: '45rem',
  192: '48rem',
  194: '48.5rem',
  196: '49rem',
  198: '49.5rem',
  200: '50rem',
  204: '51rem',
  216: '54rem',
  220: '55rem',
  236: '59rem',
  239: '59.75rem',
  240: '60rem',
  256: '64rem',
  260: '65rem',
  272: '68rem',
  280: '70rem',
  300: '75rem',
  320: '80rem',
  340: '85rem',
  360: '90rem',
  364: '91rem',
  380: '95rem',
  384: '96rem',
  400: '100rem',
  '10%': '10%',
  '20%': '20%',
  '30%': '30%',
  '40%': '40%',
  '50%': '50%',
  '60%': '60%',
  '70%': '70%',
  '80%': '80%',
  '90%': '90%',
};

module.exports = {
  // darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // safelist only in development
  // safelist:
  //   process.env.NODE_ENV === 'production'
  //     ? []
  //     : [{ pattern: /.*/, variants: ['md', 'sm', 'lg', 'xl', '2xl'] }],
  theme: {
    extend: {
      colors: {
        white: '#fbf8ef',
        green: {
          50: '#EBFFE5',
          100: '#DFFFD6',
          200: '#C4F2D9',
          500: '#00C590',
        },
        gray: {
          25: '#FAFBFF',
          50: '#F4F7FE',
          100: '#EEF3FB',
          200: '#DCE6F7',
          300: '#ACB4CD',
          400: '#7C82A2',
          500: '#4B4F77',
          600: '#3B3E5E',
          700: '#2F324B',
          800: '#202238',
          900: '#141626',
        },
        primary: {
          DEFAULT: '#0d1637',
          50: '#ebf7ff',
          100: '#dbeeff',
          200: '#bedfff',
          300: '#97c8ff',
          400: '#6ea5ff',
          500: '#4d82ff',
          600: '#2d5bfe',
          700: '#2147e1',
          800: '#1e3fb5',
          900: '#213b8e',
          950: '#0d1637',
        },

        secondary: '#EBA500',
        error: {
          25: '#FDDEDF',
          50: '#FCCBCD',
          100: '#FBADB0',
          200: '#F9888D',
          300: '#F86C72',
          400: '#F7535A',
          500: '#DD3542',
          600: '#D31230',
          700: '#BC102B',
          800: '#A90F26',
          900: '#960D22',
        },
        warning: {
          25: '#FFE8DE',
          50: '#FFD8C7',
          100: '#FFC0A4',
          200: '#FFAD89',
          300: '#FF9566',
          400: '#FF8048',
          500: '#FF6C2B',
          600: '#FF5A00',
          700: '#B84100',
          800: '#943400',
          900: '#7A2B00',
        },
        success: {
          25: '#E8FFF2',
          50: '#E1FFEE',
          100: '#CEFFE3',
          200: '#A6FFCE',
          300: '#83FFBA',
          400: '#51FFAC',
          500: '#00F198',
          600: '#00D184',
          700: '#00A372',
          800: '#007A56',
          900: '#005239',
        },
      },
      fontFamily: {
        sans: ['OpenSans', 'Inter', 'Poppins', 'sans-serif'],
        mono: ['Monda', 'Roboto Mono', 'monospace'],
        inter: ['Inter'],
        text: ['Great Vibes'],
        title: ['Lobster'],
        sanchez: ['Sanchez'],
      },
      minWidth: { ...sizesList },
      minHeight: { ...sizesList },
      maxHeight: { ...sizesList },
      maxWidth: { ...sizesList },
      spacing: {
        ...sizesList,
      },
      fontSize: {
        '2xs': [
          '0.625rem',
          {
            lineHeight: '1rem',
          },
        ],
        xs: [
          '0.75rem',
          {
            lineHeight: '1.125rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        base: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        lg: [
          '1.875rem',
          {
            lineHeight: '2.5rem',
          },
        ],
        xl: [
          '2.5rem',
          {
            lineHeight: '3.125rem',
          },
        ],
        '2xl': [
          '3.125rem',
          {
            lineHeight: '3.75rem',
          },
        ],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('autoprefixer'),
  ],
};
