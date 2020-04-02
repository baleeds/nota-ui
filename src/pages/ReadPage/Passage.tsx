import React from 'react';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { Verse } from './Verse';
import styled from 'styled-components';
import { usePassage } from '../../hooks/usePassage';

export const Passage: React.FC = () => {
  const { chapter, bookName, chapterNumber, verseNumber } = usePassage();
  if (!chapter || !bookName || !chapterNumber) {
    return <ErrorDisplay message="We could not find this passage" />;
  }

  return (
    <Container className="fadeIn">
      {chapter.map((verse, index) => {
        const verseKey = `readChapter-${bookName}-${chapterNumber}-${index}`;

        return (
          <Verse
            key={verseKey}
            verseKey={verseKey}
            verse={verse}
            bookName={bookName}
            chapterNumber={chapterNumber}
            verseNumber={index + 1}
            isActive={verseNumber === index + 1}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div``;
