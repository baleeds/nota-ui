import React from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Verse } from './Verse';
import styled from 'styled-components/macro';
import { usePassage } from '../../hooks/usePassage';
import {
  useVersesForChapterQuery,
  VerseFragment,
} from '../../api/__generated__/apollo-graphql';

export const Passage: React.FC = () => {
  const {
    chapter,
    bookName,
    bookDetails,
    chapterNumber,
    verseNumber,
  } = usePassage();

  const { data } = useVersesForChapterQuery({
    variables: {
      chapterNumber: chapterNumber ?? -1,
      bookNumber: bookDetails?.id ?? -1,
    },
  });

  if (!chapter || !bookName || !chapterNumber) {
    return <ErrorMessage message="We could not find this passage" />;
  }

  const versesData: Array<VerseFragment | undefined> = data?.verses ?? [];

  return (
    <Container className="fadeIn">
      {chapter.map((verse, index) => {
        const verseKey = `readChapter-${bookName}-${chapterNumber}-${index}`;
        const verseData = versesData[index];

        return (
          <Verse
            key={verseKey}
            verseKey={verseKey}
            verse={verse}
            bookName={bookName}
            chapterNumber={chapterNumber}
            verseNumber={index + 1}
            isActive={verseNumber === index + 1}
            verseData={verseData}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div``;
