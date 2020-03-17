import React from 'react';
import { BookNavigation } from '../components/BookNavigation';
import { Passage } from './ReadPage/Passage';
import { Page } from '../components/Page';
import { Block } from '../components/Block';

interface Props {
  bookName: string;
  chapterId: string;
}

export const MobileReadPage: React.FC<Props> = ({ bookName, chapterId }) => {
  return (
    <Page>
      <BookNavigation />
      <Block style={{ paddingTop: 60 }}>
        <Passage />
      </Block>
    </Page>
  );
};
