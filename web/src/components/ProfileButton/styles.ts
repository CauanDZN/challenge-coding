import { styled } from "../../styles";

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2rem',
  width: '2rem',
  borderRadius: '1rem',
  border: '1px solid $black_200',
  overflow: 'hidden',
  cursor: 'pointer',

  img: {
    height: '2.25rem',
  },
});