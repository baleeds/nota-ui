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
      <Block style={{ paddingTop: 60 }}>
        <VerseParagraph>{verseText}</VerseParagraph>
      </Block>
    </>
  );
};

const VerseParagraph = styled(P)`
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 12px 0;
`;
