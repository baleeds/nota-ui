import React, { useEffect, useRef, useMemo } from 'react';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';

interface Props {
  bookName?: string;
  handleBookSelection: (bookKey: string) => void;
}

const bookKeys = Object.keys(BOOK_DETAILS);

export const BookSelection: React.FC<Props> = ({
  bookName,
  handleBookSelection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useMemo(
    () => bookKeys.findIndex((key) => key === bookName),
    [bookName]
  );

  const { current } = containerRef;
  useEffect(() => {
    if (!current) {
      return;
    }
    current.scrollTop = currentIndex * 51 - 200;
  }, [current, currentIndex]);

  return (
    <BookButtons ref={containerRef}>
      {bookKeys.map((bookKey, index) => (
        <button
          key={`${bookKey}-navigationButton`}
          type="button"
          className={index === currentIndex ? 'active' : undefined}
          onClick={() => handleBookSelection(bookKey)}
        >
          {BOOK_DETAILS[bookKey].displayName}
        </button>
      ))}
    </BookButtons>
  );
};

const BookButtons = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 12px 0;
  overflow-y: scroll;
  bottom: 0;

  button {
    display: block;
    padding: 16px;
    text-decoration: none;
    font-size: 1.125rem;
    width: 100%;
    text-align: left;
    background-color: white;
    border: none;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${theme.secondaryHoverColor};
    }

    &.active {
      background-color: ${theme.secondaryColor};
      color: ${theme.blank};
    }
  }
`;

export default BookSelection;
