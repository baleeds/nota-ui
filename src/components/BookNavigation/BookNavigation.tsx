import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Z_INDEX } from '../../base/constants/zIndex';

export const BookNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Container>
      <BookButton type="button" onClick={open}>
        Book
      </BookButton>
      <CSSTransition
        in={isOpen}
        classNames="fadeDown"
        timeout={300}
        unmountOnExit
      >
        <div>
          <Backdrop className="background" onClick={close} />
          <NavigationContainer className="foreground">
            Book nav
          </NavigationContainer>
        </div>
      </CSSTransition>
    </Container>
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
  right: 0;
  bottom: 20%;
  background-color: white;
  z-index: ${Z_INDEX.BOOK_NAV};
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
