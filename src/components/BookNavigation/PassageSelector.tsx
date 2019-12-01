import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ChapterSelection from './ChapterSelection';
import BookSelection from './BookSelection';

interface Props {
  bookName?: string;
  chapterNumber?: number;
  close: () => void;
  setScroll: (scrollTop: number) => void;
}

export const PassageSelector: React.FC<Props> = ({
  bookName,
  chapterNumber,
  close,
  setScroll,
}) => {
  const [selectedBookName, setSelectedBookName] = useState(bookName);
  const [showChapterSelection, setShowChapterSelection] = useState(
    !!selectedBookName
  );

  const handleBookSelection = (bookName: string | undefined) => {
    setSelectedBookName(bookName);
    setShowChapterSelection(true);
  };

  const showBookSelection = () => setShowChapterSelection(false);

  return (
    <>
      <CSSTransition
        in={showChapterSelection}
        timeout={200}
        classNames="chapterSelection"
        unmountOnExit
      >
        <ChapterSelection
          bookName={selectedBookName}
          isBookActive={selectedBookName === bookName}
          chapterNumber={chapterNumber}
          showBookSelection={showBookSelection}
          close={close}
        />
      </CSSTransition>
      <CSSTransition
        in={!showChapterSelection}
        timeout={200}
        classNames="fadeUp"
        unmountOnExit
      >
        <BookSelection
          bookName={bookName}
          handleBookSelection={handleBookSelection}
          setScroll={setScroll}
        />
      </CSSTransition>
    </>
  );
};
