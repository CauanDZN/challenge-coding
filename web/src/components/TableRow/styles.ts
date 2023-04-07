import { styled } from '../../styles';

export const Main = styled('tr', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
  padding: '0.5rem 0.5rem',
  
  td: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '0.5rem 0rem 0 0rem',

    a: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      gap: '0.25rem',
      color: '$green_700',
      cursor: 'pointer',
      textDecoration: 'underline',
    },

    '.pagination': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.75rem',
      color: '$green_700',

      '.buttonContainer': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        gap: '0.5rem',

        button: {
          width: 'fit-content',
          fontSize: '0.875rem',

          '&:disabled': {
            cursor: 'default',
            color: '$black_300',
          },

          '@media screen and (max-width: 768px)': {
            padding: '0.5rem',
          }
        },
      }
    },

    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: '0.5rem',
      fontSize: '1.125rem',
      background: 'rgba(0,0,0, 0.025)',

      '@media screen and (max-width: 768px)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'flex-start',
      },

      '.firstContainer': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        gap: '0.5rem',

        span: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.25rem',
          color: '$green_600',
          fontWeight: 600,
          borderRight: 'solid 1px $black_200',
          padding: '0 0.5rem 0 0',
  
          width: '3.5rem',
        },

        '@media screen and (max-width: 768px)': {
          justifyContent: 'left',
          alignItems: 'flex-start',
          textAlign: 'left',
          lineHeight: '100%',
          gap: '0.5rem',
        },
      },

      '.lastContainer': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'right',
        textAlign: 'right',
        lineHeight: '75%',
        
        gap: '0.5rem',

        fontSize: '0.875rem',

        span: {
          fontWeight: 600,
        },

        '@media screen and (max-width: 768px)': {
          justifyContent: 'left',
          alignItems: 'flex-start',
          textAlign: 'left',
          lineHeight: '100%',
          gap: '0.25rem',
        },
      },
    },
  }
});