import React, { useState, useContext, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Z_INDEX } from '../../base/constants/zIndex';
import { PassageSelector } from './PassageSelector';
import { useParams } from 'react-router';
import { asInt } from '../../base/utils/asInt';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import { RouteParams } from '../../base/routes';

interface IBookNavigationContext {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  title: string;
}

const BookNavigationContext = React.createContext<IBookNavigationContext>({
  open: () => console.log('default'),
  close: () => {},
  isOpen: false,
  title: '',
});

/**
 * Easily use the context without two imports.
 */
export const useBookNavigation = () => {
  const context = useContext(BookNavigationContext);
  return context;
};

/**
 * Provides the navigation component and the ability to open, close,
 * and show the title.
 * @param Props
 */
export const BookNavigationProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { bookName, chapterId } = useParams<RouteParams>();

  const book = bookName ? BOOK_DETAILS[bookName] : undefined;
  const chapterNumber = asInt(chapterId);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const contextValue = useMemo(
    () => ({
      open,
      close,
      isOpen,
      title: `${book?.displayName} ${chapterNumber}`,
    }),
    [book, chapterNumber, open, close, isOpen]
  );

  return (
    <BookNavigationContext.Provider value={contextValue}>
      {children}
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
    </BookNavigationContext.Provider>
  );
};

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 350px;
  background-color: white;
  z-index: ${Z_INDEX.BOOK_NAV};
  box-shadow: 0 0 24px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
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
