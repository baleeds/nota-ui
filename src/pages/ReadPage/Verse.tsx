import React from 'react';
import { BibleVerse } from '../../base/constants/bible';
import { theme } from '../../styles/theme';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { VerseFragment } from '../../api/__generated__/apollo-graphql';

interface Props {
  verse: BibleVerse;
  verseKey: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  isActive: boolean;
  verseData: VerseFragment | undefined;
}

const lineBreakStyle = { marginBottom: 12 };

export const Verse: React.FC<Props> = ({
  verse,
  verseKey,
  bookName,
  chapterNumber,
  verseNumber,
  isActive,
  verseData,
}) => {
  const { isAnnotated = false, isAnnotatedByMe = false, isBookmarked = false } =
    verseData ?? {};

  return (
    <VerseLink
      to={`/read/${bookName}/${chapterNumber}/${verseNumber}`}
      isActive={isActive}
      isAnnotated={isAnnotated}
      isAnnotatedByMe={isAnnotatedByMe}
      isBookmarked={isBookmarked}
    >
      {verse.map(({ text, quote, lineBreak }, index) => {
        const key = `${verseKey}-${index}`;
        const verseNumberDisplay = (
          <span className="verseNumber">{verseNumber}</span>
        );

        if (text) {
          return (
            <span className="text" key={key}>
              {verseNumber && index === 0 && verseNumberDisplay}
              {text}
            </span>
          );
        } else if (quote) {
          return (
            <span className="quote" key={key}>
              {verseNumber && index === 0 && verseNumberDisplay}
              {quote}
            </span>
          );
        } else if (lineBreak) {
          return (
            <div key={key} style={lineBreakStyle} className="verseSpacer" />
          );
        }

        return null;
      })}
    </VerseLink>
  );
};

const VerseLink = styled(Link)<{
  isActive: boolean;
  isAnnotated: boolean;
  isAnnotatedByMe: boolean;
  isBookmarked: boolean;
}>`
  text-decoration: none;
  color: ${({ isActive }) =>
    isActive ? theme.primaryColor : theme.primaryTextColor};
  font-family: 'Open Sans', sans-serif;
  line-height: 1.7em;
  font-size: 1.125rem;
  -webkit-tap-highlight-color: ${theme.secondaryHoverColor};

  &:hover {
    color: ${theme.primaryColor};
  }

  .quote {
    display: inline-block;
    margin: 0 10%;
    width: 80%;
  }

  .text {
    padding: 6px 0;
  }

  .text,
  .quote {
    background-color: ${({
      isActive,
      isBookmarked,
      isAnnotatedByMe,
      isAnnotated,
    }) => {
      // if (isActive) return theme.verseAnnotatedByMe;
      if (isBookmarked) return theme.verseBookmarked;
      if (isAnnotatedByMe) return theme.verseAnnotatedByMe;
      if (isAnnotated) return theme.verseAnnotated;
      return 'transparent';
    }};
  }

  .verseNumber {
    font-size: 0.8rem;
    font-weight: bold;
    position: relative;
    display: inline-block;
    padding: 0 4px 0 8px;
    top: -1px;
    color: ${theme.primaryColor};
  }
`;
