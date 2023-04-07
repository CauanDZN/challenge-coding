import { styled } from '../../styles'

const borderRadius = '0.25rem';
export const padding = '0.5rem 0.5rem';

export const Main = styled('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
  textAlign: 'left',
  borderRadius,
  
  thead: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,

    tr: {
      borderRadius,
      overflow: 'hidden',

      'th:first-child': {
        borderTopLeftRadius: borderRadius,
      },

      'th:last-child': {
        borderTopRightRadius: borderRadius,
      },
      
      th: {
        padding: padding,
        borderBottom: 'solid 1px $black_100',
        fontSize: '1.125rem',
        fontWeight: 500,
      },
    }
  },
});