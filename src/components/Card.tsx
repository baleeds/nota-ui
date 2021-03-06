import styled from 'styled-components';
import { theme } from '../styles/theme';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

export const Card = styled.div`
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.08);
  background: ${theme.blank};
  border-radius: ${theme.borderRadiusLarge};
  padding: 16px;

  /* @media screen and (min-width: ${LARGE_SCREEN}px) {
    padding: 16px;
  } */
`;
