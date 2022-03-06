import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as HomeIcon } from '../icons/home-24px.svg';
import { ReactComponent as ReadIcon } from '../icons/menu_book-24px.svg';
import { ReactComponent as CollectionIcon } from '../icons/collections_bookmark-24px.svg';
import { theme } from '../styles/theme';
import { Z_INDEX } from '../base/constants/zIndex';
import { useScreen } from '../hooks/useScreen';
import { LARGE_SCREEN } from '../base/constants/breakpoints';
import { useBookNavigation } from './BookNavigationProvider';
import { BaseButton } from './Buttons';

const DesktopNavbar: React.FC = () => {
  const { pathname } = useLocation();
  const { open, title } = useBookNavigation();

  /**
   * The read button on the desktop navbar acts as the link
   * to /read and the read navigation toggle, when on the /read
   * route.
   */
  const ReadButton = () =>
    pathname.startsWith('/read') ? (
      <NavButton onClick={open} className="active">
        <ReadIcon />
        <div>{title || 'Read'}</div>
      </NavButton>
    ) : (
      <NavLinkButton to="/read">
        <ReadIcon />
        <div>Read</div>
      </NavLinkButton>
    );

  return (
    <DesktopContainer>
      <InnerContainer>
        <div>
          <ReadButton />
        </div>
        <div style={{ display: 'flex' }}>
          <NavLinkButton to="/home">
            <HomeIcon />
            <div>Home</div>
          </NavLinkButton>
          <NavLinkButton to="/collection">
            <CollectionIcon />
            <div>Collection</div>
          </NavLinkButton>
        </div>
      </InnerContainer>
    </DesktopContainer>
  );
};

const MobileNavbar: React.FC = () => (
  <MobileContainer>
    <NavLinkButton to="/home">
      <HomeIcon />
      <div>Home</div>
    </NavLinkButton>
    <NavLinkButton to="/read">
      <ReadIcon />
      <div>Read</div>
    </NavLinkButton>
    <NavLinkButton to="/collection">
      <CollectionIcon />
      <div>Collection</div>
    </NavLinkButton>
  </MobileContainer>
);

export const Navbar: React.FC = () => {
  const { width } = useScreen();

  if (width < LARGE_SCREEN) return <MobileNavbar />;
  return <DesktopNavbar />;
};

const Container = styled.div`
  background-color: white;
  box-shadow: ${theme.navShadow};
  z-index: ${Z_INDEX.NAV};
  height: 60px;
`;

const DesktopContainer = styled(Container)`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
`;

const MobileContainer = styled(Container)`
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 0 12px;
`;

const InnerContainer = styled.div`
  max-width: ${theme.maxContentWidth}px;
  margin: 0 -12px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

/**
 * These styles are used for two different styled components,
 * since we need identical links and buttons.
 */
const navButtonStyles = `
  flex: 1;
  text-align: center;
  height: 60px;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  color: ${theme.primaryTextColor};
  text-decoration: none;
  background-color: white;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: ${theme.secondaryHoverColor};
  }

  svg {
    fill: currentColor;
    flex-shrink: 0;
  }

  div {
    font-size: 0.7rem;
    text-decoration: none;
    margin-top: 2px;
  }

  &.active {
    color: ${theme.secondaryColor};
  }

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    flex-direction: row;
    padding: 0 16px;
    height: 44px;
    margin-top: 8px;
    border-radius: ${theme.borderRadius};

    svg {
      margin-right: 8px;
    }

    div {
      font-size: 1rem;
      margin-top: 0px;
    }
  }
`;

const NavButton = styled(BaseButton)`
  ${navButtonStyles}
`;

const NavLinkButton = styled(NavLink)`
  ${navButtonStyles}
`;
