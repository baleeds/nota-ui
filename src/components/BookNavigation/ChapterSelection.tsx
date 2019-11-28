import React from 'react';
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
  if (!bookName) return null;
  const { numberOfChapters } = BOOK_DETAILS[bookName] || {};
  if (!numberOfChapters) return null;

  const chapterButtons = [];

  for (let i = 1; i <= numberOfChapters; i += 1) {
    chapterButtons.push(
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

  return (
    <div>
      <AllBooksButton type="button" onClick={showBookSelection}>
        <AngleLeftIcon />
        All books
      </AllBooksButton>
      <ChapterButtons>{chapterButtons}</ChapterButtons>
    </div>
  );
};

const AllBooksButton = styled.button`
  margin-top: 12px;
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
  position: absolute;
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

    &.active {
      color: white;
      background-color: ${theme.secondaryColor};
    }
  }
`;

export default ChapterSelection;
