import styled from 'styled-components';
import { Z_INDEX } from '../base/constants/zIndex';
import { theme } from '../styles/theme';
import { BaseButton } from './Buttons';
import { Link } from 'react-router-dom';

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

const navButtonStyles = `
  padding: 0px 12px;
  display: block;
  text-align: left;
  min-width: 80px;
  display: flex;
  align-items: center;
  color: ${theme.secondaryColor};
  font-weight: 600;
  height: 60px;
  text-decoration: none;

  svg {
    height: 20px;
    width: 20px;
    fill: currentColor;
  }
`;

export const MobileHeaderNavButton = styled(BaseButton)`
  ${navButtonStyles}
`;

export const MobileHeaderNavLink = styled(Link)`
  ${navButtonStyles}
`;
