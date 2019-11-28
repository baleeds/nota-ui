import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Z_INDEX } from '../../base/constants/zIndex';
import { PassageSelector } from './PassageSelector';
import { useParams } from 'react-router';
import { asInt } from '../../base/utils/asInt';
import { theme } from '../../styles/theme';
import { ReactComponent as AngleRight } from '../../icons/chevron_right-24px.svg';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';

interface Params {
  bookName?: string;
  chapterId?: string;
}

export const BookNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { bookName, chapterId } = useParams<Params>();

  const book = bookName ? BOOK_DETAILS[bookName] : undefined;
  const chapterNumber = asInt(chapterId);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Container>
        <button type="button" onClick={open}>
          {book && chapterNumber
            ? `${book.displayName} ${chapterNumber}`
            : 'Select a passage'}
          <AngleRight />
        </button>
      </Container>
      <CSSTransition
        in={isOpen}
        classNames="fadeRight"
        timeout={300}
        unmountOnExit
      >
        <div>
          <Backdrop className="background" onClick={close} />
          <NavigationContainer className="foreground">
            <PassageSelector
              close={close}
              chapterNumber={chapterNumber}
              bookName={bookName}
            />
          </NavigationContainer>
        </div>
      </CSSTransition>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.READ_NAV};
  background-color: ${theme.blank};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);

  button {
    padding: 18px 16px;
    display: block;
    text-align: left;
    min-width: 80px;
    display: flex;
    align-items: center;
    color: ${theme.primaryColor};
    font-weight: bold;

    svg {
      height: 20px;
      width: 20px;
      margin-left: 6px;
      fill: currentColor;
    }
  }

  @media screen and (min-width: 900px) {
    position: relative;
    box-shadow: none;
    background-color: transparent;
    padding: 24px 12px 0 12px;

    button {
      font-size: 1.3em;
    }
  }
`;

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 400px;
  background-color: white;
  z-index: ${Z_INDEX.BOOK_NAV};
  box-shadow: 0 0 24px 2px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: ${Z_INDEX.BOOK_NAV_BACKDROP};
`;
