import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from '../icons/home-24px.svg';
import { ReactComponent as ReadIcon } from '../icons/menu_book-24px.svg';
import { ReactComponent as CollectionIcon } from '../icons/collections_bookmark-24px.svg';
import { theme } from '../styles/theme';
import { Z_INDEX } from '../base/constants/zIndex';
import {
  BOOK_ID_KEY,
  CHAPTER_ID_KEY,
  VERSE_ID_KEY,
} from '../base/constants/localStorageKeys';
import { useScreen } from '../hooks/useScreen';

const getReadLink = (isMobile: boolean) => {
  const bookName = localStorage.getItem(BOOK_ID_KEY);
  const chapterId = localStorage.getItem(CHAPTER_ID_KEY);
  const verseId = localStorage.getItem(VERSE_ID_KEY);

  if (!bookName || !chapterId) {
    return '/read/genesis/1';
  }

  if (!verseId) {
    return `/read/${bookName}/${chapterId}`;
  }

  return `/read/${bookName}/${chapterId}/${verseId}${
    !isMobile ? '/annotations' : undefined
  }`;
};

export const Navbar: React.FC = () => {
  const { width } = useScreen();

  return (
    <Container>
      <NavButton to="/home">
        <HomeIcon />
        <span>Home</span>
      </NavButton>
      <NavButton to={getReadLink(width < 900)}>
        <ReadIcon />
        <span>Read</span>
      </NavButton>
      <NavButton to="/collection">
        <CollectionIcon />
        <span>Collection</span>
      </NavButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: white;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
  padding: 0 12px;
  z-index: ${Z_INDEX.NAV};

  @media screen and (min-width: 900px) {
    flex-direction: column;
    padding: 0;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    width: 80px;
  }
`;

const NavButton = styled(NavLink)`
  flex: 1;
  text-align: center;
  max-height: 60px;
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
  }

  span {
    font-size: 0.7em;
    text-decoration: none;
    margin-top: 2px;
  }

  &.active {
    color: ${theme.secondaryColor};
  }
`;
