import bibleJson from './parsed-bible.json';

export interface Bible {
  [key: string]: BibleBook;
}

export interface BibleBook {
  longName: string;
  name: string;
  shortName: string;
  chapters: BibleChapter[];
}

export type BibleChapter = BibleVerse[];

export type BibleVerse = BibleBlock[];

export type BibleBlock = BibleTextBlock | BibleQuoteBlock | BibleBreakBlock;

export type BibleTextBlock = { text: string };

export type BibleQuoteBlock = { quote: string };

export type BibleBreakBlock = { lineBreak: true };

const bible = bibleJson as Bible;

export { bible };
