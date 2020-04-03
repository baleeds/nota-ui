import React from 'react';
import { Page } from '../../components/Page';
import { Passage } from './Passage';
import styled from 'styled-components';
import { useParams, Redirect } from 'react-router';
import { RouteParams } from '../../base/routes';
import {
  BOOK_ID_KEY,
  VERSE_ID_KEY,
  CHAPTER_ID_KEY,
} from '../../base/constants/localStorageKeys';
import { useScreen } from '../../hooks/useScreen';
import { MobileVersePage } from './MobileVersePage';
import { MobileAnnotationPage } from './MobileAnnotationPage';
import { MobileReadPage } from './MobileReadPage';
import { Block } from '../../components/Block';
import { DesktopSidecar } from './DesktopSidecar';

const getReadLink = (
  bookName: string | undefined,
  chapterId: string | undefined
) => {
  const localBookName = bookName || localStorage.getItem(BOOK_ID_KEY);
  const localChapterId = chapterId || localStorage.getItem(CHAPTER_ID_KEY);

  if (!bookName && !localBookName) return '/read/genesis/1';
  if (!chapterId && !localChapterId)
    return `/read/${bookName || localBookName}/1`;
  return `/read/${bookName || localBookName}/${
    chapterId || !!bookName ? '1' : localChapterId
  }`;
};

const syncLocalStorage = (key: string, value: string | undefined) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

export const ReadPage: React.FC = () => {
  const { bookName, chapterId, verseId, annotationId } = useParams<
    RouteParams
  >();
  const { isMobile } = useScreen();

  if (!bookName || !chapterId)
    return <Redirect to={getReadLink(bookName, chapterId)} />;

  // This pretty much only renders on route changes anyways
  syncLocalStorage(BOOK_ID_KEY, bookName);
  syncLocalStorage(CHAPTER_ID_KEY, chapterId);
  syncLocalStorage(VERSE_ID_KEY, verseId);

  if (isMobile) {
    if (annotationId) {
      return (
        <Page>
          <MobileAnnotationPage annotationId={annotationId} />
        </Page>
      );
    }
    if (verseId) {
      return (
        <Page>
          <MobileVersePage
            bookName={bookName}
            chapterId={chapterId}
            verseId={verseId}
          />
        </Page>
      );
    }
    return (
      <Page>
        <MobileReadPage bookName={bookName} chapterId={chapterId} />
      </Page>
    );
  }

  return (
    <Page>
      <Center>
        <PassageContainer>
          <Block>
            <Passage />
          </Block>
        </PassageContainer>
        <Block style={{ width: 400 }}>
          <DesktopSidecar />
        </Block>
      </Center>
    </Page>
  );
};

const Center = styled.div`
  margin: 0 auto;
  display: flex;
`;

const PassageContainer = styled.div`
  flex: 1;
`;
