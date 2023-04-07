import { keyframes } from "@stitches/react";
import { styled, globalCss } from ".";

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  }
})

export const openMobile = keyframes({
  '0%': {
    transform: 'translate(0, 6rem)'
  },
  '100%': {
    transform: 'translate(0, 0)'
  }
})

export const open = keyframes({
  '0%': {
    transform: 'scale(90%)'
  },
  '100%': {
    transform: 'scale(100%)'
  }
})

export const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  }
});

export const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(calc(0.5rem - 2px))',
  },
  to: {
    opacity: 1,
    transform: 'translateX(calc(0.5rem - 0px))',
  },
});

export const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  }
});

export const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(calc(0.5rem + 2px))',
  },
  to: {
    opacity: 1,
    transform: 'translateX(calc(0.5rem + 0px))',
  }
});

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    color: '$black_900',
    letterSpacing: '-0.0625rem;',
  },

  'html, body': {
    '--removed-body-scroll-bar-size': '0 !important',
    overflowY: 'scroll !important',
    overscrollBehavior: 'contain !important',
    position: 'relative !important',
    paddingLeft: '0px !important',
    paddingTop: '0px !important',
    paddingRight: '0px !important',
    marginLeft: '0 !important',
    marginTop: '0 !important',
    marginRight: '0px !important',
  },

  html: {
    fontSize: '1rem',
  },

  body: {
    backgroundColor: '$white',
    lineHeight: 1.5,
  },

  'body, input, textarea, button': {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
  },

  'input': {
    color: '$black_850',
    backgroundColor: '$white',
    borderRadius: '0.375rem',
    padding: '0.675rem 0.75rem',
    fontSize: 16,
    border: 'solid 1px $black_150',
    outline: 'solid 2px transparent',
    transition: 'all 0.2s ease-in-out',

    '&:focus': {
      transition: 'all 0.2s ease-in-out',
      border: 'solid 1px $green_400',
      outline: 'solid 3px rgba(56, 161, 105, 0.3)',
    }
  },

  button: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$black_50',
    color: '$black_800',
    border: 'solid 1px $black_50',
    borderRadius: '0.375rem',
    padding: '0.5rem 0.5rem',
    fontSize: '1rem',
    fontWeight: 400,
    cursor: 'pointer',
    outline: 0,

    '&:hover': {
      transition: 'all 0.15s ease-in-out',
      backgroundColor: '$black_80',
    },

    '&:active': {
      border: 'solid 1px $black_150',
      transition: 'all 0.15s ease-in-out',
    }
  },

  hr: {
    border: 'solid 1px $black_100',
  },

  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    marginTop: 0,
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  },

  h1: {
    fontSize: 'calc(1.375rem + 1.25vw)',
  },

  h3: {
    fontSize: 'calc(1.3rem + .25vw)',
  },

  h4: {
    fontSize: '1.275rem',
  },

  p: {
    marginTop: 0,
    marginBottom: '1rem',
  },

  '.lead': {
    fontWeight: 300,
    fontSize: '1.25rem',
  },

  '.light': {
    fontWeight: 300,
  },

  '.regular': {
    fontWeight: 400,
  },

  '.medium': {
    fontWeight: 500,
  },

  '.bold': {
    fontWeight: 600,
  },

  '::-webkit-scrollbar': {
    width: '0.375rem',
    height: '0.375rem',
  },

  '::-webkit-scrollbar-track': {
    background: '$white',
    height: '0.125rem',
    width: '0.125rem'
  },

  '::-webkit-scrollbar-thumb': {
    background: '$black_100',
    borderRadius: '3px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.15)',
    width: '2px',
    height: '2px'
  },

  '::-webkit-scrollbar-thumb:hover': {
    background: '$black_200'
  },

  '.DropdownMenuButton': {
    padding: 0,
    border: 0,
    background: 'transparent',
  },

  '.DropdownMenuContent': {
    minWidth: '220px',
    background: '$white_700',
    backdropFilter: 'blur(20px)',
    borderRadius: '0.375rem',
    padding: '0.25rem',
    margin: '0 1.5rem',
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    willChange: 'transform, opacity',
    animation: `${slideDownAndFade} 0.15s`,
    zIndex: 1,
  },

  '.DropdownMenuItem': {
    fontSize: '0.9375rem',
    fontWeight: '400',
    lineHeight: 1,
    color: '$black_800',
    borderRadius: '0.25rem',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '0.375rem 0.5rem',
    position: 'relative',
    paddingLeft: '1.5rem',
    userSelect: 'none',
    outline: 'none',
    border: 'solid 1px transparent',
    transition: '0.15s ease-in-out',

    '@media screen and (max-width: 720px)': {
      padding: '0.75rem 0.75rem',
      paddingLeft: '2rem',
    },

    '&:hover': {
      backgroundColor: '$black_80',
    },

    '&:active': {
      backgroundColor: '$black_80',
      border: 'solid 1px $black_100',
    }
  },

  '.DropdownMenuItemIndicator': {
    position: 'absolute',
    left: 0,
    width: '1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media screen and (max-width: 720px)': {
      width: '1.75rem',
    }
  },

  '.DropdownMenuSeparator': {
    height: '1px',
    backgroundColor: '$black_200',
    margin: '5px',
  },

  '.DropdownMenuArrow': {
    fill: '$white_800',
  },

  '.DropdownMenuLabel': {
    fontSize: '0.9375rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    padding: '0.25rem 0.25rem 0.25rem 1.5rem',
    color: '$black_400',

    '@media screen and (max-width: 720px)': {
      padding: '0.5rem 0.5rem 0.5rem 2rem',
    },
  },

  'svg.load': {
    animation: `${spin} 1s infinite linear`,
    opacity: 0.6
  },

  '.react-modal-overlay': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },

  '.react-modal-content': {
    width: 'auto',
    background: '$white_800',
    backdropFilter: 'blur(20px)',
    padding: '1rem',
    borderRadius: '0.25rem',
    zIndex: 999,
    animation: `${open} 0.15s ease-out`,
    
    '@media screen and (max-width: 720px)': {
      position: 'absolute',
      bottom: 0,
      borderTop: 'solid 2px rgba(255, 255, 255, 0.1)',
      minWidth: 'calc(100% - 2rem)',
      animation: `${openMobile} 0.15s ease-out`,
    },

    button: {
      '@media screen and (max-width: 480px)': {
        padding: '0.75rem 0.5rem',
      }
    }
  },

  '.react-modal-container': {
    display: 'flex',
  },

  '.react-modal-content-header': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    height: 'auto',
    width: '100%',
    padding: '0 0 1rem 0',
    margin: 0,
    
    '.react-modal-close': {
      position: 'relative',
      border: 0,
      background: 'transparent',
      transition: 'filter 0.2s',
      cursor: 'pointer',
  
      '&:hover': {
        filter: 'brightness(0.8)',
      },
  
      zIndex: 999,
    },

    h2: {
      margin: 0
    }
  },
});

export const Footer = styled('footer', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2.5rem 0',
  backgroundColor: 'rgba(0, 0, 0, 0.035)',
  width: '100%',
  bottom: '0',

  p: {
    margin: 0,
  },

  '@media screen and (max-width: 720px)': {
    padding: '1.5rem 0',
  },
});