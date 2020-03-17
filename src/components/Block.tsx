import styled from 'styled-components';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

export const Block = styled.div`
  padding: 0 12px;

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    padding: 0 16px;
  }
`;
