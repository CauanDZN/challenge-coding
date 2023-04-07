import { createStitches } from '@stitches/react';

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css
} = createStitches({
  utils: {
    op: (value: number) => ({
      opacity: value
    }),
    color: (value: string) => ({
      color: value
    })
  },

  theme: {
    colors: {
      'black': '#000000',
      'black_35': 'rgba(0, 0, 0, 0.035)',
      'black_50': 'rgba(0, 0, 0, 0.05)',
      'black_80': 'rgba(0, 0, 0, 0.08)',
      'black_100': 'rgba(0, 0, 0, 0.1)',
      'black_150': 'rgba(0, 0, 0, 0.15)',
      'black_200': 'rgba(0, 0, 0, 0.2)',
      'black_250': 'rgba(0, 0, 0, 0.25)',
      'black_300': 'rgba(0, 0, 0, 0.3)',
      'black_400': 'rgba(0, 0, 0, 0.4)',
      'black_500': 'rgba(0, 0, 0, 0.5)',
      'black_600': 'rgba(0, 0, 0, 0.6)',
      'black_700': 'rgba(0, 0, 0, 0.7)',
      'black_800': 'rgba(0, 0, 0, 0.8)',
      'black_900': 'rgba(0, 0, 0, 0.9)',

      'gray_100': '#F8F9FA',
    
      'white': '#ffffff',
      'white_100': 'rgba(255, 255, 255, 0.1)',
      'white_250': 'rgba(255, 255, 255, 0.25)',
      'white_300': 'rgba(255, 255, 255, 0.3)',
      'white_400': 'rgba(255, 255, 255, 0.4)',
      'white_500': 'rgba(255, 255, 255, 0.5)',
      'white_600': 'rgba(255, 255, 255, 0.6)',
      'white_700': 'rgba(255, 255, 255, 0.7)',
      'white_800': 'rgba(255, 255, 255, 0.8)',
      'white_900': 'rgba(255, 255, 255, 0.9)',
      
      'green_100': '#c6f6d5',
      'green_200': '#9ae6b4',
      'green_300': '#68d391',
      'green_400': '#48bb78',
      'green_500': '#38a169',
      'green_600': '#2f855a',
      'green_700': '#276749',
      'green_800': '#22543d',
      'green_900': '#1c4532',


    }
  }
});