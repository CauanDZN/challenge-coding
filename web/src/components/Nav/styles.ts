import { keyframes } from "@stitches/react";
import { styled } from "../../styles";

const slideRight = keyframes({
  from: {
    transform: 'translateX(-10%)',
  },
  to: {
    transform: 'translateX(0)',
  }
});

export const NavContainer = styled('nav', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',

  '@media screen and (max-width: 992px)': {
    gap: '0.5rem',
  },

  '@media screen and (max-width: 720px)': {
    position: 'absolute',
    top: '4.75rem',
    left: 0,
    width: 'calc(100vw - 3rem)',
    height: 'calc(100vh - 4.75rem)',
    backgroundColor: '$white',
    flexDirection: 'column',
    justifyContent: 'left',
    gap: '1rem',
    padding: '0 1.5rem',
  },

  ul: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.25rem',

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '0.5rem',
    },
  },

  '.linkContainer': {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.25rem',

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '0.5rem',
    },
  },

  '.authContainer': {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
    }
  },

  variants: {
    isNavOpen: {
      true: {
        '@media screen and (max-width: 720px)': {
          display: 'flex',
          animation: `${slideRight} 0.25s ease-out`,
        },
      },
      false: {
        '@media screen and (max-width: 720px)': {
          animation: `${slideRight} 0.25s ease-out reverse forwards`,
          display: 'none',
        },
      }
    }
  }
});

export const NavButton = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  border: 'solid 1px transparent',
  borderRadius: '0.375rem',
  padding: '0.5rem 0.75rem',

  span: {
    display: 'block',
    color: '$black_800',
  },

  '&:hover': {
    backgroundColor: '$black_80',
  },

  '&:active': {
    backgroundColor: '$black_80',
    border: 'solid 1px $black_100',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$black_50',
        color: '$green_500',
      },
      false: {
        backgroundColor: 'transparent',
        color: '$green_500',
        border: 'solid 1px transparent',
      }
    },

    isSignUp: {
      true: {
        backgroundColor: '$green_600',
        color: '$white',
        
        '&:hover': {
          backgroundColor: '$green_700',
        }
      },
      false: {
        backgroundColor: 'transparent',
        color: '$black_800',
        border: 'solid 1px transparent',
      }
    }
  },
});