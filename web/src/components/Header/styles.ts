import { styled } from "../../styles";

export const HeaderContainer = styled('div', {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3.5rem',
  height: 'auto',
  width: '100%',
  backgroundColor: '$white_800',
  borderBottom: '1px solid $black_100',
  zIndex: '1',
  top: 0,
  left: 0,
  padding: '1rem 0',
  
  variants: {
    isTransparent: {
      true: {
        backgroundColor: '$white_800',
      },
      false: {
        backgroundColor: '$white_800',
        boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
      }
    }
  },

  '.MainContainer': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.25rem',
    minHeight: '2.75rem',
    width: '100%',
    maxWidth: '68rem',

    '@media screen and (max-width: 1120px)': {
      padding: '0 2.5rem',
    },

    '@media screen and (max-width: 720px)': {
      padding: '0 1.5rem',
    },

    '.LogoContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      gap: '0.5rem'
    },

    '.rightContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      alignItems: 'center',
      gap: '0.5rem',
    }
  }
});

export const Logo = styled('h2', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: 'Inter',
  fontWeight: '600',
  color: '$green_700',
  fontSize: '1.5rem',
  margin: 0,
  cursor: 'pointer',
  
  span: {
    color: '$green_700',

    '@media screen and (max-width: 720px)': {
      fontSize: '1.125rem',
    },
  }
});

export const HandleNav = styled('button', {
  display: 'none',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '0.375rem',
  padding: '0.5rem 0.5rem',

  '@media screen and (max-width: 720px)': {
    display: 'flex',
  },

  '&:hover': {
    backgroundColor: '$black_80',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$black_100',
        color: '$green_500',
      },
      false: {
        backgroundColor: 'transparent',
        color: '$green_500',
        border: 'solid 1px transparent',
      }
    },
  },
});

export const LabelText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$black_800',
  fontSize: '1rem',
  padding: '0.15rem 0',
  fontWeight: '400',

  '@media screen and (max-width: 720px)': {
    padding: '0.15rem 0.25rem',
  },
});