import React from 'react';
import { Page } from '../components/Page';
import { BookNav } from '../components/BookNav';
import { BookText } from '../components/BookText';

export const ReadPage: React.FC = () => {
  return (
    <Page>
      <BookNav />
      <BookText />
    </Page>
  );
};
