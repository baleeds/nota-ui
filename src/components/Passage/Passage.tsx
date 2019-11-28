import React from 'react';
import { ErrorDisplay } from '../ErrorDisplay';
import { Verse } from './Verse';
import styled from 'styled-components';
import { VerseCard } from '../VerseCard';
import { usePassage } from '../../hooks/usePassage';

interface Params {
  bookName?: string;
  chapterId?: string;
  verseId?: string;
}

export const Passage: React.FC = () => {
  const { chapter, bookName, chapterNumber, verseNumber } = usePassage();
  if (!chapter || !bookName || !chapterNumber) {
    return <ErrorDisplay />;
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
      {/* passage */}
      <VerseCard />
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 16px 100px 16px;

  @media screen and (min-width: 900px) {
    padding: 12px 24px 100px 24px;
    max-width: 600px;
    margin: 0 auto;
  }
`;
