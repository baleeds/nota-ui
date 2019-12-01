import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BOOK_DETAILS } from '../../base/constants/bookDetails';
import { ReactComponent as AnnotationIcon } from '../../icons/comment-24px.svg';
import { ReactComponent as ArticleIcon } from '../../icons/description-24px.svg';
import { ReactComponent as BookmarkOutlineIcon } from '../../icons/bookmark_border-24px.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-24px.svg';
import { usePassage } from '../../hooks/usePassage';
import { Verse } from '../Passage/Verse';
import { VerseTabs } from './VerseTabs';
import { VerseTabName } from './types';
import { Annotations } from '../Annotations';
import { CSSTransition } from 'react-transition-group';

interface Props {
  onBodyScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onToggle?: () => void;
  showAddButton?: boolean;
}

export const VerseDetails: React.FC<Props> = ({
  onBodyScroll,
  onToggle,
  showAddButton = true,
}) => {
  const {
    bookName,
    chapterNumber,
    verseNumber,
    verse,
    passageId,
  } = usePassage();
  const [currentTab, setCurrentTab] = useState<VerseTabName>('annotations');

  const bookDetails = BOOK_DETAILS[bookName || ''];
  if (!verse || !bookName || !bookDetails || !chapterNumber || !verseNumber) {
    return (
      <Header>
        <h2>Select a verse</h2>
      </Header>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderButton type="button" onClick={onToggle}>
          <h2>
            {bookDetails.displayName} {chapterNumber}:{verseNumber}
          </h2>
        </HeaderButton>
        <BadgeContainer>
          <Badge>
            <AnnotationIcon />2
          </Badge>
          <Badge>
            <ArticleIcon />4
          </Badge>
          <Badge>
            <BookmarkOutlineIcon />
          </Badge>
        </BadgeContainer>
      </Header>
      <Body id="VerseDetailsBody" onScroll={onBodyScroll}>
        <VersePreview>
          <Verse
            verseKey="preview"
            verse={verse}
            bookName={bookName}
            chapterNumber={chapterNumber}
            verseNumber={verseNumber}
            isActive={false}
          />
        </VersePreview>
        <VerseTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <ContentContainer>
          {currentTab === 'annotations' ? (
            <Annotations passageId={passageId} />
          ) : (
            'Articles'
          )}
        </ContentContainer>
      </Body>
      <AddButtonContainer>
        <CSSTransition
          in={showAddButton}
          classNames="addButton"
          timeout={200}
          unmountOnExit
        >
          <AddButton type="button" onClick={console.log}>
            <EditIcon />
            Create {currentTab === 'annotations' ? 'annotation' : 'article'}
          </AddButton>
        </CSSTransition>
      </AddButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
`;

const Header = styled.div`
  color: ${theme.blank};
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  pointer-events: none;
`;

const HeaderButton = styled.button`
  padding: 22px 16px;
  pointer-events: all;

  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  padding: 0 8px;
`;

const Badge = styled.div`
  padding: 12px;
  padding: 18px 8px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;

  svg {
    fill: currentColor;
    width: 24px;
    height: auto;
    margin-right: 6px;
  }
`;

const Body = styled.div`
  overflow-y: auto;
  flex: 1;
  position: relative;
`;

const VersePreview = styled.div`
  padding: 24px;
  margin-bottom: 16px;

  a {
    color: white;
    font-weight: bold;

    .verseNumber {
      display: none;
    }

    .verseSpacer:last-child {
      display: none;
    }
  }
`;

const ContentContainer = styled.div`
  background-color: ${theme.blank};
  min-height: 100vh;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 64px;
  pointer-events: none;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button`
  margin: 0 auto;
  border-radius: 100px;
  pointer-events: all;
  background-color: ${theme.secondaryColor};
  padding: 8px 24px;
  color: ${theme.blank};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  font-size: 0.9em;
  font-style: italic;
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    margin-right: 6px;
    width: 20px;
    height: auto;
  }
`;
