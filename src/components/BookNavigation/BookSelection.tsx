import React from 'react';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Props {
  bookName?: string;
  handleBookSelection: (bookKey: string) => void;
}

export const BookSelection: React.FC<Props> = ({
  bookName,
  handleBookSelection,
}) => {
  return (
    <BookButtons>
      {Object.keys(BOOK_DETAILS).map(bookKey => (
        <button
          key={`${bookKey}-navigationButton`}
          type="button"
          className={bookName === bookKey ? 'active' : undefined}
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
      background-color: ${theme.primaryColor};
    }
  }
`;

export default BookSelection;
