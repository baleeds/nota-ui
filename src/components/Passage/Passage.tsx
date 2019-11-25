import React from 'react';
import { useParams } from 'react-router';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import { asInt } from '../../base/utils/asInt';
import { ErrorDisplay } from '../ErrorDisplay';
import { bible } from '../../base/constants/bible';
import { Verse } from './Verse';
import styled from 'styled-components';

interface Params {
  bookName?: string;
  chapterId?: string;
  verseId?: string;
}

export const Passage: React.FC = () => {
  const { bookName, chapterId, verseId } = useParams<Params>();
  const chapterNumber = asInt(chapterId);
  const verseNumber = asInt(verseId);
  if (!bookName || !chapterNumber) {
    return <ErrorDisplay />;
  }

  const chapter = bible[bookName].chapters[chapterNumber - 1];
  if (!chapter) {
    return <ErrorDisplay />;
  }

  return (
    <Container>
      {chapter.map((verse, index) => {
        const verseKey = `readChapter-${bookName}-${chapterId}-${index}`;

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

const Container = styled.div`
  padding: 80px 16px 100px 16px;
`;
