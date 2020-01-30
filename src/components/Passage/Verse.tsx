import React from 'react';
import { BibleVerse } from '../../base/constants/bible';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useScreen } from '../../hooks/useScreen';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';

interface Props {
  verse: BibleVerse;
  verseKey: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  isActive: boolean;
}

const lineBreakStyle = { marginBottom: 12 };

export const Verse: React.FC<Props> = ({
  verse,
  verseKey,
  bookName,
  chapterNumber,
  verseNumber,
  isActive,
}) => {
  const { width } = useScreen();

  return (
    <VerseLink
      to={`/read/${bookName}/${chapterNumber}/${verseNumber}${
        width > LARGE_SCREEN ? '/annotations' : ''
      }`}
      className={isActive ? 'active' : undefined}
    >
      {verse.map((verseLine, index) => {
        const key = `${verseKey}-${index}`;
        const verseNumberDisplay = (
          <span className="verseNumber">{verseNumber}</span>
        );

        if ('text' in verseLine) {
          const { text } = verseLine;

          return (
            <span className="text" key={key}>
              {verseNumber && index === 0 && verseNumberDisplay}
              {text}
            </span>
          );
        } else if ('quote' in verseLine) {
          const { quote } = verseLine;

          return (
            <span className="quote" key={key}>
              {verseNumber && index === 0 && verseNumberDisplay}
              {quote}
            </span>
          );
        } else if ('lineBreak' in verseLine) {
          return (
            <div key={key} style={lineBreakStyle} className="verseSpacer" />
          );
        }

        return null;
      })}
    </VerseLink>
  );
};

const VerseLink = styled(Link)`
  text-decoration: none;
  color: ${theme.primaryTextColor};
  font-family: 'Open Sans', sans-serif;
  color: #585858;
  line-height: 1.7em;
  padding: 2px 4px;
  font-size: 18px;
  -webkit-tap-highlight-color: ${theme.secondaryHoverColor};
  margin-right: 2px;

  .quote {
    display: inline-block;
    margin: 0 10%;
    width: 80%;
  }

  .text {
    padding: 6px 2px;
  }

  &.active {
    .text,
    .quote {
      background-color: ${theme.primaryHoverColor};
    }
  }

  &.hasAnnotations {
    background-color: ${theme.secondaryHoverColor};
  }

  .verseNumber {
    font-size: 0.8em;
    font-weight: bold;
    margin-right: 6px;
    position: relative;
    top: -1px;
    color: ${theme.primaryColor};
  }
`;
