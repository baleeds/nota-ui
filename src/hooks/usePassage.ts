import { useParams } from 'react-router';
import { RouteParams } from '../base/routes';
import { asInt } from '../base/utils/asInt';
import { BookDetail, BOOK_DETAILS } from '../base/constants/bookDetails';
import { BibleChapter, BibleVerse, bible } from '../base/constants/bible';
import { useMemo } from 'react';

export interface PassageContext {
  bookName?: string;
  chapterNumber?: number;
  verseNumber?: number;
  bookDetails?: BookDetail;
  chapter?: BibleChapter;
  verse?: BibleVerse;
  passageId?: string;
}

export function usePassage(): PassageContext {
  const { bookName, chapterId, verseId } = useParams<RouteParams>();

  const context: PassageContext = useMemo(() => {
    const chapterNumber = asInt(chapterId);
    const verseNumber = asInt(verseId);
    const bookDetails = bookName ? BOOK_DETAILS[bookName] : undefined;
    const chapter =
      bookName && chapterNumber && bible[bookName]
        ? bible[bookName].chapters[chapterNumber - 1]
        : undefined;
    const verse = verseNumber && chapter ? chapter[verseNumber - 1] : undefined;

    const { id: bookId } = bookDetails || {};
    const paddedChapterId = `${chapterId}`.padStart(3, '0');
    const paddedVerseId = `${verseId}`.padStart(3, '0');
    const passageId = `${bookId}${paddedChapterId}${paddedVerseId}`;

    return {
      bookName,
      chapterNumber,
      verseNumber,
      bookDetails,
      chapter,
      verse,
      passageId,
    };
  }, [bookName, chapterId, verseId]);

  return context;
}
