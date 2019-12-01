import React, { useEffect } from 'react';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Props {
  bookName?: string;
  handleBookSelection: (bookKey: string) => void;
  setScroll: (scrollTop: number) => void;
}

export const BookSelection: React.FC<Props> = ({
  bookName,
  handleBookSelection,
  setScroll,
}) => {
  const bookKeys = Object.keys(BOOK_DETAILS);
  const currentIndex = bookKeys.findIndex(key => key === bookName);

  useEffect(() => {
    setScroll(currentIndex * 51 - 200);
    /* eslint-disable */
  }, []);

  return (
    <BookButtons>
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

  button {
    display: block;
    padding: 12px 16px;
    text-decoration: none;
    font-size: 20px;
    width: 100%;
    text-align: left;
    background-color: white;
    border: none;

    &.active {
      background-color: ${theme.secondaryColor};
      color: ${theme.blank};
    }
  }
`;

export default BookSelection;
