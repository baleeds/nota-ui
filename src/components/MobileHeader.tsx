import styled from 'styled-components';
import { Z_INDEX } from '../base/constants/zIndex';
import { theme } from '../styles/theme';

export const MobileHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.READ_NAV};
  background-color: ${theme.blank};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
