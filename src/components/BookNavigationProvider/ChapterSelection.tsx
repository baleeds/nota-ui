import React, { useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AngleLeftIcon } from '../../icons/chevron_left-24px.svg';

interface Props {
  isBookActive: boolean;
  bookName?: string;
  chapterNumber?: number;
  showBookSelection: () => void;
  close: () => void;
}

const ChapterSelection: React.FC<Props> = ({
  bookName,
  isBookActive,
  chapterNumber,
  showBookSelection,
  close,
}) => {
  const { numberOfChapters = 0, displayName = 'Unknown book' } =
    BOOK_DETAILS[bookName || ''] || {};

  const chapterButtons = useMemo(() => {
    const buttons = [];

    for (let i = 1; i <= numberOfChapters; i += 1) {
      buttons.push(
        <NavLink
          key={`${bookName}-${i}-navigationButton`}
          isActive={() => isBookActive && chapterNumber === i}
          onClick={close}
          to={`/read/${bookName}/${i}`}
        >
          {i}
        </NavLink>
      );
    }

    return buttons;
  }, [numberOfChapters, isBookActive, chapterNumber, bookName, close]);

  return (
    <Container>
      <AllBooksButton type="button" onClick={showBookSelection}>
        <AngleLeftIcon />
        {displayName}
      </AllBooksButton>
      <ChapterButtons>{chapterButtons}</ChapterButtons>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  width: 100%;
  padding-top: 8px;
`;

const AllBooksButton = styled.button`
  padding: 16px 12px;
  width: 100%;
  text-align: left;
  color: ${theme.secondaryColor};
  display: flex;
  align-items: center;
  font-weight: bold;

  svg {
    fill: currentColor;
    height: 20px;
    width: 20px;
    margin-right: 6px;
  }
`;

const ChapterButtons = styled.div`
  /* top: 70px; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  padding: 12px;

  a {
    text-decoration: none;
    font-size: 20px;
    color: ${theme.secondaryColor};
    height: 85px;
    padding: 12px;
    border: 1px solid ${theme.secondaryColor};
    display: inline-block;
    font-weight: bold;
    border-radius: ${theme.borderRadius};
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${theme.secondaryHoverColor};
    }

    &.active {
      color: white;
      background-color: ${theme.secondaryColor};
    }
  }
`;

export default ChapterSelection;
