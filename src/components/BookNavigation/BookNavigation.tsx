import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Z_INDEX } from '../../base/constants/zIndex';
import { PassageSelector } from './PassageSelector';
import { useParams } from 'react-router';
import { asInt } from '../../base/utils/asInt';

interface Params {
  bookName?: string;
  chapterId?: string;
}

export const BookNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { bookName, chapterId } = useParams<Params>();

  const chapterNumber = asInt(chapterId);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Container>
        <BookButton type="button" onClick={open}>
          Book
        </BookButton>
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

  @media screen and (min-width: 900px) {
    position: relative;
    padding: 12px 0;
  }
`;

const BookButton = styled.button``;

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
