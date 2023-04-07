import { styled } from '../'

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',

  p: {
    margin: 0
  },

  '.formContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',

    border: 'solid 1px $black_150',
    borderRadius: '0.625rem',

    width: '20rem',

    '@media screen and (max-width: 768px)': {
      border: 0,
    },
    
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',

      width: '100%',

      '.buttonContainer': {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        marginTop: '0.25rem',

        button: {
          width: '100%',
          fontWeight: 500,

          '&.createAccount': {
            backgroundColor: '$green_600',
            color: '$white'
          }
        }
      }
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
  margin: '0.5rem 0',
  cursor: 'pointer',
  
  span: {
    color: '$green_700',

    '@media screen and (max-width: 720px)': {
      fontSize: '1.125rem',
    },
  }
});