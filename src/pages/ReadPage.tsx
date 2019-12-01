import React, { useEffect } from 'react';
import { Page } from '../components/Page';
import { BookNavigation } from '../components/BookNavigation';
import { Passage } from '../components/Passage';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { RouteParams } from '../base/routes';
import {
  BOOK_ID_KEY,
  VERSE_ID_KEY,
  CHAPTER_ID_KEY,
} from '../base/constants/localStorageKeys';

const syncLocalStorage = (key: string, value: string | undefined) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

export const ReadPage: React.FC = () => {
  const { bookName, chapterId, verseId } = useParams<RouteParams>();

  // This pretty much only renders on route changes anyways
  syncLocalStorage(BOOK_ID_KEY, bookName);
  syncLocalStorage(CHAPTER_ID_KEY, chapterId);
  syncLocalStorage(VERSE_ID_KEY, verseId);

  return (
    <Page>
      <Center>
        <BookNavigation />
        <Passage />
      </Center>
    </Page>
  );
};

const Center = styled.div`
  @media screen and (min-width: 900px) {
    margin: 0 auto;
  }
`;
