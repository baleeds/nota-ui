import { useParams } from 'react-router';
import { RouteParams } from '../base/routes';
import { asInt } from '../base/utils/asInt';
import { BookDetail, BOOK_DETAILS } from '../base/constants/bookDetails';
import { BibleChapter, BibleVerse, bible } from '../base/constants/bible';

interface PassageContext {
  bookName?: string;
  chapterNumber?: number;
  verseNumber?: number;
  bookDetails?: BookDetail;
  chapter?: BibleChapter;
  verse?: BibleVerse;
}

export function usePassage(): PassageContext {
  const { bookName, chapterId, verseId } = useParams<RouteParams>();
  const chapterNumber = asInt(chapterId);
  const verseNumber = asInt(verseId);
  const bookDetails = bookName ? BOOK_DETAILS[bookName] : undefined;
  const chapter =
    bookName && chapterNumber && bible[bookName]
      ? bible[bookName].chapters[chapterNumber]
      : undefined;
  const verse = verseNumber && chapter ? chapter[verseNumber] : undefined;

  return { bookName, chapterNumber, verseNumber, bookDetails, chapter, verse };
}
