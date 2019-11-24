import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import { NavLink } from 'react-router-dom';

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
      <button type="button" onClick={showBookSelection}>
        All books
      </button>
      <ChapterButtons>{chapterButtons}</ChapterButtons>
    </div>
  );
};

const ChapterButtons = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  padding: 12px;

  a {
    text-decoration: none;
    font-size: 20px;
    color: ${theme.secondaryColor};
    height: 70px;
    padding: 12px;
    border: 1px solid ${theme.secondaryColor};
    display: inline-block;
    font-weight: bold;

    &.active {
      background-color: ${theme.secondaryColor};
    }
  }
`;

export default ChapterSelection;
