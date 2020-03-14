import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { theme } from '../styles/theme';

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${theme.secondaryColor};
  font-weight: bold;
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
