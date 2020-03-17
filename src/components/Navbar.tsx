import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from '../icons/home-24px.svg';
import { ReactComponent as ReadIcon } from '../icons/menu_book-24px.svg';
import { ReactComponent as CollectionIcon } from '../icons/collections_bookmark-24px.svg';
import { theme } from '../styles/theme';
import { Z_INDEX } from '../base/constants/zIndex';
import { useScreen } from '../hooks/useScreen';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

const DesktopNavbar: React.FC = () => (
  <DesktopContainer>
    <InnerContainer>
      <div>
        <NavButton to="/read">
          <ReadIcon />
          <div>Read</div>
        </NavButton>
      </div>
      <div style={{ display: 'flex' }}>
        <NavButton to="/home">
          <HomeIcon />
          <div>Home</div>
        </NavButton>
        <NavButton to="/collection">
          <CollectionIcon />
          <div>Collection</div>
        </NavButton>
      </div>
    </InnerContainer>
  </DesktopContainer>
);

const MobileNavbar: React.FC = () => (
  <MobileContainer>
    <NavButton to="/home">
      <HomeIcon />
      <div>Home</div>
    </NavButton>
    <NavButton to="/read">
      <ReadIcon />
      <div>Read</div>
    </NavButton>
    <NavButton to="/collection">
      <CollectionIcon />
      <div>Collection</div>
    </NavButton>
  </MobileContainer>
);

export const Navbar: React.FC = () => {
  const { width } = useScreen();
  if (width < LARGE_SCREEN) return <MobileNavbar />;
  return <DesktopNavbar />;
};

const Container = styled.div`
  background-color: white;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
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
  max-width: 1000px;
  margin: 0 -12px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const NavButton = styled(NavLink)`
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

  &:hover {
    background-color: ${theme.secondaryHoverColor};
  }

  svg {
    fill: currentColor;
    flex-shrink: 0;
  }

  div {
    font-size: 0.7em;
    text-decoration: none;
    margin-top: 2px;
  }

  &.active {
    color: ${theme.secondaryColor};
  }

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    flex-direction: row;
    padding: 0 16px;

    svg {
      margin-right: 8px;
    }

    div {
      font-size: 1em;
    }
  }
`;
