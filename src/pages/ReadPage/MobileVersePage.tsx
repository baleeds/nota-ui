import React from 'react';
import { ReactComponent as ChevronLeftIcon } from '../../icons/chevron_left-24px.svg';
import {
  MobileHeaderNavLink,
  MobileHeader,
} from '../../components/MobileHeader';
import { useBookNavigation } from '../../components/BookNavigationProvider';
import { Block } from '../../components/Block';
import { P } from '../../components/Typography';
import { usePassage } from '../../hooks/usePassage';
import styled from 'styled-components';
import { UNKNOWN_TEXT } from '../../base/constants/messages';
import { BibleVerse } from '../../base/constants/bible';
import { ReactComponent as QuoteIcon } from '../../icons/left-quote.svg';
import { VerseDetailsContent } from './VerseDetailsContent';
import { Separator } from '../../components/Separator';

interface Props {
  bookName: string;
  chapterId: string;
  verseId: string;
}

const buildVerseText = (verse: BibleVerse | undefined) => {
  if (!verse) return UNKNOWN_TEXT;

  return verse
    ?.map(({ text, quote }) => {
      if (text) {
        return text;
      } else if (quote) {
        return quote;
      }
      return null;
    })
    .filter(Boolean)
    .join(' ');
};

export const MobileVersePage: React.FC<Props> = ({
  bookName,
  chapterId,
  verseId,
}) => {
  const { title } = useBookNavigation();
  const { verse } = usePassage();

  const verseText = buildVerseText(verse);

  return (
    <>
      <MobileHeader>
        <MobileHeaderNavLink to={`/read/${bookName}/${chapterId}`}>
          <ChevronLeftIcon style={{ marginRight: 6 }} />
          {title}:{verseId}
        </MobileHeaderNavLink>
      </MobileHeader>
      <Block style={{ paddingTop: 60, paddingBottom: 20 }}>
        <Quote />
        <VerseParagraph>{verseText}</VerseParagraph>
      </Block>
      <Separator />
      <VerseDetailsContent />
    </>
  );
};

const Quote = styled(QuoteIcon)`
  width: 80px;
  position: absolute;
  z-index: -1;
  fill: rgba(132, 86, 201, 0.1);
`;

const VerseParagraph = styled(P)`
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 24px;
  font-weight: 600;
`;
