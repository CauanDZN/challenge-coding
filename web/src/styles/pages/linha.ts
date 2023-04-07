import { styled } from '../../styles';

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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  alignItems: 'left',
  gap: '1rem',
  textAlign: 'left',
  width: '100%',
  maxWidth: '68rem',

  '.lineHeader': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',

    '.lineHeaderContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'left',

      '@media screen and (max-width: 720px)': {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'left',
        alignItems: 'left',
      },

      button: {
        backgroundColor: 'transparent',
        color: '$black_800',
        fontWeight: '600',
        textTransform: 'uppercase',
        width: 'fit-content',
        gap: '0.5rem',

        '@media screen and (max-width: 720px)': {
          textAlign: 'left',
          alignItems: 'left',
          justifyContent: 'left',
          padding: '0.25rem 0',
        },
      },

      h1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.75rem',

        span: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '1px solid transparent',
          
          gap: '0.25rem',
          
          color: '$green_700',
          
          svg: {
            width: '1.875rem',
            height: '1.875rem',
            
            '@media screen and (max-width: 720px)': {
              width: '1.5rem',
              height: '1.5rem',
            },
          },
          
          '@media screen and (max-width: 720px)': {
            paddingRight: '0.5rem',
            borderRight: '1px solid $black_300',
          }
        },
        
        '@media screen and (max-width: 720px)': {
          fontSize: '1.25rem',
        }
      }
    }
  },

  '.mainContainer': {
    '.stopsNearContainer': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '0.5rem',

      '@media screen and (max-width: 768px)': {
        fontSize: '0.875rem',
      },

      '.stopsNearText': {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.125rem',

        'span:first-child': {
          fontWeight: 500,
          lineHeight: '1rem',
        }
      },

      '.iconContainer': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        padding: '0.375rem',
        height: '1rem',
        width: '1rem',
        background: '$green_200',

        '@media screen and (max-width: 768px)': {
          height: '0.875rem',
          width: '0.875rem'
        },
      },
    },
    
    '.lineContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '3rem',

      '@media screen and (max-width: 768px)': {
        display: 'flex',
        flexDirection: 'column',
      },

      '.buttonContainer': {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.25rem',

        '@media screen and (max-width: 768px)':{
          flexDirection: 'column',
        },

        button: {
          width: '100%',
          
        },
      },

      '.infoContainer': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'left',
        gap: '0.5rem',
      },

      '.mapsContainer': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'left',
        gap: '0.5rem',

        borderRadius: '0.5rem',
        overflow: 'hidden',

        maxWidth: '28rem',
        maxHeight: '24rem',

        '@media screen and (max-width: 768px)': {
          maxWidth: '100%',
        },
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

export const StopContainer = styled('div', {
  borderRadius: '0.25rem',
  overflow: 'hidden',

  h3: {
    margin: '0',
  },
  
  h5: {
    fontSize: '1.125rem',
    margin: '0',
  },

  '.stopsHeaderContainer': {
    padding: '0.75rem 0.75rem',
    borderBottom: 'solid 2px $black_150',
  },

  '.stopItem':{
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '0.5rem 0.5rem 0.5rem 1.875rem',

    'p, h5, h3': {
      margin: '0',
      lineHeight: '1.375rem',
    },

    '@media screen and (max-width: 768px)': {
      padding: '0.625rem 0.5rem 0.625rem 1.875rem',
    },

    '&::before': {
      position: 'absolute',
      background: '#B2B2B2',
      content: "",
      width: '3px',
      height: '100%',
      marginLeft: '-1.125rem',
    },

    '&:only-child::before': {
      transform: 'translateY(50%)',
      height: '0 !important',
    },

    '&:first-child::before': {
      content: "",
      transform: 'translateY(50%)',
      height: 'calc(0.5 * 100%)',

      '@media screen and (max-width: 768px)': {
        height: 'calc(0.5 * 100%)',
      },

      '@media screen and (max-width: 480px)': {
        transform: 'translateY(37.5%)',
        height: 'calc(0.65 * 100%)',
      }
    },

    '& + &:last-child::before':{
      content: "",
      transform: 'translateY(-75%)',
      height: '40%',

      '@media screen and (max-width: 768px)': {
        transform: 'translateY(-85%)',
        height: '50%',
      }
    },

    p: {
      '&::before': {
        position: 'absolute',
        background: '$white',
        border: '3px solid #B2B2B2',
        borderRadius: '50%',
        content: "",
        marginLeft: 'calc(-1.125rem - ((0.5rem + 3px * 2) / 2.66) )',
        transform: 'translateY(calc(50% - (0.5rem / 3)))',
        height: '0.5rem',
        width: '0.5rem',
      }
    }
  }
});