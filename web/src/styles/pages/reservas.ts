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

  '.myBookingsSection': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: '100%',

    table: {
      width: '100%',
      
      '.bookingRow': {
        background: '$white_800',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.08)',

        '.firstContainer': {
          alignItems: 'flex-start',

          '.bold': {
            fontWeight: '500'
          }
        },

        '.lastContainer': {
          '@media screen and (max-width: 768px)': {
            button: {
              width: '100%'
            },
          }
        },

        a: {
          textDecoration: 'none',
          color: '$black_800',
          fontSize: '1rem'
        }
      }
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