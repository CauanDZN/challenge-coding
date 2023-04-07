import { styled } from '../';

export const Main = styled('main', {
  height: '100%',
  maxWidth: '100%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  padding: '6rem 1.5rem'
});

export const BodyContainer = styled('div', {
  width: '100%',
  maxWidth: '68rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  alignItems: 'left',
  textAlign: 'left',

  '.welcomeSection': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '0.5rem',

    '.searchContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      borderRadius: '0.375rem',
      border: 'solid 1px $black_150',
      outline: 'solid 2px transparent',
      transition: 'all 0.2s ease-in-out',
      padding: '0.125rem',
      width: '20rem',

      '@media screen and (max-width: 768px)': {
        width: '100%',
      },

      '&:focus-within': {
        border: 'solid 1px $green_400',
        outline: 'solid 2px rgba(56, 161, 105, 0.3)',
      },

      input: {
        width: '100%',
        height: '100%',
        padding: '0.5rem',
        border: 0,
        outline: 0,
      },

      button: {
        borderRadius: '0.25rem',
      }
    },

    '@media screen and (min-width: 720px)': {
      alignItems: 'left',
    },

    '@media screen and (max-width: 720px)': {
      flexDirection: 'column',
      justifyContent: 'left',
      alignItems: 'left',
    },

    '.imgContainer': {
      height: '20rem',
      width: '25rem',

      '@media screen and (max-width: 720px)': {
        height: '15rem',
        width: 'auto',
      },
    }
  }
});

export const ImgContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  marginBottom: '1rem',
  background: 'url("") no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});